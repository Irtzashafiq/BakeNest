import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const ItemPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    id: null,
    itemName: "",
    itemPrice: "",
    itemDescription: "",
    // itemImage: "",
  });
  const [editMode, setEditMode] = useState(false);

  // Fetch items from the backend API
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/item/getallItems"
      );
      console.log(response.data.response);
      setItems(response.data.response); // Ensure this matches the API response structure
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
    setNewItem({
      id: null,
      itemName: "",
      itemPrice: "",
      itemDescription: "",
      //   itemImage: "",
    });
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // API call to add or update an item
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new item object without id for POST requests
    const itemToSubmit = editMode
      ? newItem // In edit mode, keep the id for updating
      : {
          itemName: newItem.itemName,
          itemPrice: newItem.itemPrice,
          itemDescription: newItem.itemDescription,
          //   itemImage: newItem.itemImage,
        };

    if (editMode) {
      // Edit mode: Send a PUT request to update the item
      try {
        await axios.put(
          `http://localhost:3000/item/updateItem/:?id=${newItem._id}`,

          itemToSubmit
        );
        console.log(newItem._id);
        fetchItems(); // Refresh the items list after editing
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      // Create new item via POST request
      try {
        await axios.post("http://localhost:3000/item/createItem", itemToSubmit);
        fetchItems(); // Refresh the items list after creation
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }

    // Reset form and state
    setShowForm(false);
    setEditMode(false);
    setNewItem({
      id: null,
      itemName: "",
      itemPrice: "",
      itemDescription: "",
      //   itemImage: "",
    });
  };

  // API call to delete an item
  const deleteItem = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/item/deleteItem/:?id=${_id}`);
      fetchItems(); // Refresh the items list after deleting
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Edit an item (preload form with the item data)
  const editItem = (item) => {
    setNewItem(item);
    setShowForm(true);
    setEditMode(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-500">
            Item Management
          </h2>
          <button
            className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded-lg"
            onClick={toggleForm}
          >
            {showForm ? "Close Form" : "Add New Item"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-6 bg-gray-50 p-6 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Item Name</label>
              <input
                type="text"
                name="itemName"
                value={newItem.itemName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Item Price</label>
              <input
                type="number"
                name="itemPrice"
                value={newItem.itemPrice}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Item Description
              </label>
              <textarea
                name="itemDescription"
                value={newItem.itemDescription}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                rows="4"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Item Image URL</label>
              <input
                type="text"
                name="itemImage"
                value={newItem.itemImage}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
            >
              {editMode ? "Update Item" : "Add Item"}
            </button>
          </form>
        )}

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            All Items
          </h3>
          {items?.length > 0 ? (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="p-4 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-bold text-orange-500">
                      {item.itemName}
                    </h4>
                    <p className="text-gray-700">${item.itemPrice}</p>
                    <p className="text-gray-600">{item.itemDescription}</p>
                    {/* {item.itemImage && (
                      <img
                        src={item.itemImage}
                        alt={item.itemName}
                        className="mt-2 w-full h-40 object-cover rounded-lg"
                      />
                    )} */}
                  </div>
                  <div className="flex space-x-4">
                    <FaEdit
                      className="text-gray-600 cursor-pointer hover:text-orange-500"
                      onClick={() => editItem(item)}
                    />
                    <FaTrash
                      className="text-gray-600 cursor-pointer hover:text-red-500"
                      onClick={() => deleteItem(item?._id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No items added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
