import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../context/CartContext/CartContext";
import axios from "axios"; // Import axios for API requests

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([]); // Initialize as an empty array
  const [loaded, setLoaded] = useState(false);
  const { addToCart } = useContext(CartContext);

  // Fetch menu items from the API when the component mounts
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/item/getAllItems"
        ); // Replace with your API endpoint
        const fetchedItems = response.data.response; // Assuming response.data is an array

        // Check if the fetched data is an array, otherwise log it for debugging
        if (Array.isArray(fetchedItems)) {
          setMenuItems(fetchedItems);
        } else {
          console.error("API response is not an array:", fetchedItems);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []); // Empty dependency array to fetch data on component mount

  return (
    <section className="py-[8%] bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {menuItems.length > 0 ? (
            menuItems.map((item, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <div
                  className={`relative w-full h-48 bg-gray-200 overflow-hidden rounded-md mb-4 fade-in ${
                    loaded ? "loaded" : ""
                  }`}
                >
                  <img
                    src={item?.image}
                    alt={item?.itemName}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onLoad={() => setLoaded(true)}
                  />
                </div>
                <h3 className="text-xl font-semibold">{item?.itemName}</h3>
                <p className="text-lg font-bold text-orange-500">
                  ${item?.itemPrice}
                </p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 px-4 py-2 bg-orange-400 text-white font-semibold rounded-md hover:bg-orange-500 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No items found</p> // Handle empty or invalid data
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
