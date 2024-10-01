import React from "react";
import SignUpForm from "./SignupForm";

const Signup = () => {
  return (
    <div className=" flex w-full h-screen bg-[#f1f1f1]">
      <div className="flex w-full  lg:w-1/2 items-center justify-center">
        <SignUpForm />
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 justify-center items-center bg-gray-200">
        <div className=" w-60 h-60 bg-gradient-to-tr from-orange-500 to-pink-500 rounded-full animate-bounce"></div>
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
      </div>
    </div>
  );
};

export default Signup;
