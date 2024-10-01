import React from "react";

const ContactPage = () => {
  return (
    <div className="container mx-auto py-[8%]">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <form className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
            rows="5"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
