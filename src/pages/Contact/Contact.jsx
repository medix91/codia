import React, { useState } from "react";
import "./Contact.css"
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Ici tu peux gérer l'envoi (ex: API, Firebase, etc)
    setStatus("Message envoyé avec succès !");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1>Contactez-nous</h1>
      <p className="intro">Une question ? Une suggestion ? Envoyez-nous un message !</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nom complet</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Votre nom"
        />

        <label htmlFor="email">Adresse email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="exemple@domaine.com"
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Votre message ici..."
        ></textarea>

        <button type="submit">Envoyer</button>

        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
}
