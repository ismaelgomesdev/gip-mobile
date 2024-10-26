import React, { useState, useEffect } from 'react';

const AgentForm = ({ onSave, agent }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (agent) {
      setName(agent.name || '');
      setEmail(agent.email || '');
      setPassword(agent.password || '');
    }
  }, [agent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: agent?.id, name, email, password });

    // Reset form after saving
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100    p-4 rounded-md max-w-lg mb-5">
      <div className="mb-4">
        <label className="block font-bold mb-2 text-gray-800">Nome do Agente:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nome do agente" 
          required 
          className="w-full p-3    rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2 text-gray-800">Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email do agente" 
          required 
          className="w-full p-3    rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2 text-gray-800">Senha:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Senha" 
          required 
          className="w-full p-3    rounded-md"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600">Salvar</button>
    </form>
  );
};

export default AgentForm;