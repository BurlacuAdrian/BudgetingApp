import React, {useState, useEffect, useMemo} from 'react';
import MonthlyBudget from './MonthlyBudget';
import ProgressBar from './ProgressBar';
import RightNav from './RightNav';
import ExpensesTable from './ExpensesTable';

function App() {
  const [autoSave, setAutoSave] = useState(true);
  const [sums, setSums] = useState(Array(6).fill(0));
  const [grandSum, setGrandSum] = useState(0)
  const [monthlyBudget, setMonthlyBudget] = useState(3000);
  const [expenses, setExpenses] = useState([
    [
      {
        date: '2023-01-01',
        source: 'Rent',
        amount: 1200
      }, {
        date: '2023-01-05',
        source: 'Utilities',
        amount: 200
      },
  
    ],
    [
      {
        date: '2023-01-02',
        source: 'Gas',
        amount: 50
      }, {
        date: '2023-01-06',
        source: 'Public Transit',
        amount: 30
      },
  
    ],[],[],[],[]
  ])


  const updateExpensesByCategory = (categoryIndex,newData)=>{
    
    setExpenses(oldExpenses => {
      const updatedExpenses = [...oldExpenses]; 
      updatedExpenses[categoryIndex] = newData; 
      console.log(updatedExpenses);
      return updatedExpenses; 
    });
    
  }

  const [categoriesList,setCategoriesList] = useState([
    'Housing',
    'Transportation',
    'Food and Groceries',
    'Health and Wellness',
    'Entertainment',
    'Personal and Miscellaneous',
  ])

  const toggleAutoSave = (oldValue) => {
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
      <div className="h-full flex-[12] flex flex-col">
        <MonthlyBudget sums={sums}
          monthlyBudget={monthlyBudget}
          setMonthlyBudget={setMonthlyBudget}/>
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
      <RightNav onAutoSaveToggle={toggleAutoSave}/>
    </>
  );
}

export default App;
