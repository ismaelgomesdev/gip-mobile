import React from 'react';
import LoginForm from '../components/Login/LoginForm';
import Background from '../components/Background/Background';

const Login = () => (
  <div className="min-h-screen flex items-center justify-center relative">
    <Background />
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 z-10">
      <h2 className="text-2xl font-bold mb-6 text-center">1001</h2>
      <LoginForm />
    </div>
  </div>
);

export default Login;