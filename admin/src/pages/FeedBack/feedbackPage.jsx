import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Import arrow icons

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today's date
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/contact/getFeedback"
      );
      setFeedbacks(response.data);
      setFilteredFeedbacks(response.data);
      console.log("getFunctions");
    } catch (error) {
      console.error("Error fetching feedbacks", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchFeedbacks, 300000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    filterFeedbacks();
  }, [selectedDate, feedbacks]);

  const filterFeedbacks = () => {
    const startOfDay = new Date(selectedDate).setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate).setHours(23, 59, 59, 999);

    const filtered = feedbacks.filter((feedback) => {
      const feedbackDate = new Date(feedback.createdAt); // Ensure createdAt is a valid date field in your feedback data
      return feedbackDate >= startOfDay && feedbackDate <= endOfDay;
    });

    setFilteredFeedbacks(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/contact/deleteFeedback/${id}`);
      // Filter out the deleted feedback from the state
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
    } catch (error) {
      console.error("Error deleting feedback", error);
    }
  };

  // Function to get the day of the week from the selected date
  const getDayOfWeek = (date) => {
    const options = { weekday: "long" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Functions to change the selected date
  const incrementDate = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setSelectedDate(nextDate.toISOString().split("T")[0]);
  };

  const decrementDate = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setSelectedDate(prevDate.toISOString().split("T")[0]);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#FAA653]">
        Customer Feedbacks
      </h1>

      <div className="flex justify-between mb-4 items-center">
        <div className="text-lg font-semibold">
          {getDayOfWeek(selectedDate)}, {selectedDate}
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={decrementDate} aria-label="Previous Day">
            <FaArrowDown className="text-lg text-gray-600 hover:text-[#FAA653] transition" />
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)} // Update state on date change
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FAA653] transition"
          />
          <button onClick={incrementDate} aria-label="Next Day">
            <FaArrowUp className="text-lg text-gray-600 hover:text-[#FAA653] transition" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="relative border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <h3 className="text-xl font-semibold text-[#FAA653]">
                {feedback.name}
              </h3>
              <p className="text-gray-400">{feedback.email}</p>
              <p className="text-gray-700 mb-4 font-semibold italic text-xl">
                {feedback.message}
              </p>
              <button
                onClick={() => handleDelete(feedback._id)}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-colors duration-300"
                aria-label="Delete Feedback"
              >
                <FaTrash className="text-xl" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700">
            No feedbacks found for the selected date.
          </p>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
