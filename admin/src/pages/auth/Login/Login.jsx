import React, { useContext, useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import urlApi from "../../../MainLinks";
import UserContext from "../../../context/UserContext/UserContext";
import { toast } from "react-toastify";

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const contxtUser = useContext(UserContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async () => {
    await axios
      .post(urlApi + "/user/login", inputData)
      .then((val) => {
        console.log(val);
        if (val?.data?.message === "Logged In Successfully") {
          setInputData({
            email: "",
            password: "",
          });
          // localStorage.setItem("user", val.data.user);
          localStorage.setItem("token", val.data.userId);
          contxtUser.setToken(val.data.userId);
          toast.success("Login successfully!", {
            position: "bottom-right",
          });
          navigate("/");
        } else {
          toast.error("Something went wrong!", {
            position: "bottom-right",
          });
        }
      })
      .catch((e) =>
        toast.error(e.response?.data?.message, {
          position: "bottom-right",
        })
      );
  };
  return (
    <div className="formDivMain ">
      <h2 className="text-[5vh] font-bold prime2">Login</h2>
      <div className="fieldsAuth  w-full gap-y-2">
        <input
          onChange={handleChange}
          value={inputData.email}
          name="email"
          type="text"
          className="authField"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          value={inputData.password}
          name="password"
          type="password"
          className="authField"
          placeholder="Password"
        />
      </div>
      <div className="flex justify-end items-center w-full">
        <small className="text-gray-400  text-[2vh]">
          Don't have an account?{" "}
        </small>
        <span
          onClick={() => navigate("/register")}
          className="prime2 activePrime1 cursor-pointer text-[2.3vh] ml-2"
        >
          Register
        </span>
      </div>

      <button onClick={handleLogin} className="btnMain mt-5">
        Login
      </button>
    </div>
  );
};

export default Login;
