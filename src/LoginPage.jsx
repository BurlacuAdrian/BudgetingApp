import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGuestMode } from './GuestModeContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { guestMode } = useGuestMode();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    // console.log(JSON.stringify({ username, password }))
    try {
      const response = await fetch('http://127.0.0.1:8080/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      // console.log(JSON.stringify(response,null,2))
      if (response.status === 201) {
        const data = await response.json();
        guestMode.current = false;
        navigate('/dashboard');
      } else {
        console.error('Login failed');
        // Handle login failure here
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
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-5 rounded-md h-20"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          onClick={handleLogin}
          className="h-20 bg-teal-400 text-white p-2 rounded-md hover:bg-teal-600"
        >
          Submit
        </button>
        <Link
          to="/signup"
          className="h-15 text-black p-2 rounded-md hover:bg-teal-200 text-center w-full"
        >
          <button>Create account instead</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
