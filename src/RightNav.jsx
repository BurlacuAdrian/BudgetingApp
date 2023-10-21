import React, { useCallback, useState,useEffect,useRef } from 'react';
import ListItemWithInputMonth from './ListItemWithInputMonth'
import ListItemWithInputYear from './ListItemWithInputYear';

const RightNav = ({ autoSave,setAutoSave,userMonth, setUserMonth,userYear, setUserYear, saveChangesToAPI,refreshExpenses,showPopup,showSuccessPopup,handleResetTimer}) => {
  // const [autoSave, setAutoSave] = useState(false);

  const toggleAutoSave = () => {
    setAutoSave(!autoSave);
    // onAutoSaveToggle(!autoSave); 
  };

  return (
    <ul className="h-full flex-[1] flex flex-col justify-evenly items-center bg-teal-200">
      <li className="list-item">Account</li>
      <ListItemWithInputMonth label="Month" inputId="month"
       inputCheckType={0} userMonth={userMonth} setUserMonth={setUserMonth}
       handleResetTimer={handleResetTimer}
      />
      <ListItemWithInputYear label="Year" inputId="year"
      inputCheckType={1} userYear={userYear} setUserYear={setUserYear}
      handleResetTimer={handleResetTimer}
      />
      <li className="list-item" onClick={refreshExpenses}>Refresh data</li>
      <li className="list-item" onClick={saveChangesToAPI}>Save changes</li>
      <li className="list-item" onClick={toggleAutoSave}>
        Auto-save: {autoSave ? 'On' : 'Off'}
      </li>
      <li className="list-item">Generate PDF</li>
      <li className="list-item">Sample data</li>
    </ul>
  );
};

export default RightNav;
