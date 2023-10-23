import React, {useState, useEffect, useMemo,useRef} from 'react';
import MonthlyBudget from './MonthlyBudget';
import ProgressBar from './ProgressBar';
import RightNav from './RightNav';
import ExpensesTable from './ExpensesTable';
import '../styles.css'
import { useGuestMode } from './GuestModeContext';
import Cookies from 'js-cookie';

function App() {
  const AUTOSAVE_INTERVAL = 1000*120;
  const [autoSave, setAutoSave] = useState(false);
  const [sums, setSums] = useState(Array(6).fill(0));
  const [grandSum, setGrandSum] = useState(0)
  const [monthlyBudget, setMonthlyBudget] = useState(3000);
  const [userMonth, setUserMonth] = useState((new Date).getMonth()+1)
  const [userYear, setUserYear] = useState((new Date).getFullYear())
  const [expenses, setExpenses] = useState([
    [],[],[],[],[],[]
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
  const { guestMode } = useGuestMode();
  
  //Popup animation
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

  //Auto-save logic
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

  //Pauses the auto-save if the user is currently changing the month or year
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
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      setUsername(storedUsername);
      // alert(`Hello, ${storedUsername}!`);
    } else {
      const enteredUsername = prompt('Please enter your username:');

      if (enteredUsername) {
        localStorage.setItem('username', enteredUsername);
        setUsername(enteredUsername);
        alert(`Hello, ${enteredUsername}! Your username has been saved.`);
      } else {
        alert('You must enter a username to continue.');
      }
    }
  }

  const handleSampleData = ()=>{
    const sampleExample = [
      [
        {
          "date": "2023-10-01",
          "source": "Rent",
          "amount": 1500.00
        },
        {
          "date": "2023-10-15",
          "source": "Utilities",
          "amount": 200.00
        }
      ],
      [
        {
          "date": "2023-10-03",
          "source": "Gasoline",
          "amount": 50.00
        },
        {
          "date": "2023-10-18",
          "source": "Public Transportation",
          "amount": 30.00
        }
      ],
      [
        {
          "date": "2023-10-05",
          "source": "Grocery Store",
          "amount": 100.00
        },
        {
          "date": "2023-10-20",
          "source": "Dining Out",
          "amount": 60.00
        }
      ],
      [
        {
          "date": "2023-10-08",
          "source": "Health Insurance",
          "amount": 250.00
        },
        {
          "date": "2023-10-22",
          "source": "Gym Membership",
          "amount": 30.00
        }
      ],
      [
        {
          "date": "2023-10-12",
          "source": "Movie Theater",
          "amount": 20.00
        },
        {
          "date": "2023-10-25",
          "source": "Video Games",
          "amount": 40.00
        }
      ],
      [
        {
          "date": "2023-10-14",
          "source": "Clothing",
          "amount": 75.00
        },
        {
          "date": "2023-10-28",
          "source": "Gifts",
          "amount": 50.00
        }
      ]
    ]
    
    setExpenses(sampleExample)
  }
  
  //On-load, when component is mounted
  useEffect(() => {
    checkAndSetUsername();

    if(guestMode.current==true){
      handleSampleData()
      return
    }

    getExpensesFromAPI()
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  function getUsernameFromJWT() {
     const jwtCookie = Cookies.get('JWT');
  
    if (!jwtCookie) {
      return null;
    }
  
    const parts = jwtCookie.split('.');
    if (parts.length !== 3) {
      return null; 
    }
  
    const payload = atob(parts[1]);

    const payloadObj = JSON.parse(payload);
  
    const JWTusername = payloadObj.username;
    // console.log(JWTusername)
  
    return JWTusername;
  }

  // getUsernameFromJWT()

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
      username: username,
      subdocument: {
        month: userMonth,
        year: userYear
      }
    }
    const response = await fetch('http://127.0.0.1:8080/getExpenses', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(payload)
    })
    if(response.status!=200 || response.status!=202)
      return [[], [], [], [], [], []]
    const dataReceived = await response.json()
    const newExpenses = dataReceived.expenses;
    return newExpenses
  }

  const refreshExpenses = async ()=>{
    // await saveChangesToAPI()
    setExpenses(await getExpensesFromAPI())
  }

  //Update the expenses from a modified ExpensesTable
  const updateExpensesByCategory = (categoryIndex,newData)=>{
    setExpenses(oldExpenses => {
      const updatedExpenses = [...oldExpenses]; 
      updatedExpenses[categoryIndex] = newData; 
      return updatedExpenses; 
    });
    
  }

  //Calculate the grand total of all sums
  useEffect(() => {
    const newTotal = sums.reduce((previous, current) => previous + +current, 0)
    setGrandSum(newTotal)
  },[sums])

  //Calculate the sum of the expenses for each category
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
                }
                />
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
      setExpenses={setExpenses}
      guestMode={guestMode}
      handleSampleData={handleSampleData}
      />
      
    </>
  );
}

export default App;
