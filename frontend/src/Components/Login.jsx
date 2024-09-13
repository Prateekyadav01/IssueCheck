import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify"; // Import toast
import axios from 'axios'

const LoginPage = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            "https://zsshop.onrender.com/api/login", 
            data, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true // Include credentials (cookies) if needed
            }
        );

        if (response.status === 200) {
            console.log("Login successful:", response.data);
            toast.success("Login successful!");
            navigate("/"); // Fixed typo from `navigat` to `navigate`
            window.location.reload();
        } else {
            console.error("Login failed:", response.data.message);
            toast.error(`Login failed: ${response.data.message}`);
        }
    } catch (error) {
        console.error("Error during login:", error.response?.data || error.message);
        toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
    }
};



  return (
    <div className="flex items-center justify-center min-h-screen  m-2">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <CgProfile className="h-8 w-8" />
          {/* or use a placeholder image */}
          {/* <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-24 h-24 rounded-full border"
          /> */}
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm">
          have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
