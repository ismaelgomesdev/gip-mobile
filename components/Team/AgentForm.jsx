import React, { useState, useEffect } from 'react';
import './agent-form.scss';

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

    // Resetando o formulário após o salvamento
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome do Agente:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nome do agente" 
          required 
        />
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email do agente" 
          required 
        />
      </div>
      <div>
        <label>Senha:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Senha" 
          required 
        />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default AgentForm;
