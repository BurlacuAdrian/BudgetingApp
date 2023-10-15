import MonthlyBudget from "./MonthlyBudget"
import ProgressBar from "./ProgressBar";
import React, { useState, useEffect } from 'react';

function App() {
  const [a, setA] = useState(10);
  const [b, setB] = useState(30);

  // Update 'a' and 'b' after a delay as an example
  setTimeout(() => {
    setA(15);
    setB(35);
  }, 1000);

  return (
  <>
    <div className="h-full w-7/12 border-blue-900 border-2 flex flex-col">
      <MonthlyBudget a={a} b={b}/>
      <div className="flex-1 flex-col items-center justify-center border-red-700 border-2">
        <ProgressBar a={a} b={b} />
      </div >
      <div className="flex-[10] border-red-700 border-2 grid-container">
        <div className="grid-item">1</div>
        <div className="grid-item">2</div>
        <div className="grid-item">3</div>
        <div className="grid-item">4</div>
        <div className="grid-item">5</div>
        <div className="grid-item">6</div>
      </div>
    </div>
    <div className="h-full w-5/12 border-red-700 border-2 flex flex-col">
      <div className="border-red-700 border-2 flex-[2]">

      </div>
      <div className="border-red-700 border-2 flex-[10]">
        
      </div>
    </div >
  </>
)}

export default App
