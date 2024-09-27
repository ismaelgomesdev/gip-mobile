import React, { createContext, useState, useEffect } from 'react';

export const AgentContext = createContext();

export const AgentProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);

  // Load agents from the JSON file when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/agents')
      .then(response => response.json())
      .then(data => setAgents(data.agents))
      .catch(error => console.error('Erro ao carregar os agentes:', error));
  }, []);

  // Function to add a new agent
  const addAgent = (newAgent) => {
    newAgent.id = Date.now().toString();
    const updatedAgents = [...agents, newAgent];
    setAgents(updatedAgents);
    saveAgentsToServer(updatedAgents);
  };

  // Function to update an existing agent
  const updateAgent = (updatedAgent) => {
    const updatedAgents = agents.map(agent =>
      agent.id === updatedAgent.id ? updatedAgent : agent
    );
    setAgents(updatedAgents);
    saveAgentsToServer(updatedAgents);
  };

  // Function to delete an agent
  const deleteAgent = (id) => {
    const updatedAgents = agents.filter(agent => agent.id !== id);
    setAgents(updatedAgents);
    saveAgentsToServer(updatedAgents);
  };

  // Function to save agents to the server (JSON file)
  const saveAgentsToServer = (updatedAgents) => {
    fetch('http://localhost:5000/api/agents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ agents: updatedAgents }),
    })
    .then(response => response.json())
    .then(data => console.log('Agentes salvos com sucesso:', data))
    .catch(error => console.error('Erro ao salvar os agentes:', error));
  };

  return (
    <AgentContext.Provider value={{ agents, addAgent, updateAgent, deleteAgent }}>
      {children}
    </AgentContext.Provider>
  );
};
