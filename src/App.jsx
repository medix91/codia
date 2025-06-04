import React from 'react'
import Welcome from './pages/Welcome/Welcome';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from './components/Layout/Layout';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';

export default function App() {
  return (
    <Layout>
    <Router>
      <Routes>
            <Route 
      path="/" 
      element={
    
          <Welcome />
    
  } 
/>
        <Route 
          path="/login" 
          element={
         
              <Login />
        
          } 
        />
        <Route 
          path="/register" 
          element={
         
              <Register />
     
          } 
        />
         <Route 
          path="/forgot-password" 
          element={
         
              <ForgotPassword />
     
          } 
        />
       
     

        {/* Redirection par défaut vers /login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    </Layout>
  );
}