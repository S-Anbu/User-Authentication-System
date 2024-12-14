import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "./Popup";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setError('')
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setError("* Passwords does not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:2000/register", values);

      if (res.status === 201) {
        setError(""); 
        setShowPopup(true); // Show popup on successful registration
        setTimeout(() => {
          navigate("/otp");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(error.response.data.message);
      } else {
        setError("Failed to register. Please try again.");
        console.log(`Error in submitting: ${error}`);
      }
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    navigate("/otp"); // Redirect after closing popup
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={handleChange}
              value={values.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={handleChange}
              value={values.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={handleChange}
              value={values.password}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              onChange={handleChange}
              value={values.confirmPassword}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Confirm your password"
            />
          </div>
          {error && <p className="text-red-400 mb-3  p-2 bg-blue-gray-50 text-center rounded font-semibold">{error}</p>}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Submit
          </button>
        </form>
        {showPopup && (
          <Popup
            message="The OTP has been sent to your registered email."
            onClose={handleClose}
          />
        )}
        <div>
          <button onClick={()=>navigate('/login')} className="text-blue-500 underline mt-2 p-2" >Already registered ! Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
