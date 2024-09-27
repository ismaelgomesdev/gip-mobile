import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from '../components/Navbar/Sidebar';
import Home from '../pages/Home';
import DemandManagement from '../pages/DemandManagement';
import StockManagement from '../pages/StockManagement';
import TeamManagement from '../pages/TeamManagement';
import RequestManagement from '../pages/RequestManagement'; // Import the new Request Management page
import Login from '../pages/Login';

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userToken'));

  useEffect(() => {
    // Add an event listener for localStorage changes
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('userToken'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
          <Route path="/gestao-estoque" element={<StockManagement />} />
          <Route path="/gestao-equipe" element={<TeamManagement />} />
          <Route path="/solicitacoes" element={<RequestManagement />} /> {/* Add the new route */}
        </Routes>
      </div>
    </div>
  );
};

export default AppRouter;
