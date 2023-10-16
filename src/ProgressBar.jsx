import React from 'react';

const ProgressBar = ({ a, b }) => {
  const percentage = (a / b) * 100;

  return (
    <div className="flex items-center px-10 h-full w-full ">
      <div className="flex h-10 overflow-hidden text-xs bg-teal-200 rounded w-full">
        <div
          style={{ width: `${percentage}%` }}
          className="flex text-center whitespace-nowrap text-white pl-10 py-3 bg-teal-500 "
        >
          {percentage.toFixed(2)}% {/* Display the percentage */}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
