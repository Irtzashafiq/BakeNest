import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import CartDrawer from "../CartDrawer";
import "./navbar.css";
import CartContext from "../../context/CartContext/CartContext";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "../../context/UserContext/userContext";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useContext(CartContext);
  const contxtUser = useContext(UserContext);
  const { setUserExist } = contxtUser;

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/home") {
        if (window.scrollY > 30) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      setUserExist(null);

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      toast.success("Logout successful! Redirecting...");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Failed to logout:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-20 flex justify-between items-center p-4 transition-all duration-300 ${
          location.pathname === "/home" && !scrolled
            ? "bg-transparent text-white "
            : "bg-white text-black shadow-md"
        }`}
      >
        <div
          className="text-5xl font-serif pl-8 cursor-pointer"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          BakeNest
        </div>
        <ul
          className={`hidden md:flex space-x-8 ${
            location.pathname === "/home" && !scrolled
              ? "text-white"
              : "text-black"
          }`}
        >
          <li className="hover:underline hover:text-orange-400">
            <Link to="/home">Home</Link>
          </li>
          <li className="hover:underline hover:text-orange-400">
            <Link to="/menu">Menu</Link>
          </li>
          <li className="hover:underline hover:text-orange-400">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:underline hover:text-orange-400">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="hover:underline hover:text-orange-400">
            <Link to="/tiers">Subscribe</Link>
          </li>
        </ul>
        <div className="flex items-center gap-x-6 pr-8 w-[10vw]">
          <div className="icon-wrapper">
            <FaShoppingCart
              className="icon cursor-pointer hover:text-gray-300 text-xl"
              onClick={() => setCartOpen(true)}
            />
            <span className="badge bg-orange-500 ">
              {cartItems?.length > 0 ? cartItems?.length : 0}
            </span>
          </div>
          <div className="icon-wrapper">
            <FaSearch className="icon cursor-pointer hover:text-gray-300 text-xl" />
          </div>
          <div className="icon-wrapper">
            <FaBars
              className="icon cursor-pointer hover:text-gray-300 text-xl"
              onClick={() => setMenuOpen(true)}
            />
          </div>

          <div className="icon-wrapper">
            <FaSignOutAlt
              className="icon cursor-pointer hover:text-orange-600 text-xl "
              onClick={handleLogout}
            />
          </div>
        </div>
      </nav>

      <CartDrawer setCartOpen={setCartOpen} cartOpen={cartOpen} />

      <div
        className={`fixed top-0 right-0 h-full w-1/4 bg-black text-white z-40 shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">About Our Store</h2>
          <FaTimes
            className="text-xl cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>
        <div className="p-4 overflow-y-auto h-full">
          <p className="mb-4">
            Welcome to BakeNest! We offer the best cakes, pies, and pastries.
          </p>
          <ul className="mb-8">
            <li>#cakes</li>
            <li>#pastries</li>
            <li>#delicious</li>
          </ul>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
            <button
              type="submit"
              className="w-full bg-gray-600 p-2 rounded hover:bg-gray-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <ToastContainer />
    </>
  );
};

export default Navbar;
