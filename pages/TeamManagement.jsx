import React, { useState, useEffect, useContext } from 'react';
import AgentForm from '../components/Team/AgentForm';
import AgentList from '../components/Team/AgentList';
import { AgentContext } from '../src/contexts/AgentContext';
import styles from './team-management.module.scss';

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
    <div className="p-5 flex flex-col items-center w-full min-w-[73.5vw]">
      <h1 className="text-2xl font-bold mb-6">Gestão de Equipe</h1>
      <div className="flex flex-row justify-between items-start w-full p-5">
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
