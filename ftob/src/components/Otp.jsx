import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);

  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:2000/verify-otp", {
        otp,
      });
      setMessage(response.data.message); // Show success message

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(error.response.data || "Error verifying OTP");
    }
  };

  const handleResendOtp = () => {
    setIsResendDisabled(true);
    setTimer(60); // Reset the timer

    navigate("/resend-OTP"); // Trigger resend OTP logic here if needed
  };

  useEffect(() => {
    if (isResendDisabled) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            setIsResendDisabled(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isResendDisabled]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify OTP
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the OTP sent to your registered email.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="otp"
              id="otp"
              maxLength="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={handleOtpChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Submit OTP
          </button>
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResendDisabled}
            className={`w-full py-2 px-4 rounded-md font-medium focus:outline-none focus:ring-2 ${
              isResendDisabled
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {isResendDisabled ? `Resend OTP (${timer}s)` : "Resend OTP"}
          </button>
        </form>
        {message && (
          <p className="text-center mt-4 text-sm text-red-600 font-semibold p-2 rounded bg-blue-gray-50">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Otp;
