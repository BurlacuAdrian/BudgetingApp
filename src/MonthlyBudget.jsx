import React, { useState, useEffect } from 'react';

const MonthlyBudget = ({ a, b }) => {
  const [monthlyBudget, setMonthlyBudget] = useState(`${a}/${b}`);

  // Update the display when 'a' or 'b' changes
  useEffect(() => {
    setMonthlyBudget(`${a}/${b}`);
  }, [a, b]);

  return (
    <div className="flex-1 border-red-700 border-2">
      <p>Monthly budget: {monthlyBudget}</p>
    </div>
  );
};

export default MonthlyBudget;
