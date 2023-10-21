import React, { useCallback, useState,useEffect,useRef } from 'react';

const ListItemWithInputYear = ({ label, inputId,userYear, setUserYear,handleResetTimer}) => {
  const [inputValue, setInputValue] = useState(userYear);
  const inputRef = useRef(null);
  
  const selectInput = useCallback(() => {
    document.getElementById(inputId).focus();
    handleResetTimer();
  }, [inputId]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    // if (//.test(newValue)) {
    setInputValue(newValue);
  };

  const handleData = () => {
    setUserYear(+inputValue)
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleData();
      }
    };

    inputRef.current.addEventListener('keypress', handleKeyPress);

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('keypress', handleKeyPress);
      }
    };
  }, [inputRef, handleData]);

  useEffect( () =>{
    setUserYear(+inputValue)
  },[inputValue])
  

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
          ref={inputRef}
          style={{ borderColor: /^[1-9]$|1[0-2]$/.test(inputValue) ? '' : 'red' }}
        />
      </div>
    </li>
  );
};

export default ListItemWithInputYear