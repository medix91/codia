# CODIA - Plateforme Tech
### Projet Planning React + Firebase

## Description

Cette application web permet de gérer des plannings avec des tâches associées.  
Chaque utilisateur peut créer plusieurs plannings, ajouter des tâches, marquer des tâches comme terminées, modifier ou supprimer ses plannings.  

L'interface est responsive et s'adapte aux mobiles comme aux écrans larges.  
Le backend est assuré par Firebase Firestore pour le stockage des données, et Firebase Authentication pour la gestion des utilisateurs.

---

## Fonctionnalités

- Création, modification et suppression de plannings.
- Ajout de tâches à un planning.
- Marquage des tâches comme terminées via un bouton rond.
- Confirmation avant suppression d’un planning.
- Affichage dynamique des plannings en grille responsive.
- Interface moderne avec styles CSS personnalisés.
- Popup modals pour création de planning et ajout de tâche.
- Gestion des utilisateurs avec authentification Firebase (via `useAuth`).

---

## Technologies utilisées

- React (Hooks)
- Firebase Firestore (Base de données temps réel)
- Firebase Authentication
- date-fns (formatage des dates)
- React-icons (icônes pour actions et états)
- CSS custom avec variables CSS et responsive design

---

## Installation

1. Cloner le dépôt : git clone
2. Installer les Dépendances: npm install
3. Lancer le projet en local: npm run dev

### Notes
Le projet utilise des composants fonctionnels React avec Hooks.

La suppression d’un planning nécessite une confirmation via une modal.

La gestion des tâches se fait au sein du planning, avec mise à jour dans Firestore.

Le style utilise des variables CSS pour les couleurs, polices et espacements, avec une grille responsive adaptée mobile et desktop.

## Contributions
Contributions et suggestions sont les bienvenues ! N’hésite pas à ouvrir une issue ou une pull request.

