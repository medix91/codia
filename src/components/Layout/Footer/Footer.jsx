import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Codia by MSZ. Tous droits réservés.</p>
        <div className="footer-links">
          <a href="/">Acceuil</a>
          <a href="#">À propos</a>
          <a href="#">Contact</a>
          
        </div>
      </div>
    </footer>
  );
}