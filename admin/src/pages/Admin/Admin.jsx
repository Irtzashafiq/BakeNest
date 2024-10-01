import React, { useContext } from "react";
import "./Admin.css";
import UserContext from "../../context/UserContext/UserContext";
import AdminCard from "../../components/AdminCard/AdminCard";
const Admin = () => {
  const userContxt = useContext(UserContext);
  const { users, setUsers } = userContxt;
  return (
    <div className="grid grid-cols-5 gap-4">
      {users
        .filter((val) => val.role === "admin")
        .map((val) => (
          <AdminCard tagPost="admin" user={val} role={false} location={null} />
        ))}
    </div>
  );
};

export default Admin;
