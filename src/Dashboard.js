import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Supprime les infos de connexion
    navigate("/"); // Redirige vers la connexion
  };

  return (
    <div className="container mt-5">
      <h2>Bienvenue sur le tableau de bord !</h2>
      <button className="btn btn-danger" onClick={handleLogout}>Déconnexion</button>
    </div>
  );
};

export default Dashboard;