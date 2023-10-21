const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const path = require('path')
const cors = require('cors')

app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(cors({ origin: '*' }));


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
    const { username, subdocument } = req.body;
    const { month, year, expenses } = subdocument;

    const collection = db.collection('expensesCol');

    
    const existingDocument = await collection.findOne({ username });

    if (existingDocument) {
      
      const expensesPlusMeta = existingDocument.expensesPlusMeta;
      const matchingExpense = expensesPlusMeta.find(expense => {
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
    const { username, subdocument } = req.body;
    const { month, year } = subdocument;

    const collection = db.collection('expensesCol');

    
    const existingDocument = await collection.findOne({
      username
    });

    if (existingDocument) {
      const matchingExpense = existingDocument.expensesPlusMeta.find(expense => {
        return expense.month === month && expense.year === year;
      });

      if (matchingExpense)
        return res.status(200).json({ expenses: matchingExpense.expenses });

      return res.status(202).json({ expenses: [[], [], [], [], [], []] });
      
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error in the /getExpenses route:', error);
    res.status(500).json({ error: 'Internal server error' });
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
