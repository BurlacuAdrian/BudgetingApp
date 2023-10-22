import React, {useState, useEffect, useMemo,useRef} from 'react';
import { Link,useNavigate } from 'react-router-dom';

const LoginPage=() =>{
  const navigate = useNavigate();
  const [loginResponse, setLoginResponse] = useState(null);

  const handleLogin = async () => {
    try {
      
      // const response = await loginAPIFunction(); 

      //simulate api call
      const response = {success:true}

      
      if (response.success) {
        
        setLoginResponse(response);
        navigate('/dashboard'); 
      } else {
        
      }
    } catch (error) {
      
      console.error('API call error:', error);
    }
  };


  return (
    <div className="flex-1 relative top-1/4 left-1/4">
      <div className="w-1/2 h-1/2 bg-gray-100 p-8 rounded-md flex flex-col justify-between">
        <div className="text-2xl font-bold text-center">Hello!</div>
        <input
          type="text"
          placeholder="Username"
          className="border p-5 rounded-md h-20"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-5 rounded-md h-20"
        />
        <button onClick={handleLogin} className="h-20 bg-teal-400 text-white p-2 rounded-md hover:bg-teal-600">
          Submit
        </button>
        <Link to="/signup" className="h-15 text-black p-2 rounded-md hover:bg-teal-200 text-center w-full">
        <button>
          Create account instead
        </button>
      </Link>
      </div>
  </div>
  )
}

export default LoginPage;