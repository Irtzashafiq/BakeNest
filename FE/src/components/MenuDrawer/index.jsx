import React from "react";
import { FaTimes } from "react-icons/fa";

const MenuDrawer = ({ menuOpen, setMenuOpen }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/4 bg-black text-white z-40 shadow-lg transform transition-transform duration-300 ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">About Our Store</h2>
        <FaTimes
          className="text-xl cursor-pointer"
          onClick={() => setMenuOpen(false)}
        />
      </div>
      <div className="p-4 overflow-y-auto h-full">
        <p className="mb-4">
          Welcome to BakeNest! We offer the best cakes, pies, and pastries.
        </p>
        <ul className="mb-8">
          <li>#cakes</li>
          <li>#pastries</li>
          <li>#delicious</li>
        </ul>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
          <button
            type="submit"
            className="w-full bg-gray-600 p-2 rounded hover:bg-gray-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MenuDrawer;
