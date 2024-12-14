import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResendOTP = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const Navigate =useNavigate()

  const handleResendOTP = async () => {
    try {
      const response = await axios.post('http://localhost:2000/resend-OTP', { email });
      setMessage(response.data.message);
      setTimeout(() => {
        Navigate('/otp')
      }, 2000);
    } catch (error) {
      console.error("Error resending OTP:", error);
      setMessage("Failed to resend OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
          Resend OTP
        </h2>
        <div className="space-y-4">
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
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            onClick={handleResendOTP}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Resend OTP
          </button>
        </div>
        {message && (
          <p className="mt-4 text-sm font-medium text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResendOTP;
