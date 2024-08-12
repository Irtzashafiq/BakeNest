import React from "react";
import "./AuthPage.css";
import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="grid grid-cols-2 mainDivAuth">
      <div className="imgDivAuth">
              <img src="1.svg" alt="" />
              
      </div>
      <div className="formDivAuth">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
