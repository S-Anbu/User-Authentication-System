import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:2000/get-user", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to fetch user data");
        console.error(error.response?.data);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:2000/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-orange-500 text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center font-semibold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          {message && <p className="text-green-500 mb-4">{message}</p>}
          {user ? (
            <div className="text-center">
              <FaUserCircle className="text-orange-500 text-6xl mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">
                Hello, {user.name || "User"}!
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>Email:</strong> {user.email}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm h-full">
                  <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
                  <p className="text-gray-600">No recent activity available.</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm h-80">
                  <h3 className="text-lg font-semibold mb-2">Settings</h3>
                  <p className="text-gray-600">Manage your account settings.</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
