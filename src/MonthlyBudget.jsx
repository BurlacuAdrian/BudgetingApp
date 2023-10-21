import React, { useState, useEffect } from 'react';

const MonthlyBudget = ({ sums, monthlyBudget, setMonthlyBudget }) => {
  const grandSum = sums.reduce((acc, sum) => acc + sum, 0);

  const handleAfterChange = (event) => {
    const newAfterValue = parseInt(event.target.value, 10) || 0;
    setMonthlyBudget(newAfterValue);
  };

  return (
    <div className="flex-1 w-9/12 inline-block">
      <h1 className="text-4xl flex items-center h-full pl-10">
        Monthly budget: {grandSum}/
        <input
          type="number"
          style={{ borderBottom: '1px dashed #000', padding: '0 5px', width: '120px' }}
          value={monthlyBudget}
          onChange={handleAfterChange}
        />
      </h1>
    </div>
  );
};

export default MonthlyBudget;
