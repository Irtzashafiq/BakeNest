import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext/userContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const contxtUser = useContext(UserContext);

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { email: "", password: "" };

    if (!inputData.email) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else if (!inputData.email.includes("@")) {
      newErrors.email = "Email must include @";
      formIsValid = false;
    }

    if (!inputData.password) {
      newErrors.password = "Password is required";
      formIsValid = false;
    } else if (inputData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const loginUser = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        inputData
      );

      if (response.status === 200 && response.data.userId) {
        toast.success("Logged In Successfully");

        localStorage.setItem("token", response.data.userId);
        contxtUser?.setUserExist(response.data.userId);

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      // Handle specific errors based on status codes
      if (error.response?.status === 401) {
        toast.error("Incorrect email or password.");
      } else if (error.response?.status === 404) {
        toast.error("User not found. Please check your credentials.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome back! Please enter your details.
      </p>
      <div className="mt-8">
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
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <label className="text-lg font-medium">Password</label>
        <input
          type="password"
          placeholder="Enter Your password"
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          value={inputData.password}
          name="password"
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-2">{errors.password}</p>
        )}
      </div>
      <div className="flex mt-8 justify-between items-center">
        <div>
          <input type="checkbox" id="remember" />
          <label className="ml-2 font-medium text-base" htmlFor="remember">
            Remember for 30 days
          </label>
        </div>
        <button className="font-medium text-base text-orange-500">
          Forgot Password
        </button>
      </div>
      <div className="flex mt-8 flex-col gap-y-4">
        <button
          onClick={loginUser}
          className="py-3 rounded-xl bg-orange-500 text-white text-lg font-bold active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
        >
          Sign In
        </button>
      </div>
      <div className="flex mt-8 justify-center items-center">
        <p className="font-medium text-base">Don't have an account?</p>
        <Link to="/signup">
          <button className="text-orange-500 font-medium text-base ml-2">
            Sign Up
          </button>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
