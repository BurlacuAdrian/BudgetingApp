const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const path = require('path')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

app.use(cors({
  origin:'http://127.0.0.1:5173',
  credentials:true,
  optionSuccessStatus:201,
}));
app.use(cookieParser());

const SECRET_KEY="secret-key"

const verifyToken = (req, res, next) => {
  const token = req.cookies.JWT; 

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    req.username = decoded.username; 
    next();
  });
};


let db; 

async function connectToMongoDB() {
  const client = new MongoClient('mongodb://127.0.0.1:27017')
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('users'); 
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

app.post('/saveExpenses', async (req, res) => {
  try {
    const { subdocument } = req.body;
    const { month, year, expenses } = subdocument;
    const username = req.username; 

    const collection = db.collection('expensesCol');

    const existingDocument = await collection.findOne({ username });

    if (existingDocument) {
      const expensesPlusMeta = existingDocument.expensesPlusMeta;
      const matchingExpense = expensesPlusMeta.find((expense) => {
        return expense.month === month && expense.year === year;
      });

      if (matchingExpense) {
        matchingExpense.expenses = expenses;
      } else {
        expensesPlusMeta.push({ month, year, expenses });
      }

      await collection.updateOne({ username }, { $set: { expensesPlusMeta } });
    } else {
      await collection.insertOne({ username, expensesPlusMeta: [{ month, year, expenses }] });
    }

    res.status(200).json({ message: 'Expenses saved/updated successfully' });
  } catch (error) {
    console.error('Error in the /saveExpenses route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/getExpenses', async (req, res) => {
  try {
    const { subdocument } = req.body;
    const { month, year } = subdocument;
    const username = req.username; 

    const collection = db.collection('expensesCol');

    const existingDocument = await collection.findOne({
      username,
    });

    if (existingDocument) {
      const matchingExpense = existingDocument.expensesPlusMeta.find((expense) => {
        return expense.month === month && expense.year === year;
      });

      if (matchingExpense) return res.status(200).json({ expenses: matchingExpense.expenses });

      return res.status(202).json({ expenses: [[], [], [], [], [], []]});
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error in the /getExpenses route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  
  if (!username || !password) {
    return res.status(400).json({ error: 'Both username and password are required' });
  }

  
  const saltRounds = 10;
  try {
    const pass_hash = await bcrypt.hash(password, saltRounds);

    
    const usersCollection = db.collection('usersLogin');
    await usersCollection.insertOne({ username, pass_hash });

    
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '30d' });

    
    res.cookie('JWT', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
      
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/hi', (req,res)=>{
  res.send("Hi")
})


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  res.setHeader('Access-Control-Allow-Origin', 'http')
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  
  if (!username || !password) {
    return res.status(400).json({ error: 'Both username and password are required' });
  }

  const usersCollection = db.collection('usersLogin');
  const user = await usersCollection.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  
  const isValidPassword = await bcrypt.compare(password, user.pass_hash);

  if (isValidPassword) {
    
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '30d' });

    
    res.cookie('JWT', token, {
      
      
      maxAge: 30 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
      });

    res.status(201).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(8080, () => {
      console.log('Server is listening on 8080');
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer();
