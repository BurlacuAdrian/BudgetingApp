import React, { useState, useEffect, useMemo } from 'react';
import MonthlyBudget from './MonthlyBudget';
import ProgressBar from './ProgressBar';
import RightNav from './RightNav';
import ExpensesTable from './ExpensesTable';

function App() {
  const [a, setA] = useState(1537);
  const [b, setB] = useState(3000);
  const [autoSave, setAutoSave] = useState(true);
  const [sums, setSums] = useState(Array(6).fill(0)); 

  const [sumHousing, setSumHousing] = useState(0);
  const [sumTransportation, setSumTransportation] = useState(0);
  const [monthlyBudget, setMonthlyBudget] = useState({ before: 0, after: 3000 });

  

  const handleAutoSaveToggle = (newAutoSave) => {
    setAutoSave(newAutoSave);
    
  };

  useEffect(() => {
    console.log(autoSave);
  }, [autoSave]);

  
  const categoriesData = useMemo(() => [
    [
      { date: '2023-01-01', source: 'Rent', amount: 1200 },
      { date: '2023-01-05', source: 'Utilities', amount: 200 },
      
    ],
    [
      { date: '2023-01-02', source: 'Gas', amount: 50 },
      { date: '2023-01-06', source: 'Public Transit', amount: 30 },
      
    ],
    
  ], []);

  
  useEffect(() => {
    const sumHousing = categoriesData[0]?.reduce((acc, entry) => acc + entry.amount, 0) || 0;
    const sumTransportation = categoriesData[1]?.reduce((acc, entry) => acc + entry.amount, 0) || 0;
    

    setSumHousing(sumHousing);
    setSumTransportation(sumTransportation);
    
  }, [categoriesData]);

  useEffect(() => {
    const categorySums = categoriesData.map((category) => category.reduce((acc, entry) => acc + entry.amount, 0));
    setSums(categorySums);
  }, [categoriesData]);
  

  return (
    <>
      <div className="h-full flex-[12] flex flex-col">
        <MonthlyBudget sums={sums} monthlyBudget={monthlyBudget} setMonthlyBudget={setMonthlyBudget}/>
        <div className="w-full flex-1 flex-col items-center justify-center">
          <ProgressBar a={sumHousing+sumTransportation} b={monthlyBudget.after} />
        </div>
        <div className="w-full flex-[10] grid-container">
          {[
            'Housing',
            'Transportation',
            'Food and Groceries',
            'Health and Wellness',
            'Entertainment',
            'Personal and Miscellaneous',
          ].map((title, index) => (
            <div className="grid-item" key={index}>
              <h1>{title}</h1>
              <ExpensesTable category={title} data={categoriesData[index] || []} sum={index === 0 ? sumHousing : sumTransportation} />
            </div>
          ))}
        </div>
      </div>
      <RightNav onAutoSaveToggle={handleAutoSaveToggle} />
    </>
  );
}

export default App;
