import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../Logout/LogoutButton'; 
import './sidebar.scss'; 

const Sidebar = () => {
  const userName = localStorage.getItem('userName') || 'Usuário';
  const userRole = localStorage.getItem('userRole') || 'Cargo';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="sidebar">
      <div className="user-info">
        <div className="user-icon">
          {userInitial}
        </div>
        <div className="user-details">
          <span className="user-name">{userName}</span>
          <span className="user-role">{userRole}</span>
        </div>
      </div>
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "active" : undefined}
          >
            Área Inicial
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/gestao-demandas" 
            className={({ isActive }) => isActive ? "active" : undefined}
          >
            Gestão de Demandas
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/gestao-estoque" 
            className={({ isActive }) => isActive ? "active" : undefined}
          >
            Gestão de Estoque
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/gestao-equipe" 
            className={({ isActive }) => isActive ? "active" : undefined}
          >
            Gestao de Equipe
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/solicitacoes" 
            className={({ isActive }) => isActive ? "active" : undefined}
          >
            Solicitações dos Cidadãos
          </NavLink>
        </li>
      </ul>
      <div className="logout-section">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
