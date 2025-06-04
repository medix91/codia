// src/pages/register/Register.jsx
import React, { useState } from 'react';
import { FaGoogle, FaApple, FaGithub, FaReact } from 'react-icons/fa';
import { SiPlanetscale } from "react-icons/si";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../../../firebase/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <SiPlanetscale className="auth-logo" />
        <h2>Créer un compte</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="checkbox-container">
            <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                 required
            />
         <label htmlFor="terms">J'accepte les <a href="/conditions" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
        </div>

          <button type="submit" className="btn-submit">S'inscrire</button>
        </form>

        <div className="social-buttons">
          <button onClick={handleGoogleRegister} aria-label="S'inscrire avec Google" className="social-btn google">
            <FaGoogle />
            
          </button>
          <button  aria-label="S'inscrire avec Apple" className="social-btn apple">
            <FaApple />
           
          </button>
          <button  aria-label="S'inscrire avec GitHub" className="social-btn github">
            <FaGithub />
            
          </button>
        </div>
        <div className="auth-footer">
         Déjà membre ?   <Link to="/login">Se Connecter</Link>
        </div>

      </div>
    </div>
  );
};

export default Register;