// LoginForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/logo.css";
import users from "./users.json"; // ✅ Import fake user database
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // ✅ Handle form submission
  const onSubmit = (data) => {
    console.log("Login Data:", data);

    // ✅ Check against fake users
    const user = users.find(
      (u) => u.email === data.email && u.mdp === data.password
    );

    if (user) {
      // ✅ Store user in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Navigate to home with success message
      navigate("/", { state: { message: "Identifiants corrects !" } });
    } else {
      alert("Identifiants incorrects !");
    }
  };

  return (
    <div
      className="vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: "url('/background libra box.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Link to="/">
        <img
          src="/logo librabox.png"
          alt="Logo"
          className="left-logo"
        />
      </Link>

      <div className="d-flex justify-content-center align-items-center mt-4">
        <div className="card shadow-lg p-4" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">Connexion</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email requis" })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Mot de passe requis" })}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Se connecter</button>
          </form>
          <p className="text-center mt-3">
            Pas encore de compte ? <a href="/signup">Inscrivez-vous</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
