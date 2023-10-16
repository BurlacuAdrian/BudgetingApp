import React, { useState, useEffect } from 'react';

const MonthlyBudget = ({ a, b }) => {
  const [monthlyBudget, setMonthlyBudget] = useState(`${a}/${b}`);

  
  useEffect(() => {
    setMonthlyBudget(`${a}/${b}`);
  }, [a, b]);

  return (
    <div className="flex-1 ">
      <h1 className="text-4xl flex items-center h-full pl-10">Monthly budget: {monthlyBudget}</h1>
    </div>
  );
};

export default MonthlyBudget;
