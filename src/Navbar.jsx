import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">📚 LibraBox</h1>
      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/addbook">Livres</Link></li>
        <li><Link to="/process">process</Link></li>
        <li><Link to="/panier">Panier</Link></li>
        <li><Link to="/profile">Profil</Link></li>
        <li><Link to="/notifications">Notifcations</Link></li>
        <li><Link to="/ProfileStatistics">ProfileStatistics</Link></li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
