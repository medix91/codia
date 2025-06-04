import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { SiPlanetscale } from "react-icons/si";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("📧 Un lien de réinitialisation a été envoyé à votre email.");
    } catch (err) {
      setError("❌ Une erreur est survenue. Vérifiez l’email et réessayez.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <SiPlanetscale />
        </div>
        <h2>Réinitialiser le mot de passe ?</h2>

        <form className="auth-form" onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="btn-submit">
            Envoyer un lien de réinitialisation
          </button>
        </form>

        {message && <p className="reset-message success">{message}</p>}
        {error && <p className="reset-message error">{error}</p>}

        <div className="auth-footer">
          <span>Retour</span>
          <Link to="/login">à la connexion</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;