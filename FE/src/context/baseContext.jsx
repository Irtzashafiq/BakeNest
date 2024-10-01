import React from "react";
import CartContextState from "./CartContext/CartContextState";

const BaseContext = (props) => {
  return (
    <div>
      <CartContextState>{props.children}</CartContextState>
    </div>
  );
};

export default BaseContext;
