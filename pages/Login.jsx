import React from 'react';
import LoginForm from '../components/Login/LoginForm';
import Background from '../components/Background/Background';

const Login = () => (
  <div className="min-h-screen flex items-center justify-center relative content-login">
    <Background />
    <div className="flex items-center justify-center absolute inset-0 z-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  </div>
);

export default Login;
