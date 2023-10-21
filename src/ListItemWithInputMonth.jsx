import React, {useCallback, useState, useEffect, useRef} from 'react';


const ListItemWithInputMonth = ({
  label,
  inputId,
  userMonth,
  setUserMonth,
  handleResetTimer
}) => {
  const [inputValue, setInputValue] = useState(userMonth);
  const inputRef = useRef(null);

  const selectInput = useCallback(() => {
    document.getElementById(inputId).focus();
    handleResetTimer()
  }, [inputId]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (/^(1[0-2]?|[1-9]?)?$/.test(newValue)) 
      setInputValue(newValue);
    
  };

  const handleData = () => {
    setUserMonth(+ inputValue)
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleData();
      }
    };

    inputRef.current.addEventListener('keypress', handleKeyPress);

    return() => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('keypress', handleKeyPress);
      }
    };
  }, [inputRef, handleData]);

  useEffect(() => {
    setUserMonth(+ inputValue)

  }, [inputValue])

  return (
    <li className="list-item"
      onClick={selectInput}>
      <div style={
        {marginBottom: '5px'}
      }>
        <label htmlFor={inputId}>
          {label}</label>
      </div>
      <div>
        <input type="text"
          id={inputId}
          value={inputValue}
          onChange={handleInputChange}
          ref={inputRef}
          style={
            {
              borderColor: /^[1-9]$|1[0-2]$/.test(inputValue) ? '' : 'red'
            }
          }/>
      </div>
    </li>
  );
};

export default ListItemWithInputMonth
