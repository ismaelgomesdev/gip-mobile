import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../Logout/LogoutButton';
import Logo from '../Logo/Logo';
import styles from './sidebar.module.scss';

const Sidebar = () => {
  const userName = localStorage.getItem('userName') || 'Usuário';
  const userRole = localStorage.getItem('userRole') || 'Cargo';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className={`${styles.sidebar} w-64 h-auto rounded-lg m-4 p-5 shadow-md flex flex-col overflow-y-auto`}>
      <Logo />
      {/* <div className={`${styles.userInfo} flex items-center mb-5`}>
        <div className={`${styles.userIcon} w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full text-lg font-bold mr-3`}>
          {userInitial}
        </div>
        <div className={styles.userDetails}>
          <div className={`${styles.userName} font-bold text-lg text-gray-800`}>{userName}</div>
          <div className={`${styles.userRole} text-sm text-gray-600`}>{userRole}</div>
        </div>
      </div> */}
      <ul className="flex flex-col space-y-3 mb-5">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}
    >
            <i className="fas fa-home"></i>Área Inicial
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/gestao-demandas" 
            className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}
    >
            Gestão de Demandas
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/gestao-estoque" 
            className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}
    >
            Gestão de Estoque
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/gestao-equipe" 
            className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}
    >
            Gestão de Equipe
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/solicitacoes" 
            className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}
    >
            Solicitações dos Cidadãos
          </NavLink>
        </li>
      </ul>
      <div className={`${styles.logoutSection} w-max mt-auto border-t border-gray-300 pt-5 flex justify-center`}>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;