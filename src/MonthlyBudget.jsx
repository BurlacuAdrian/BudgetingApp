import React, { useState, useEffect } from 'react';

const MonthlyBudget = ({ sums, monthlyBudget, setMonthlyBudget }) => {
  const totalSum = sums.reduce((acc, sum) => acc + sum, 0);

  useEffect(() => {
    setMonthlyBudget((prevBudget) => ({ ...prevBudget, before: totalSum }));
  }, [totalSum, setMonthlyBudget]);

  const handleAfterChange = (event) => {
    const newAfterValue = parseInt(event.target.value, 10) || 0;
    setMonthlyBudget((prevBudget) => ({ ...prevBudget, after: newAfterValue }));
  };

  return (
    <div className="flex-1">
      <h1 className="text-4xl flex items-center h-full pl-10">
        Monthly budget: {monthlyBudget.before}/
        <input
          type="number"
          style={{ borderBottom: '1px dashed #000', padding: '0 5px', width: '400px' }}
          value={monthlyBudget.after}
          onChange={handleAfterChange}
        />
      </h1>
    </div>
  );
};

export default MonthlyBudget;
