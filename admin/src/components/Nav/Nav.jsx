import React, { useContext, useEffect, useState } from "react";
import "./Nav.css";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext/UserContext";
import { toast } from "react-toastify";
const Nav = () => {
  const [displayDrop, setDisplayDrop] = useState(false);
  const contxtUser = useContext(UserContext);
  const navigate = useNavigate();
  const { setCurrentUser, setToken } = contxtUser;
  const handleLogout = () => {
    setCurrentUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully", {
      position: "bottom-right",
    });
    navigate("/login");
  };

  return (
    <div className="navMain">
      <div className="flex items-center">
        <div className="dropMain">
          <IconButton
            onClick={() => setDisplayDrop(!displayDrop)}
            className="mx-2 sideBarIcon"
          >
            <i className="fa-solid fa-bars"> </i>
          </IconButton>
          <div className={`dropData ${displayDrop === true ? "block" : ""}`}>
            <ul>
              <li onClick={() => navigate("/users")} className="navLinksDrop">
                Users
              </li>
              <li
                onClick={() => navigate("/organizers")}
                className="navLinksDrop"
              >
                Organizers
              </li>
              <li onClick={() => navigate("/events")} className="navLinksDrop">
                Events
              </li>
              <li onClick={() => navigate("/profile")} className="navLinksDrop">
                Profile
              </li>
            </ul>
          </div>
        </div>
        <div
          className="text-5xl font-serif p-4 cursor-pointer bg-gradient-to-r  from-[#FAA653] rounded-l-full "
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          BakeNest
        </div>
      </div>
      <div>
        <IconButton
          className="tooltip"
          data-title="Logout"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket text-white text-[3vh]"></i>
        </IconButton>
      </div>
    </div>
  );
};

export default Nav;
