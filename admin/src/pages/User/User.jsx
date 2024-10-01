import React, { useContext, useEffect } from "react";
import "./User.css";
import UserContext from "../../context/UserContext/UserContext";
import AdminCard from "../../components/AdminCard/AdminCard";
import { useLocation } from "react-router-dom";

const User = () => {
  const userContxt = useContext(UserContext);
  const location = useLocation();
  const { users, deleteUser, approveUser } = userContxt;

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="">
      <div className="grid sm:grid-cols-3 md:grid-cols-5  grid-cols-2 py-2 gap-4">
        {users
          .filter((val) => val.role !== "admin")
          .map((val) => (
            <AdminCard
              key={`${val.id}-${val.username}`}
              user={val}
              role={false}
              location={location}
              deleteUser={deleteUser}
              approveUser={approveUser}
              tagPost="user"
            />
          ))}
      </div>
    </div>
  );
};

export default User;
