import React, { useContext, useEffect, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import urlApi from "../../../MainLinks";
import UserContext from "../../../context/UserContext/UserContext";
import { toast } from "react-toastify";
const Signup = () => {
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });
  const [role, setRole] = useState(false);
  // // const [image, setImage] = useState(null);
  const contxtUser = useContext(UserContext);
  const navigate = useNavigate();
  const { reloadUser, setReloadUser } = contxtUser;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };
  const SignUpAdmin = async () => {
    const formData = new FormData();
    // formData.append("image", image);
    formData.append("username", inputData.username);
    formData.append("email", inputData.email);
    formData.append("password", inputData.password);
    formData.append("confirmPassword", inputData.confirmPassword);
    formData.append("role", inputData.role);
    await axios
      .post(urlApi + "/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((val) => {
        if (val.status === 201) {
          setReloadUser(!reloadUser);
          setInputData({
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            role: "admin",
          });
          // setImage(null);
          setRole(false);
          toast.success("Register successfully", {
            position: "bottom-right",
          });
          navigate("/login");
        } else {
          toast.error("Something went wrong!", {
            position: "bottom-right",
          });
        }
      })
      .catch((e) =>
        toast.error(e?.response?.data?.message, {
          position: "bottom-right",
        })
      );
  };
  // useEffect(() => {
  //   if (role === true) {
  //     setInputData((prev) => ({ ...prev, role: "user" }));
  //   } else {
  //     setInputData((prev) => ({ ...prev, user: "admin" }));
  //   }
  // }, [role]);

  return (
    <div className="formDivMain ">
      <h2 className="text-[5vh] prime2 font-bold ">Register</h2>
      <div className="fieldsAuth  w-full gap-y-2">
        <input
          onChange={handleChange}
          value={inputData.username}
          name="username"
          type="text"
          className="authField"
          placeholder="Username"
        />
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
        <input
          onChange={handleChange}
          value={inputData.confirmPassword}
          name="confirmPassword"
          type="password"
          className="authField"
          placeholder="Confrim Password"
        />
        {/* <div className="file-upload">
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setImage(e.target.files[0])}
            className="file-input"
          />
          <label htmlFor="fileInput" className="custom-file-label">
            Choose File
          </label>
        </div> */}

        {/* <div className="w-full flex items-center justify-start">
          <input
            checked={role}
            onChange={(e) => setRole(e.target.checked)}
            type="checkbox"
            id="chekRole"
            className="mx-2"
            placeholder="Password"
          />
          <label htmlFor="chekRole" className="text-gray-400  text-[2.2vh]">
            Register as an Organizer
          </label>
        </div> */}
      </div>
      <div className="flex justify-end items-center w-full">
        <small className="text-gray-400  text-[2vh]">
          Already have an account?{" "}
        </small>
        <span
          onClick={() => navigate("/login")}
          className="prime2 activePrime1 cursor-pointer text-[2.3vh] ml-2"
        >
          Login
        </span>
      </div>

      <button onClick={SignUpAdmin} className="btnMain mt-5">
        Register
      </button>
    </div>
  );
};

export default Signup;
