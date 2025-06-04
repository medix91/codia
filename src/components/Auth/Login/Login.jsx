import React, { useState } from "react";
import { FaGoogle, FaApple, FaGithub, FaReact } from "react-icons/fa";
import { SiPlanetscale } from "react-icons/si";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "../../../firebase/firebaseConfig"; 
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirige vers ta page d'accueil après connexion
    } catch (err) {
      setError("❌ Identifiants incorrects. Veuillez réessayer.");
      console.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError("❌ Erreur lors de la connexion Google.");
      console.error(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <SiPlanetscale className="auth-logo" />
        <h2>Connexion</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <button type="submit" className="btn-submit">
            Se connecter
          </button>
        </form>

        <div className="forgot-password">
          <Link to="/forgot-password">Mot de passe oublié ?</Link>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <div className="social-buttons">
          <button className="social-btn" onClick={handleGoogleLogin} aria-label="Google login">
            <FaGoogle />
          </button>
          <button className="social-btn" aria-label="Apple login">
            <FaApple />
          </button>
          <button className="social-btn" aria-label="GitHub login">
            <FaGithub />
          </button>
        </div>

        <div className="auth-footer">
          <span>Pas encore de compte ?</span>
          <Link to="/register">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
}