import React, {useState, useEffect, useMemo,useRef} from 'react';
import MonthlyBudget from './MonthlyBudget';
import ProgressBar from './ProgressBar';
import RightNav from './RightNav';
import ExpensesTable from './ExpensesTable';
import '../styles.css'

function App() {
  const AUTOSAVE_INTERVAL = 1000*120;
  const [autoSave, setAutoSave] = useState(false);
  const [sums, setSums] = useState(Array(6).fill(0));
  const [grandSum, setGrandSum] = useState(0)
  const [monthlyBudget, setMonthlyBudget] = useState(3000);
  const [userMonth, setUserMonth] = useState((new Date).getMonth()+1)
  const [userYear, setUserYear] = useState((new Date).getFullYear())
  const [expenses, setExpenses] = useState([
    [
      {
        date: '2023-10-01',
        source: 'Rent',
        amount: 1200
      }, {
        date: '2023-10-05',
        source: 'Utilities',
        amount: 200
      },
  
    ],
    [
      {
        date: '2023-10-02',
        source: 'Gas',
        amount: 50
      }, {
        date: '2023-10-06',
        source: 'Public Transit',
        amount: 30
      },
  
    ],[],[],[],[]
  ])
  const [categoriesList,setCategoriesList] = useState([
    'Housing',
    'Transportation',
    'Food and Groceries',
    'Health and Wellness',
    'Entertainment',
    'Personal and Miscellaneous',
  ])
  const [username,setUsername]=useState("")
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    if (showPopup) {
      const popUpTimer = setTimeout(() => {
        setShowPopup(false);
      }, 1500);

      return () => {
        clearTimeout(popUpTimer);
      };
    }
  }, [showPopup]);


  const [timer, setTimer] = useState(null);
  const editingRef = useRef(false);
  useEffect(() => {
    if (autoSave) {
      setTimer(setInterval(() => {
        if (!editingRef.current) {
          // console.log("Saving and editing: " + editingRef.current);
          saveChangesToAPI()
        }
      }, AUTOSAVE_INTERVAL));
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [autoSave]);

  const handleResetTimer = () => {
    editingRef.current = true;
    // console.log("editing is " + editingRef.current);

    setTimeout(() => {
      editingRef.current = false;
      // console.log("editing is " + editingRef.current);
    }, 8000);
  };



  const showSuccessPopup = () => {
    setShowPopup(true);
  };

  function checkAndSetUsername() {
    // Check if the username is already in localStorage
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      // If the username is in localStorage, update the state with the stored value
      setUsername(storedUsername);
      // alert(`Hello, ${storedUsername}!`);
    } else {
      // Prompt the user for their username
      const enteredUsername = prompt('Please enter your username:');

      if (enteredUsername) {
        // Save the entered username in localStorage and update the state
        localStorage.setItem('username', enteredUsername);
        setUsername(enteredUsername);
        alert(`Hello, ${enteredUsername}! Your username has been saved.`);
      } else {
        // User canceled the prompt or entered an empty username
        alert('You must enter a username to continue.');
      }
    }
  }
  
  // Call the function to check and set the username
  useEffect(()=>{
    checkAndSetUsername();

  },[])
  

  const saveChangesToAPI = async ()=>{
    const payload = {
      username: username,
      subdocument : {
        month: userMonth,
        year: userYear,
        expenses: expenses,
      }
    }

    const response = await fetch('http://127.0.0.1:8080/saveExpenses', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(payload)
    })

    if (response.status === 200) {
      showSuccessPopup()
    } else {
      console.error(`Request failed with status: ${response.status}`);
    }

  }


  const getExpensesFromAPI = async ()=>{
    const payload = {
      "username": username,
      "subdocument": {
        "month": userMonth,
        "year": userYear
      }
    }

    const response = await fetch('http://127.0.0.1:8080/getExpenses', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(payload)
    })
    const dataReceived = await response.json()
    const newExpenses = dataReceived.expenses;
    // console.log(payload)
    // console.log(newExpenses)
    setExpenses(newExpenses)
    return newExpenses
  }

  const refreshExpenses = async ()=>{
    await getExpensesFromAPI()
  }

  const updateExpensesByCategory = (categoryIndex,newData)=>{
    
    setExpenses(oldExpenses => {
      const updatedExpenses = [...oldExpenses]; 
      updatedExpenses[categoryIndex] = newData; 
      // console.log(updatedExpenses);
      return updatedExpenses; 
    });
    
  }

  

  const toggleAutoSave = (oldValue) => {
    showSuccessPopup()
    setAutoSave(!oldValue);
  };

  useEffect(() => {
  }, [autoSave]);

  useEffect(() => {
    const newTotal = sums.reduce((previous, current) => previous + +current, 0)
    setGrandSum(newTotal)
  },[sums])

  useEffect(() => {
    const categorySums = expenses.map((category) => category.reduce((acc, entry) => acc + +entry.amount, 0));
    setSums(categorySums);
  }, [expenses]);


  return (
    <>
      <div className="w-9/12 h-full flex-[12] flex flex-col">
        <div>
          <MonthlyBudget sums={sums}
            monthlyBudget={monthlyBudget}
            setMonthlyBudget={setMonthlyBudget}/>
            <div className={`popup${showPopup ? ' show' : ''}`}>
              Saved successfully.
            </div>
        </div>
        <div className="w-full flex-1 flex-col items-center justify-center">
          <ProgressBar a={grandSum}
            b={monthlyBudget}/>
        </div>
        <div className="w-full flex-[10] grid-container">
          {
          categoriesList.map((title, index) => (
            <div className="grid-item"
              key={index}>
              <h1>{title}</h1>
              <ExpensesTable categoryTitle={title}
                categoryIndex={
                  index}
                expenses={
                  expenses[index]||[]
                }
                updateExpensesByCategory={updateExpensesByCategory}
                sum={
                  sums[index] || 0
                }/>
            </div>
          ))
        } </div>
      </div>
      <RightNav autoSave={autoSave}
      setAutoSave={setAutoSave}
      userMonth={userMonth} setUserMonth={setUserMonth}
      userYear={userYear} setUserYear={setUserYear}
      saveChangesToAPI={saveChangesToAPI}
      refreshExpenses={refreshExpenses}
      showPopup={showPopup}
      showSuccessPopup={showSuccessPopup}
      handleResetTimer={handleResetTimer}
      />
      
    </>
  );
}

export default App;
