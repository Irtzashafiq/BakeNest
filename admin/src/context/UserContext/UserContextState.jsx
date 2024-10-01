import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import urlApi from "../../MainLinks";
import { toast } from "react-toastify";
const UserContextState = (props) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [reloadUser, setReloadUser] = useState(false);
  const getAllUsers = async () => {
    await axios
      .get(urlApi + "/user/getalluser")
      .then((val) => {
        console.log(val);
        setUsers(val?.data?.response);
      })
      .catch((e) => console.log(e));
  };
  const deleteUser = async (id) => {
    await axios
      .delete(urlApi + "/user/deleteuser/:?id=" + id)
      .then((val) => {
        setReloadUser(!reloadUser);
        toast.success("User Deleted successfully!", {
          position: "bottom-right",
        });
      })
      .catch((e) =>
        toast.error("Server error!", {
          position: "bottom-right",
        })
      );
  };

  useEffect(() => {
    getAllUsers();
  }, [reloadUser]);

  return (
    <UserContext.Provider
      value={{
        setUsers,
        users,
        setReloadUser,
        reloadUser,
        token,
        setToken,
        currentUser,
        setCurrentUser,
        deleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextState;
