// src/components/WelcomeCard/WelcomeCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeCard.css';
import welcomeImage from '../../assets/images/welcome.jpg';

const WelcomeCard = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/register');
  };

  return (
    <div className="welcome-card">
      <div className="welcome-card-content">
        <h1>Bienvenue sur Codia</h1>
        <p>Codez, Gérez vos tâches facilement et restez organisé au quotidien.</p>
        <button className="cta-button" onClick={handleStartClick}>
          Commencer
        </button>
      </div>
      <div className="welcome-card-image">
        <img src={welcomeImage} alt="Bienvenue" />
      </div>
    </div>
  );
};

export default WelcomeCard;