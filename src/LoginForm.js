// LoginForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/auth.css"; 

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Login Data:", data);

    // Simulate successful login with hardcoded credentials
    if (data.email === "test@example.com" && data.password === "password") {
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      // Redirect to the profile page after successful login
      navigate("/profile");
    } else {
      alert("Identifiants incorrects !");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
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
  );
};

export default LoginForm;
