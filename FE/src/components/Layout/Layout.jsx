import React from "react";
import MyButton from "../Button";

const Layout = () => {
  return (
    <>
      <div className=" h-[87vh] w-full[100vh] flex ">
        <div className=" h-[87vh] w-[40vh] bg-blue-300 ml-5 mt-5 flex flex-col p-5 rounded-md gap-4">
          <h1>Menu</h1>
          <h1>Catagories </h1>
          <select name="cati" id="cati"></select>
          <h1>others</h1>
          <h1>others</h1>
          <h1>others</h1>
          <h1>others</h1>
          <h1>others</h1>
          <MyButton
            btn=" bg-white hover:bg-gray-200 mt-4 "
            click={() => {}}
            title="Logout"
          />
        </div>

        <div className="h-full w-[100%] bg-blue-300 ml-2 mr-2 mt-5 grid grid-cols-4 p-3 rounded-md">
          <div className="h-[40vh] w-[40vh] bg-gray-300  p-5 rounded-md">
            <h1>Item 1</h1>
          </div>
          <div className="h-[40vh] w-[40vh] bg-gray-300  p-5 rounded-md">
            <h1>Item 2</h1>
          </div>
          <div className="h-[40vh] w-[40vh] bg-gray-300  p-5 rounded-md">
            <h1>Item 3</h1>
          </div>
          <div className="h-[40vh] w-[40vh] bg-gray-300  p-5 rounded-md">
            <h1>Item 4</h1>
          </div>
          <div className="h-[40vh] w-[40vh] bg-gray-300  p-5 rounded-md">
            <h1>Item 5</h1>
          </div>
          <div className="h-[40vh] w-[40vh] bg-gray-300  p-5 rounded-md">
            <h1>Item 6</h1>
          </div>
          <div className="h-[40vh] w-[40vh] bg-gray-300  p-5 rounded-md">
            <h1>Item 7</h1>
          </div>
          <div className="h-[40vh] w-[40vh] bg-gray-300  p-5 rounded-md">
            <h1>Item 8</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
