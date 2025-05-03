import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/logo.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';


const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div
      className="vh-100"
      style={{
        backgroundImage: "url('/background libra box.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <>
        <nav className="navbar navbar-expand-lg glass-navbar fixed-top shadow-sm">
          <div className="container">
            <Link className="navbar-brand fw-bold fs-4 text-white" to="/">
              📚 LIBRABOX
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-center gap-3">
                {!isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/LoginForm">🔑 Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/signup">📝 Signup</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item dropdown">
                      <button
                        className="btn btn-outline-light dropdown-toggle"
                        id="navbarDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Menu
                      </button>
                      <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li>
                          <Link className="dropdown-item" to="/ProfileStatistics">👤 Profile</Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/contact">📞 Contact</Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/about">ℹ️ À Propos</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                        Se déconnecter
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div className="center-content">
  <h1 className="main-heading">Online LIBRARY</h1>

  <Link to="/sellbook">
    <button className="order-btn">Order Now</button>
  </Link>
</div>

      </>
    </div>
  );
};

export default Home;
