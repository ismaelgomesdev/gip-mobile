import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../Logout/LogoutButton';
import './sidebar.scss';

const Sidebar = () => {
  const userName = localStorage.getItem('userName') || 'Usuário';
  const userRole = localStorage.getItem('userRole') || 'Cargo';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="sidebar w-64 h-screen bg-gray-200 p-5 shadow-md flex flex-col overflow-y-auto">
      <div className="user-info flex items-center mb-5">
        <div className="user-icon w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full text-lg font-bold mr-3">
          {userInitial}
        </div>
        <div className="user-details">
          <div className="user-name font-bold text-lg text-gray-800">{userName}</div>
          <div className="user-role text-sm text-gray-600">{userRole}</div>
        </div>
      </div>
      <ul className="flex flex-col space-y-3 mb-5">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => `text-lg ${isActive ? 'font-bold text-blue-600' : 'text-gray-800'}`}
          >
            Área Inicial
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/gestao-demandas" 
            className={({ isActive }) => `text-lg ${isActive ? 'font-bold text-blue-600' : 'text-gray-800'}`}
          >
            Gestão de Demandas
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/gestao-estoque" 
            className={({ isActive }) => `text-lg ${isActive ? 'font-bold text-blue-600' : 'text-gray-800'}`}
          >
            Gestão de Estoque
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/gestao-equipe" 
            className={({ isActive }) => `text-lg ${isActive ? 'font-bold text-blue-600' : 'text-gray-800'}`}
          >
            Gestão de Equipe
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/solicitacoes" 
            className={({ isActive }) => `text-lg ${isActive ? 'font-bold text-blue-600' : 'text-gray-800'}`}
          >
            Solicitações dos Cidadãos
          </NavLink>
        </li>
      </ul>
      <div className="logout-section mt-auto border-t border-gray-300 pt-5 flex justify-center">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;