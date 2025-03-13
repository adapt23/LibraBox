import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return <h2>Bienvenue sur le tableau de bord, {user?.username} !</h2>;
};

export default Dashboard;
git 