import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        console.error("Passwords don't match");
        return;
      }

      const response = await fetch(VITE_API_URL+'/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 201) {
        const data = await response.json();
        navigate('/dashboard');
      } else {
        console.error('Signup failed');
        // Handle signup failure here
      }
    } catch (error) {
      console.error('API call error:', error);
    }
  };

  return (
    <div className="flex-1 relative top-1/4 left-1/4 ">
      <div className="w-1/2 h-2/3 bg-gray-100 p-8 rounded-md flex flex-col justify-between">
        <div className="text-2xl font-bold text-center">Create an Account</div>
        <input
          type="text"
          placeholder="Username"
          className="border p-5 rounded-md h-20"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-5 rounded-md h-20"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-5 rounded-md h-20"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button
          onClick={handleSignup}
          className="h-20 bg-teal-400 text-white p-2 rounded-md hover:bg-teal-600"
        >
          Sign Up
        </button>
        <Link
          to="/login"
          className="h-15 text-black p-2 rounded-md hover:bg-teal-200 text-center w-full"
        >
          <button>Already have an account? Sign in</button>
        </Link>
        <Link to="/dashboard" className="h-20 flex items-center justify-center bg-teal-300 text-white p-2 rounded-md hover:bg-teal-600"
        ><p className='text-center'>Guest mode</p>
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
