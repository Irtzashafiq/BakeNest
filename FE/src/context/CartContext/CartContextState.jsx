import React, { useEffect } from "react";
import CartContext from "./CartContext";
import { useState } from "react";

const CartContextState = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === item?._id);
      if (existingItem) {
        return prevItems.map((i) =>
          i._id === item?._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const incrementItem = (_id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItem = (_id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === _id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (_id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== _id));
  };

  const calculateTotalPrice = () => {
    return cartItems?.reduce((total, item) => {
      const itemTotal = parseFloat(item.itemPrice) * item.quantity;
      return total + itemTotal;
    }, 0);
  };

  useEffect(() => {
    const ttlprice = calculateTotalPrice();
    setTotalPrice(ttlprice);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setTotalPrice(calculateTotalPrice());
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        incrementItem,
        decrementItem,
        removeItem,
        totalPrice,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextState;
