import React from 'react';
import landingpage from '../assets/landingpage.svg'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <img
            src={landingpage}
            alt="Illustration"
            className="w-36 h-auto"
          />

        </div>
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Welcome to Our Website</h1>
        <p className="text-gray-500 mb-6">Please register or log in to continue</p>
        <div className="flex justify-between space-x-4">
          <button
          onClick={()=>{
            navigate('/Register')
          }}
            className="w-full py-2 px-4 bg-deep-purple-500 text-white rounded-lg shadow hover:bg-deep-purple-700 transition"
          >
            Register
          </button>
          <button
          onClick={()=>{
            navigate('/login')
          }}
            className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
