import React from 'react';

const ProgressBar = ({ a, b }) => {
  const percentage = (a / b) * 100;

  return (
    <div className="relative pt-1 w-80">
      <div className="flex h-4 mb-4 overflow-hidden text-xs bg-teal-200 rounded">
        <div style={{ width: `${percentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
