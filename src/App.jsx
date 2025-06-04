import React from 'react';
import Layout from './components/Layout/Layout';
import AppRoutes from './routes/AppRoutes'; 

export default function App() {
  return (
    <Layout>
      <AppRoutes /> 
    </Layout>
  );
}
