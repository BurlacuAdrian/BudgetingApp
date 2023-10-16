import MonthlyBudget from "./MonthlyBudget"
import ProgressBar from "./ProgressBar";
import RightNav from "./RightNav";
import ExpensesTable from "./ExpensesTable"
import React, {useState, useEffect} from 'react';

function App() {
  const [a, setA] = useState(1537);
  const [b, setB] = useState(3000);
  const [autoSave, setAutoSave] = useState(true);
  const handleAutoSaveToggle = (newAutoSave) => {
    setAutoSave(newAutoSave);
    // Additional logic if needed
  };

  useEffect(() => {
    console.log(autoSave)
  }, [autoSave]);

  // Update 'a' and 'b' after a delay as an example
  // setTimeout(() => {
  // setA(15);
  // setB(35);
  // }, 1000);

  return (
    <>
      <div className="h-full flex-[12] flex flex-col">
        <MonthlyBudget a={a}
          b={b}/>
        <div className="w-full flex-1 flex-col items-center justify-center ">
          <ProgressBar a={a}
            b={b}/>
        </div>
        <div className="w-full flex-[10] grid-container">
          {
          [
            'Housing',
            'Transportation',
            'Food and Groceries',
            'Health and Wellness',
            'Entertainment',
            'Personal and Miscellaneous',
          ].map((title, index) => (
            <div className="grid-item"
              key={index}>
              <h1>{title}</h1>
              <ExpensesTable/>
            </div>
          ))
        } </div>
      </div>
      <RightNav onAutoSaveToggle={handleAutoSaveToggle}/>


    </>
  )
}

export default App
