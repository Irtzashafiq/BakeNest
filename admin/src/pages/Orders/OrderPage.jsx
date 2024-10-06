import React, { useEffect, useState } from "react";
import axios from "axios";
import urlApi from "../../MainLinks"; // Ensure this points to your API base URL
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderTable from "./OrderTable";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order._id !== orderId)
    );
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/order/getAllOrders`
      );

      setOrders(response.data.response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders.", {
        position: "bottom-right",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${urlApi}/orders/updateorder/${orderId}`, {
        status: newStatus,
      });
      toast.success("Order status updated successfully!", {
        position: "bottom-right",
      });
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-[#FAA653] mb-4">
          Order Management
        </h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-8 w-8 text-orange-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        ) : (
          <OrderTable
            orders={orders}
            onUpdateStatus={updateOrderStatus}
            onDeleteOrder={handleDeleteOrder}
          />
        )}
      </div>
    </div>
  );
};

export default OrderPage;
