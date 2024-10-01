import React from "react";
import UserContextState from "./UserContext/UserContextState";


const ContextBase = (props) => {
  return (
    <UserContextState>
      {props.children}
    </UserContextState>
  );
};

export default ContextBase;
