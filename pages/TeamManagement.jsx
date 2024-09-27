import React, { useState, useEffect, useContext } from 'react';
import AgentForm from '../components/Team/AgentForm';
import AgentList from '../components/Team/AgentList';
import { AgentContext } from '../src/contexts/AgentContext';
import './team-management.scss';

const TeamManagement = () => {
  const [editingAgent, setEditingAgent] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const { agents, updateAgent, addAgent, deleteAgent } = useContext(AgentContext);

  const handleSave = (agent) => {
    if (agent.id) {
      updateAgent(agent);
    } else {
      addAgent(agent);
    }
    setEditingAgent(null);
  };

  const handleEdit = (agent) => {
    setEditingAgent(agent);
  };

  const handleDelete = (id) => {
    deleteAgent(id);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedAgents = agents.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const pageCount = Math.ceil(agents.length / itemsPerPage);

  return (
    <div className="team-management">
      <h1>Gestão de Equipe</h1>
      <div className="team-management__content">
        <AgentForm onSave={handleSave} agent={editingAgent} />
        <AgentList 
          agents={paginatedAgents} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TeamManagement;
