import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    id: null,
    itemName: "",
    itemPrice: "",
    itemDescription: "",
    itemQuantity: "",
    itemImage: "",
  });
  const [editMode, setEditMode] = useState(false);

  // Fetch items from the backend API
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/item/getallItems"
      );
      setItems(response.data.response); // Ensure this matches the API response structure
    } catch (error) {
      toast.error("Error fetching items.", {
        position: "bottom-right",
      });
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
      itemQuantity: "",
      itemImage: "",
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

    const itemToSubmit = editMode
      ? newItem
      : {
          itemName: newItem.itemName,
          itemPrice: newItem.itemPrice,
          itemDescription: newItem.itemDescription,
        };

    if (editMode) {
      try {
        var obj = {
          itemName: newItem?.itemName,
          itemPrice: newItem?.itemPrice,
          itemDescription: newItem?.itemDescription,
        };
        await axios.put(
          `http://localhost:3000/item/updateItem/:?id=${newItem._id}`,
          obj
        );
        toast.success("Item updated successfully.", {
          position: "bottom-right",
        });
        fetchItems(); // Refresh the items list after editing
      } catch (error) {
        toast.error("Error updating item.", {
          position: "bottom-right",
        });
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("itemImage", newItem.itemImage);
        formData.append("itemName", newItem.itemName);
        formData.append("itemPrice", newItem.itemPrice);
        formData.append("itemDescription", newItem.itemDescription);
        await axios.post("http://localhost:3000/item/createItem", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Item added successfully.", {
          position: "bottom-right",
        });
        fetchItems(); // Refresh the items list after creation
      } catch (error) {
        toast.error("Error adding item.", {
          position: "bottom-right",
        });
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
      itemQuantity: "",
      itemImage: "",
    });
  };

  // API call to delete an item
  const deleteItem = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/item/deleteItem/:?id=${_id}`);
      toast.success("Item deleted successfully.", {
        position: "bottom-right",
      });
      fetchItems(); // Refresh the items list after deleting
    } catch (error) {
      toast.error("Error deleting item.", {
        position: "bottom-right",
      });
    }
  };

  // Edit an item (preload form with the item data)
  const editItem = (item) => {
    setNewItem(item);
    setShowForm(true);
    setEditMode(true);
  };

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#FAA653]">Item Management</h2>
          <button
            className="bg-[#FAA653] hover:bg-orange-400 text-white py-2 px-4 rounded-lg"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAA653]"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAA653]"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAA653]"
                rows="4"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Item Image URL</label>
              <input
                type="file"
                onChange={(e) =>
                  setNewItem((prev) => ({
                    ...prev,
                    itemImage: e.target.files[0],
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAA653]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#FAA653] hover:bg-orange-400 text-white py-2 px-4 rounded-lg"
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
                    <h4 className="text-lg font-bold text-[#FAA653]">
                      {item.itemName}
                    </h4>
                    <p className="text-gray-700">${item.itemPrice}</p>
                    <p className="text-gray-600">{item.itemDescription}</p>
                    {/* {item?.itemImage && ( */}
                    <img
                      src={"http://localhost:3000/" + item?.itemImage}
                      alt={item.itemName}
                      className="mt-2 w-full h-40 object-cover rounded-lg"
                    />
                    {/* // )} */}
                  </div>
                  <div className="flex space-x-4">
                    <FaEdit
                      className="text-gray-600 cursor-pointer hover:text-[#FAA653]"
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
