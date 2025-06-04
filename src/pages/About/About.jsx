import React from 'react';
import './About.css';
import { FaBullseye, FaEye, FaUsers, FaLightbulb, FaTools } from 'react-icons/fa';

export default function About() {
  return (
    <div className="about-container">
  <h1>À propos de CODIA</h1>
  <p className="intro">
    Notre mission est de simplifier la gestion des tâches et projets pour tous.
  </p>

  <div className="about-sections">
    <div className="about-section">
      <FaLightbulb className="about-icon" />
      <h2>Vision</h2>
      <p>Offrir une plateforme claire et intuitive pour tous vos projets.</p>
    </div>
    <div className="about-section">
      <FaUsers className="about-icon" />
      <h2>Communauté</h2>
      <p>Construite avec les retours d'une communauté engagée.</p>
    </div>
    <div className="about-section">
      <FaTools className="about-icon" />
      <h2>Technologie</h2>
      <p>Propulsée par React, Firebase et une architecture moderne.</p>
    </div>
  </div>
</div>

  );
}
