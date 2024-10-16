import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = () => {
  const [img, setImg] = useState(null);

  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();

  const validateForm = () => {
    const { username, email, password, confirmPassword } = inputData;
    if (!username || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const signupUser = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    // formData.append("image", image);
    formData.append("username", inputData.username);
    formData.append("email", inputData.email);
    formData.append("password", inputData.password);
    formData.append("confirmPassword", inputData.confirmPassword);
    formData.append("image", img);
    await axios
      .post("http://localhost:3000/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((val) => {
        if (val.data.message === "User created successfully") {
          toast.success("User created successfully!");
          console.log("User created successfully!");
          setInputData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          // setImage(null);
          navigate("/login");
        }
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || "Failed to create user.");
        console.log(e);
      });
  };

  return (
    <div className="bg-white px-10 py-5 rounded-3xl border-2 border-gray-100 ">
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome back! Please enter your details.
      </p>

      <div className="mt-5 ">
        <div>
          <label className="text-lg font-medium">Username</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            value={inputData.username}
            onChange={handleChange}
            name="username"
          />
        </div>
      </div>
      <div className="mt-5 ">
        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            type="text"
            placeholder="Enter Your Email"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            value={inputData.email}
            onChange={handleChange}
            name="email"
          />
        </div>
      </div>
      <div className="mt-5">
        <div>
          <label className="text-lg font-medium">Password</label>
          <input
            type="text"
            placeholder="Enter Your password"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            value={inputData.password}
            onChange={handleChange}
            name="password"
          />
        </div>
      </div>
      <div className="mt-5">
        <div>
          <label className="text-lg font-medium ">Confirm Password</label>
          <input
            type="text"
            placeholder="Enter Your password"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            value={inputData.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
        </div>
      </div>
      <div className="mt-5">
        <div>
          <label className="text-lg font-medium ">Image</label>
          <input
            type="file"
            placeholder="Image"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
      </div>

      <div className="flex  mt-8 flex-col gap-y-4 ">
        <button
          onClick={signupUser}
          className=" py-3 rounded-xl  bg-orange-500 text-white text-lg font-bold active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
        >
          Sign Up
        </button>
      </div>
      <div className="flex mt-8 justify-center items-center ">
        <p className="font-medium text-base">Already have an account ?</p>
        <Link to="/login">
          <button className=" text-orange-500 font-medium text-base ml-2">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
