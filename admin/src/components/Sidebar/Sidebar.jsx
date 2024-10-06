import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [activeLink, setActiveLink] = useState(location.pathname); // Set the initial active link

  const handleLinkClick = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  return (
    <div className="sideBarMain">
      <div className="leftContatiner">
        <ul className="sideBarLinks " >
          <li
            onClick={() => handleLinkClick("/users")}
            className={`sideLinks ${activeLink === "/users" ? "active" : ""}`} 
          >
            Users
          </li>
          <li
            onClick={() => handleLinkClick("/orders")}
            className={`sideLinks ${activeLink === "/orders" ? "active" : ""}`} 
          >
            Orders
          </li>
          <li
            onClick={() => handleLinkClick("/items")}
            className={`sideLinks ${activeLink === "/items" ? "active" : ""}`} 
          >
            Add Items
          </li>
          <li
            onClick={() => handleLinkClick("/feedbacks")}
            className={`sideLinks ${activeLink === "/feedbacks" ? "active" : ""}`} 
          >
            Feedbacks
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
