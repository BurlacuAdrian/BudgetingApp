import React, { useCallback, useState,useEffect,useRef } from 'react';


const ListItemWithInputMonth = ({ label, inputId, inputCheckType,userMonth, setUserMonth,handleResetTimer}) => {
  const [inputValue, setInputValue] = useState(userMonth);
  const inputRef = useRef(null);

  const selectInput = useCallback(() => {
    document.getElementById(inputId).focus();
    handleResetTimer()
  }, [inputId]);

  

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    switch(inputCheckType){
      case 0://month
        if (/^(1[0-2]?|[1-9]?)?$/.test(newValue)) {
          setInputValue(newValue);
        }
        break;
      case 1:
         // if (//.test(newValue)) {
        setInputValue(newValue);
         // }
        break;
      default:
        setInputValue(newValue);
    }
  };

  const handleData = () => {
    // Implement your logic for handling data here
    // This function will be called when Enter is pressed
    // console.log('Data submitted:', inputValue);
    setUserMonth(+inputValue)
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        // Call the handleData function when Enter is pressed
        handleData();
      }
    };

    // Attach the event listener to the input element
    inputRef.current.addEventListener('keypress', handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('keypress', handleKeyPress);
      }
    };
  }, [inputRef, handleData]);

  useEffect( () =>{
    setUserMonth(+inputValue)
    // console.log("changed month")
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
          ref={inputRef} // Attach the ref to the input element
          style={{ borderColor: /^[1-9]$|1[0-2]$/.test(inputValue) ? '' : 'red' }}
        />
      </div>
    </li>
  );
};

export default ListItemWithInputMonth