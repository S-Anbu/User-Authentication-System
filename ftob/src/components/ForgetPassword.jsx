import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [mess, setMess] = useState('');

  const navigate= useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/ForgetPassword', {email})
      
      setMess(response.data.message)
      
    } catch (error) {
      setMess(error.message)
      console.log(error);
      
    }

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
          Forget Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your Registered email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setMess('')
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Send Reset Link
          </button>
        </form>
        <div className='flex  justify-center'>

        {mess && (
          <p className="mt-4 text-sm  text-red-600 p-2 bg-blue-gray-50  text-center font-semibold rounded ">{mess}</p>
        )}
        </div>
        <div>
          <button onClick={()=>navigate('/login')} className="text-blue-500 underline mt-2 p-2" > Login</button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
