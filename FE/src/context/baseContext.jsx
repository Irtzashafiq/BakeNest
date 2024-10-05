import React from "react";
import CartContextState from "./CartContext/CartContextState";
import UserContextState from "./UserContext/UserContextState";

const BaseContext = (props) => {
  return (
    <div>
      <UserContextState>
        <CartContextState>{props.children}</CartContextState>
      </UserContextState>
    </div>
  );
};

export default BaseContext;
