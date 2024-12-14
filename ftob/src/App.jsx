import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Otp from "./components/Otp";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import ResendOTP from "./components/ResendOTP";
import LandingPage from "./components/LandingPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:2000/get-user", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect unauthenticated users to login */}
        <Route
          path="/"
          element={isAuthenticated ? <LandingPage /> : <Navigate to="/login" />}
        />
        <Route path="/Register" element={<Register />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/resend-OTP" element={<ResendOTP />} />
        <Route path="/login" element={<Login />} />
        {/* Protect Dashboard route */}
        <Route
          path="/Dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/ResetPassword/:ForgetToken" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
