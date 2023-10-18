import React, {useState, useEffect, useMemo} from 'react';
import MonthlyBudget from './MonthlyBudget';
import ProgressBar from './ProgressBar';
import RightNav from './RightNav';
import ExpensesTable from './ExpensesTable';

function App() {
  const [autoSave, setAutoSave] = useState(true);
  const [sums, setSums] = useState(Array(6).fill(0));
  const [grandSum, setGrandSum] = useState(0)
  const [monthlyBudget, setMonthlyBudget] = useState({before: 0, after: 3000});

  const categoriesList = [
    'Housing',
    'Transportation',
    'Food and Groceries',
    'Health and Wellness',
    'Entertainment',
    'Personal and Miscellaneous',
  ]

  const categoriesData = [
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

    ],
  ]

  const toggleAutoSave = (oldAutoSaveValue) => {
    setAutoSave(!oldAutoSaveValue);
  };

  useEffect(() => {
    console.log(autoSave);
  }, [autoSave]);

  useEffect(() => {
    const newTotal = sums.reduce((previous, current) => previous + current, 0)
    setGrandSum(newTotal)
  })

  useEffect(() => {
    const categorySums = categoriesData.map((category) => category.reduce((acc, entry) => acc + entry.amount, 0));
    setSums(categorySums);
  }, [categoriesData]);


  return (
    <>
      <div className="h-full flex-[12] flex flex-col">
        <MonthlyBudget sums={sums}
          monthlyBudget={monthlyBudget}
          setMonthlyBudget={setMonthlyBudget}/>
        <div className="w-full flex-1 flex-col items-center justify-center">
          <ProgressBar a={grandSum}
            b={
              monthlyBudget.after
            }/>
        </div>
        <div className="w-full flex-[10] grid-container">
          {
          categoriesList.map((title, index) => (
            <div className="grid-item"
              key={index}>
              <h1>{title}</h1>
              <ExpensesTable category={title}
                modalCat={
                  'c' + index
                }
                data={
                  categoriesData[index] || []
                }
                sum={
                  sums[index] ? sums[index] : 0
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
