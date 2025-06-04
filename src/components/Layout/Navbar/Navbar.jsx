import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../firebase/useAuth.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa"; // Icône avatar générique

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleRedirectLogin = () => {
    navigate("/login");
  };

  // Fermer le menu si on clique dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">CODIA</Link>
        </div>

        {/* Overlay pour fond sombre */}
        {isOpen && <div className="overlay"></div>}

        <div ref={menuRef} className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/taches" onClick={() => setIsOpen(false)}>Tâches</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>À propos</Link>

          <div className="mobile-user">
            {user ? (
              <>
                {user.photoURL && (
                  <img src={user.photoURL} alt="Profil" className="mobile-profile-pic" />
                )}
                <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
              </>
            ) : (
              <FaUserCircle className="guest-icon" onClick={handleRedirectLogin} />
            )}
          </div>
        </div>

        <div className="burger" onClick={() => setIsOpen(!isOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="desktop-actions">
          {user ? (
            <>
              {user.photoURL && (
                <img src={user.photoURL} alt="Profil" className="profile-pic" />
              )}
              <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
            </>
          ) : (
            <FaUserCircle className="guest-icon" onClick={handleRedirectLogin} />
          )}
        </div>
      </div>
    </nav>
  );
}
