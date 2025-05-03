import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/auth.css"; 
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup.string().required("Nom d'utilisateur requis"),
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup.string().min(6, "Mot de passe trop court").required("Mot de passe requis"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Les mots de passe doivent correspondre")
    .required("Confirmation du mot de passe requise"),
});

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/confirmation");
  };

  return (
    <div
      className="100vh"
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

      <div className="auth-container">
        <div className="auth-card">
          <h2 className="text-center mb-4">Inscription</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Nom d'utilisateur</label>
              <input {...register("username")} className="form-control" type="text" />
              <div className="text-danger">{errors.username?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input {...register("email")} className="form-control" type="email" />
              <div className="text-danger">{errors.email?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Mot de passe</label>
              <input {...register("password")} className="form-control" type="password" />
              <div className="text-danger">{errors.password?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Confirmer le mot de passe</label>
              <input {...register("confirmPassword")} className="form-control" type="password" />
              <div className="text-danger">{errors.confirmPassword?.message}</div>
            </div>
            <button type="submit" className="btn-primary w-100">S'inscrire</button>
          </form>
          <p className="text-center mt-3">
            Déjà un compte ? <a href="/LoginForm" className="auth-link">Connectez-vous</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
