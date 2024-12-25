import React from 'react';
import LoginForm from '../components/Login/LoginForm';
import InfoCard from '../components/Login/InfoCard';
import Background from '../components/Background/Background';
import styles from './login.module.scss';

const Login = () => (
  <div className={`min-h-screen flex items-center justify-center relative ${styles['content-login']}`}>
    <Background />
    <div className={`flex items-center justify-center absolute inset-0 z-10 ${styles.absolute}`}>
      <div className="flex w-full max-w-4xl relative">
        <div className="flex-1 flex items-center justify-center relative z-10" style={{ marginRight: '-0.25rem' }}>
          <InfoCard />
        </div>
        <div className="flex-1 flex items-center justify-center relative z-20" style={{ marginLeft: '-0.25rem' }}>
          <div className={`login-container p-8 rounded-lg shadow-lg w-full max-w-md my-0 mx-auto ${styles['login-container']}`}>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Login;