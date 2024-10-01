import { FaTimes } from "react-icons/fa";
import CartContext from "../../context/CartContext/CartContext";
import { useContext } from "react";

const CartDrawer = ({ cartOpen, setCartOpen }) => {
  const { cartItems, incrementItem, decrementItem, removeItem, totalPrice } =
    useContext(CartContext);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/4 bg-white text-black z-40 shadow-lg transform transition-transform duration-300 ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <FaTimes
          className="text-xl cursor-pointer"
          onClick={() => setCartOpen(false)}
        />
      </div>
      <div className="p-4 overflow-y-auto h-full">
        {cartItems?.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems?.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex gap-x-4 items-center ">
                <div className="h-[60px] overflow-hidden w-[60px] rounded-xl">
                  <img
                    className="w-[100%] object-cover "
                    src={item.image}
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-start justify-start  ">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-md font-bold text-pink-500">
                    {item.price}
                  </p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => incrementItem(item.name)}
                  className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  +
                </button>
                <button
                  onClick={() => decrementItem(item.name)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  -
                </button>
                <button
                  onClick={() => removeItem(item.name)}
                  className="px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
        <div className="flex justify-between ">
          <strong>Total Amount</strong>
          <strong> ${totalPrice}</strong>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
