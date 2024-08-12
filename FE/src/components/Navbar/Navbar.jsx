import React from "react";
import MyButton from "../Button";

const Navbar = () => {
  return (
    <div className=" h-[10vh] w-full bg-blue-300 flex rounded-b-lg">
      <div className=" h-full w-1/2  flex justify-center">
        <div className="h-full w-3/4 flex justify-start items-center ">
        <strong className="text-xl cursor-pointer text-gray-100 shadow-gray-700 shadow-md p-2 rounded-md">Cake Bites</strong>
        </div>
      </div>
      <div className=" h-full w-1/2  flex justify-center">
        <div className="h-full w-3/4 flex justify-around items-center ml-40">
        <h1 className="text-lg font-semibold text-gray-700 cursor-pointer">Profile</h1>
        <h1 className="text-lg font-semibold text-gray-700 cursor-pointer">About</h1>
          <MyButton
           btn=" bg-white hover:bg-gray-200  "
           click={() => {}}
           title="Logout"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
