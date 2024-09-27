import React from 'react';
import LoginForm from '../components/Login/LoginForm';

const Login = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <LoginForm />
    </div>
  </div>
);

export default Login;
