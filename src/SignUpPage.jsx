import React, {useState, useEffect, useMemo,useRef} from 'react';
import { Link } from 'react-router-dom';

const SignUpPage=() =>{
  return (
    <div className="flex-1 relative top-1/4 left-1/4">
      <div className="w-1/2 h-1/2 bg-gray-100 p-8 rounded-md flex flex-col justify-between">
        <div className="text-2xl font-bold text-center">Welcome!</div>
        <input
          type="text"
          placeholder="Username"
          className="border p-5 rounded-md h-15"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-5 rounded-md h-15"
        />
        <input
          type="password"
          placeholder="Verify password"
          className="border p-5 rounded-md h-15"
        />
        <button className="h-20 bg-teal-400 text-white p-2 rounded-md hover:bg-teal-600">
          Submit
        </button>
        <Link to="/login" className="h-15 text-black p-2 rounded-md hover:bg-teal-200 text-center w-full">
        <button>
          Already have an account?
        </button>
        </Link>
      </div>
  </div>
  )
}

export default SignUpPage;