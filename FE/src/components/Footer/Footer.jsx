import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Find Us Section */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">FIND US</h4>
          <p className="text-orange-500 hover:text-orange-400 cursor-pointer">
            Kalma Chock , Hafizabad
          </p>
          <p>Tel:+92-349-1121180</p>
          <p>
            Email:{" "}
            <a
              href="mailto:sales@bakenest.com"
              className="text-orange-500 hover:text-orange-400"
            >
              sales@bakenest.com
            </a>
          </p>
        </div>

        {/* Recent Event Section */}
        <div>
          <h4 className="text-white font-semibold mb-3">RECENT EVENT</h4>
          <div className="grid grid-cols-3 gap-2">
            <img
              src="Events/e1.png"
              alt="Event 1"
              className="rounded-lg h-[150px] w-[150px]"
            />
            <img
              src="Events/e2.png"
              alt="Event 2"
              className="rounded-lg h-[150px] w-[150px]"
            />
            <img
              src="Events/e3.jpg"
              alt="Event 3"
              className="rounded-lg h-[150px] w-[150px]"
            />
            <img
              src="Events/e4.jpg"
              alt="Event 4"
              className="rounded-lg h-[150px] w-[150px]"
            />
            <img
              src="Events/e5.jpg"
              alt="Event 5"
              className="rounded-lg h-[150px] w-[150px]"
            />
            <img
              src="Events/e6.jpeg"
              alt="Event 6"
              className="rounded-lg h-[150px] w-[150px]"
            />
          </div>
        </div>

        {/* Stay Connected Section */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">STAY CONNECTED</h4>
          <p>
            Don't miss BakeNest's latest news and events. Find us on social
            media:
          </p>
          <div className="flex space-x-3 cursor-pointer ">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center border-t border-gray-700 pt-5">
        <p className="text-gray-500">&copy; 2018 Copyright GoodResto</p>
        <p className="text-gray-500">
          Created with love by{" "}
          <a href="#" className="text-orange-500 hover:text-orange-400">
            Arman Nawaz
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
