import React from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa"; // FontAwesome Trash Icon
import { ToastContainer, toast } from "react-toastify"; // Importing toast functions
import "react-toastify/dist/ReactToastify.css"; // Importing styles for toast notifications

const OrderTable = ({ orders, onUpdateStatus, onDeleteOrder }) => {
  // Function to handle delete
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3000/order/deleteOrder/${orderId}`);
      onDeleteOrder(orderId);
      toast.success("Order deleted successfully!");
    } catch (error) {
      console.error("Failed to delete the order:", error);
      toast.error("Failed to delete the order."); 
    }
  };

  return (
    <div className="overflow-x-auto">
      <ToastContainer /> 
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
              Order ID
            </th>
            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
              Customer Name
            </th>
            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
              Items
            </th>
            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
              Total Amount
            </th>
            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order, i) => (
              <tr key={order._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {i + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {order?.user?.username}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {order.items.map((item, index) => (
                    <span key={index} className="block">
                      {item.quantity} {item.itemName}
                    </span>
                  ))}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  ${order.totalPrice}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === "Pending"
                        ? "bg-orange-100 text-orange-800"
                        : order.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  <select
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="On the Way">On the Way</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700 text-center">
                  {/* Delete Icon */}
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
