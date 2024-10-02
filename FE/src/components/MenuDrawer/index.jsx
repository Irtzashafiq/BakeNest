import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const MenuDrawer = ({ menuOpen, setMenuOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post(
        "http://localhost:3000/contact/createFeedback",
        formData
      );
      console.log(response.data); // Handle response data
      // Optionally, clear the form fields after submission
      setFormData({ name: "", email: "", message: "" });

      setMenuOpen(true);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            required
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
