import React from "react";
import { useAuth } from "../../firebase/useAuth.jsx";
import { FaUserEdit } from "react-icons/fa";
import "./Profile.css"
export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="profile-container">
        <p>Utilisateur non connecté.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-photo">
          {user.photoURL ? (
            <img src={user.photoURL} alt={`${user.displayName} profil`} />
          ) : (
            <div className="default-photo">
              <FaUserEdit size={60} />
            </div>
          )}
        </div>
        <h2 className="profile-name">
          {user.displayName || "Prénom Nom"}
        </h2>
        <p className="profile-email">{user.email}</p>

        <button className="edit-btn">
          <FaUserEdit style={{ marginRight: "0.5rem" }} />
          Modifier le profil
        </button>
      </div>
    </div>
  );
}
