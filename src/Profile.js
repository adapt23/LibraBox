// Profile.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    navigate("/"); // Redirect to login page
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container text-center mt-5">
      <h2>Bienvenue, {user?.username}!</h2>
      <p>Email: {user?.email}</p>
      <button className="btn btn-danger" onClick={handleLogout}>
        Se déconnecter
      </button>
    </div>
  );
};

export default Profile;
