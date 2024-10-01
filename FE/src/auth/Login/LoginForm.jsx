import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext/userContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const contxtUser = useContext(UserContext);

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };
  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        inputData
      );
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.userId);
      // contxtUser.setToken(response.data.userId);

      if (response.data.userId !== undefined) {
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to login.");
      console.log(error);
    }
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100 ">
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome back! Please enter your details.
      </p>
      <div className="mt-8 ">
        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            type="text"
            placeholder="Enter Your Email"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            onChange={handleChange}
            value={inputData.email}
            name="email"
          />
        </div>
      </div>
      <div>
        <label className="text-lg font-medium">Password</label>
        <input
          type="text"
          placeholder="Enter Your password"
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          value={inputData.password}
          name="password"
          onChange={handleChange}
        />
      </div>
      <div className="flex mt-8 justify-between items-center">
        <div>
          <input type="checkbox" />
          <label className="ml-2 font-medium text-base" htmlFor="remember">
            Remember for 30 days
          </label>
        </div>
        <button className=" font-medium text-base text-orange-500">
          {" "}
          Forgot Password
        </button>
      </div>
      <div className="flex  mt-8 flex-col gap-y-4 ">
        <button
          onClick={loginUser}
          className=" py-3 rounded-xl  bg-orange-500 text-white text-lg font-bold active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
        >
          Sign In
        </button>
      </div>
      <div className="flex mt-8 justify-center items-center ">
        <p className="font-medium text-base">Don't have an account?</p>
        <Link to="/signup">
          <button className=" text-orange-500 font-medium text-base ml-2">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
