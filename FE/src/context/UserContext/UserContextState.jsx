import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import axios from "axios";

const UserContextState = (props) => {
  const url = "http://localhost:3000";
  const [userExist, setUserExist] = useState("");
  const [users, setUsers] = useState([]);
  const [updateState, setUpdateState] = useState(false);

  const getUsers = async () => {
    await axios
      .get(url + "/users/getalluser")
      .then((val) => setUsers(val.data.response))
      .catch((e) => console.log(e));
  };

  const deleteUser = async (id) => {
    await axios
      .delete(url + "/users/deleteuser/:?id=" + id)
      .then((val) => console.log(val.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userExist,
        setUserExist,
        users,
        setUsers,
        deleteUser,
        updateState,
        setUpdateState,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextState;
