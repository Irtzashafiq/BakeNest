import React from "react";

const TextImagePage = () => {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white px-6 lg:px-20 py-16">
      {/* Left Side: Quote Section */}
      <div className="lg:w-1/2 flex flex-col items-start text-left space-y-6">
        <div className="text-5xl font-light text-gray-600 mb-2">
          <span className="text-4xl text-gray-400">&ldquo;</span>
        </div>
        <p className="text-2xl font-medium text-gray-700">
          Cooking is all about people. Food is maybe the only universal thing
          that really has the power to bring everyone together. No matter what
          culture, everywhere around the world, people get together to eat.
        </p>
        <p className="text-3xl font-light text-gray-500 italic">Guy Fieri</p>
      </div>

      {/* Right Side: Image Section */}
      <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0">
        <img
          src="/chef.jpg"
          alt="Chef"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default TextImagePage;
