import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{
        backgroundImage: "url('/images/main-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Low-resolution placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/main-bg-low-res.jpg')",
          filter: "blur(20px)",
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-full">
        <h1 className="text-5xl font-bold">Welcome to BAKENEST</h1>
        <p className="mt-4 text-lg">Where every bite is a delight!</p>
        <Link to="/menu">
          <button className="mt-8 px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500">
            Explore Our Menu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
