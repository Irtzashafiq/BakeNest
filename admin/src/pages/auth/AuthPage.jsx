import React from "react";
import "./AuthPage.css";
import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 mainDivAuth">
      <div className="imgDivAuth">
        <img src="FullLogo.png" alt="" />
      </div>
      <div className="formDivAuth">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
