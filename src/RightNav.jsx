import React,{useRef} from 'react';
import ListItemWithInputMonth from './ListItemWithInputMonth'
import ListItemWithInputYear from './ListItemWithInputYear';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const RightNav = ({ autoSave,setAutoSave,userMonth, setUserMonth,userYear, setUserYear, saveChangesToAPI,refreshExpenses,handleResetTimer,setExpenses,guestMode,handleSampleData}) => {
  

  
  const toggleAutoSave = () => {
    setAutoSave(!autoSave);
  };

  

  const isJWTValid = () => {
    const jwtCookie = Cookies.get('JWT');
    console.log('jwtCookie '+jwtCookie)
  
    if (!jwtCookie) {
      return false;
    }
    const token = jwtCookie.replace('Bearer ', '');
    try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTimestamp;
    } catch (error) {
      return false;
    }
  };

  const checkUserType = () =>{
    // if(isJWTValid()==false)
    if(guestMode.current==true)
      console.log("guest mode")
    else
      console.log("user mode")
  }

// checkUserType()

const handleLogout=()=>{
  console.log("called")
  localStorage.setItem("userType","guest")
}

  return (
    <ul className="h-full flex-[1] flex flex-col justify-evenly items-center bg-teal-200">
      {!guestMode.current ? (<Link to='/login'  className="list-item" onClick={handleLogout}>
        <p>Logout</p>
      </Link>) : 
      (<Link to='/login'  className="list-item">
      <li>Currently in<br></br>Guest mode</li>
      </Link>)
      }
      <ListItemWithInputMonth label="Month" inputId="month"
      userMonth={userMonth} setUserMonth={setUserMonth}
      handleResetTimer={handleResetTimer}
      />
      <ListItemWithInputYear label="Year" inputId="year"
      userYear={userYear} setUserYear={setUserYear}
      handleResetTimer={handleResetTimer}
      />
      <li className="list-item" onClick={refreshExpenses}>Refresh data</li>
      <li className="list-item" onClick={saveChangesToAPI}>Save changes</li>
      {/* <li className="list-item">Generate PDF</li> */}
      <button className="list-item" onClick={handleSampleData}>Sample data</button>
      {/* {console.log(guestMode.current)} */}
      {!guestMode.current ? (
        <li className="list-item" onClick={toggleAutoSave}>
          Auto-save: {autoSave ? 'On' : 'Off'}
        </li>
      ) :
      <Link to='/signup'  className="list-item">
        <li>Login or sign-up</li>
      </Link>
      
      }

    </ul>
  );
};

export default RightNav;
