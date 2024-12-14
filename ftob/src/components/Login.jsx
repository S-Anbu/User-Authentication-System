import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:2000/login", {
        email,
        password,
      },{ withCredentials: true });

      if (res.status === 200) {
        setAlert(`Logged in successfully`);
        setTimeout(() => {
          navigate("/Dashboard");
        }, 1000);
      }
    } catch (error) { 
      setAlert(error.response.data.message);
      console.log(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            name='email'

            required
            onChange={(e) => {
              setEmail(e.target.value)
              setAlert('')
            } }
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            name='password'
            required
            onChange={(e) => {
              setPassword(e.target.value)
              setAlert('')
            }}
            className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold mb-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            Login
          </button>
        </form>
        {alert && (
          <p className="text-red-400  p-2 bg-blue-gray-50 text-center rounded font-semibold">
            {alert}{" "}
          </p>
        )}
        <div className="flex items-center justify-between">

          <button
            onClick={()=>navigate("/Register")}
            className="text-blue-500 underline mt-2"
          >
            New user ? Register
          </button>

          <button
            onClick={()=>navigate("/ForgetPassword")}
            className="text-blue-500 underline mt-2"
          >
            Forget Password !
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
