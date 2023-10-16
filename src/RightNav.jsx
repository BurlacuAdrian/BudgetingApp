import React, { useCallback, useState } from 'react';

const ListItemWithInput = ({ label, inputId }) => {
  const [inputValue, setInputValue] = useState('');

  const selectInput = useCallback(() => {
    document.getElementById(inputId).focus();
  }, [inputId]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (/^(1[0-2]?|[1-9]?)?$/.test(newValue)) {
      setInputValue(newValue);
    }
  };

  return (
    <li className="list-item" onClick={selectInput}>
      <div style={{ marginBottom: '5px' }}>
        <label htmlFor={inputId}>{label}</label>
      </div>
      <div>
        <input
          type="text"
          id={inputId}
          value={inputValue}
          onChange={handleInputChange}
          style={{ borderColor: /^[1-9]$|1[0-2]$/.test(inputValue) ? '' : 'red' }}
        />
      </div>
    </li>
  );
};

const RightNav = ({ onAutoSaveToggle }) => {
  const [autoSave, setAutoSave] = useState(true);

  const toggleAutoSave = () => {
    setAutoSave(!autoSave);
    onAutoSaveToggle(!autoSave); 
  };

  return (
    <ul className="h-full flex-[1] flex flex-col justify-evenly items-center bg-teal-200">
      <li className="list-item">Account</li>
      <ListItemWithInput label="Month" inputId="month" />
      <ListItemWithInput label="Year" inputId="year" />
      <li className="list-item">Save changes</li>
      <li className="list-item" onClick={toggleAutoSave}>
        Auto-save: {autoSave ? 'On' : 'Off'}
      </li>
      <li className="list-item">Generate PDF</li>
      <li className="list-item">Sample data</li>
    </ul>
  );
};

export default RightNav;
