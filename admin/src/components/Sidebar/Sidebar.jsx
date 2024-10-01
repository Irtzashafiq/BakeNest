import React from "react";
import "./Sidebar.css";
import { Outlet, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sideBarMain">
      <div className="leftContatiner">
        <ul className="sideBarLinks">
          <li onClick={() => navigate("/users")} className="sideLinks">
            Users
          </li>
          <li onClick={() => navigate("/orders")} className="sideLinks">
            Orders
          </li>
          <li onClick={() => navigate("/items")} className="sideLinks">
            Add Items
          </li>
        </ul>
      </div>
      <div className="rightContatiner">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
