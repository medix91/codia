import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Welcome from '../pages/Welcome/Welcome';
import Login from '../components/Auth/Login/Login';
import Register from '../components/Auth/Register/Register';
import ForgotPassword from '../components/Auth/ForgotPassword/ForgotPassword';
import Dashboard from '../pages/Dashboard/Dashboard';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Profile from '../pages/Profile/Profile';

// Plus tard : import ProtectedRoute, Dashboard, etc.

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Exemple futur pour route protégée */}
      {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
