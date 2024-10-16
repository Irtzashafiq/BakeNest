import React, { useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext/userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TierSection = () => {
  const contextuser = useContext(UserContext);

  const updatePlan = async (plan) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/user/updatePlan/:?id=${contextuser?.userExist}`,
        { plan }
      );
      const updateplan = response.data.response;
      console.log(updateplan);

      // Success toast
      toast.success(`You have successfully subscribed to the ${plan} plan!`);
    } catch (error) {
      console.error("Error updating plan:", error);

      // Error toast
      toast.error("Failed to update plan. Please try again later.");
    }
  };

  return (
    <div className="mx-20 my-5 p-2 rounded-t-xl">
      <ToastContainer /> {/* Toast notifications container */}
      <section className="bg-gray-100 mt-20 mb-10 pb-20">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-700 to-gray-500 text-center text-white py-10 rounded-t-xl">
          <h1 className="text-4xl font-bold mb-4">
            The right price for you, whoever you are
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit, amet consectetur adipiscing elit. Velit
            numquam eligendi quos odit doloribus molestiae voluptatum.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="container mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Plan */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800">Basic</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold">$9.99</span>
              <span className="text-gray-500">/month</span>
            </div>
            <p className="mt-4 text-gray-600">
              Modi dolorem expedita deleniti. Corporis iste qui inventore
              pariatur adipisci vitae.
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-700">5 products</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-700">
                  Up to 1,000 subscribers
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-700">Basic analytics</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-700">
                  48-hour support response time
                </span>
              </li>
            </ul>
            <button
              onClick={() => updatePlan("basic")}
              className="mt-8 px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-600"
            >
              Get Basic Plan
            </button>
          </div>

          {/* Delux Plan */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800">Delux</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold">$29.99</span>
              <span className="text-gray-500">/month</span>
            </div>
            <p className="mt-4 text-gray-600">
              Explicabo quo fugit vel facere ullam corrupti non dolores.
              Expedita eius sit sequi.
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-700">Unlimited products</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-700">
                  Unlimited subscribers
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-700">Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-700">
                  1-hour, dedicated support response time
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-700">
                  Marketing automations
                </span>
              </li>
            </ul>
            <button
              onClick={() => updatePlan("delux")}
              className="mt-8 px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-600"
            >
              Get Delux Plan
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TierSection;
