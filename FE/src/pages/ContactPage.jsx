import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the data to the backend
      const response = await axios.post(
        "http://localhost:3000/contact/createFeedback",
        formData
      );
      if (response.status === 200) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("There was an error sending the message!", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-12 mt-[6%]">
      <h1 className="text-5xl font-bold text-center mb-8 text-gray-700">
        Contact Us
      </h1>
      <form
        className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-400 transition duration-300"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-400 transition duration-300"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-400 transition duration-300"
            rows="5"
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition duration-300 shadow-md"
        >
          Send Message
        </button>
      </form>
      <ToastContainer /> 
    </div>
  );
};

export default ContactPage;
