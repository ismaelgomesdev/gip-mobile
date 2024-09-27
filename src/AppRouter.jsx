import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from '../components/Navbar/Sidebar';
import Home from '../pages/Home';
import DemandManagement from '../pages/DemandManagement';
import Login from '../pages/Login';

const AppRouter = () => {
  const isAuthenticated = !!localStorage.getItem('userToken');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="*" 
          element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gestao-demandas" element={<DemandManagement />} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </div>
    </div>
  );
};

export default AppRouter;
