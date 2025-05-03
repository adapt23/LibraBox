import React from 'react';
import "./styles/logo.css";
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
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
      <div className="container py-5 bg-white rounded shadow" style={{ maxWidth: '800px' }}>
        <h2 className="text-center mb-4">À propos de LibraBox</h2>
        <p className="lead text-center">
          Bienvenue sur <strong>LibraBox</strong>, votre destination en ligne pour l'achat de livres de qualité à des prix abordables.
        </p>

        <div className="mt-4">
          <p>
            Notre mission est de rendre la lecture accessible à tous. Que vous soyez passionné de romans, d’essais, de livres scientifiques ou de mangas, vous trouverez votre bonheur chez nous.
          </p>
          <p>
            LibraBox a été créé par une équipe de passionnés de littérature qui croient que chaque livre peut changer une vie. 
            Nous sélectionnons nos titres avec soin et nous assurons que chaque commande arrive chez vous rapidement et en parfait état.
          </p>
          <p>
            Merci de faire partie de notre aventure. 📚
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
