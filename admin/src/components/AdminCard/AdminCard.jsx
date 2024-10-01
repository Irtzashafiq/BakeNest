import React from "react";
import "./AdminCard.css";
const AdminCard = ({
  user,
  role,
  location,
  deleteUser,

  tagPost,
}) => {
  return (
    <div
      className={`adminCardMain border-2 relative rounded-lg shadow-lg flex justify-center flex-col items-center ${
        location?.pathname === "/users/unapproved" ||
        location?.pathname === "/organizers/unapproved"
          ? "border-[var(--primary-color1)]"
          : "border-[var(--primary-color2)]"
      } `}
    >
      <div className={`cardTags ${tagPost}`}>{tagPost}</div>
      <div className="avatarAdmin">
        <img src={"http://localhost:3000/" + user.image} alt="" />
      </div>
      <h2 className="nameAdmin">{user.username}</h2>

      <div className={`flex items-center justify-center gap-3 w-full mt-2`}>
        <button
          onClick={() => deleteUser(user?._id)}
          className="tooltip btnMain2"
          data-title="Delete"
        >
          <i className="fa-solid text-[2.5vh] fa-trash"> </i>
        </button>
        <button className="tooltip btnMain" data-title="Approved">
          <i className="fa-solid text-[2.5vh] fa-check"> </i>
        </button>
      </div>
    </div>
  );
};

export default AdminCard;
