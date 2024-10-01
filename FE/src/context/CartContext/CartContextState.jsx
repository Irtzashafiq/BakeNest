import React, { useEffect } from "react";
import CartContext from "./CartContext";
import { useState } from "react";
const CartContextState = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (item) => {
    console.log("there is something amazing");
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item?.name);
      if (existingItem) {
        return prevItems.map((i) =>
          i.name === item?.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const incrementItem = (name) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItem = (name) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (name) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };

  const calculateTotalPrice = () => {
    return cartItems?.reduce((total, item) => {
      const itemTotal = parseFloat(item.price) * item.quantity;
      return total + itemTotal;
    }, 0);
  };

  useEffect(() => {
    const ttlprice = calculateTotalPrice();
    setTotalPrice(ttlprice);
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
