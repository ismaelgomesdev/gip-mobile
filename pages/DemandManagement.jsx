import React, { useState, useEffect, useContext } from 'react';
import DemandForm from '../components/DemandManagement/DemandForm';
import DemandList from '../components/DemandManagement/DemandList';
import { StockContext } from '../src/contexts/StockContext';
import { AgentContext } from '../src/contexts/AgentContext'; // Import the AgentContext
import './demand-management.scss';

const DemandManagement = () => {
  const [demands, setDemands] = useState([]);
  const [editingDemand, setEditingDemand] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const { stock } = useContext(StockContext);
  const { agents } = useContext(AgentContext); // Get agents from AgentContext

  // Load demands from the server
  useEffect(() => {
    fetch('http://localhost:5000/api/demands')
      .then(response => response.json())
      .then(data => setDemands(data.demands))
      .catch(error => console.error('Error loading demands:', error));
  }, []);

  const saveDemand = (demand) => {
    let updatedDemands;
    if (demand.id) {
      updatedDemands = demands.map(d => (d.id === demand.id ? { ...demand, agentName: agents.find(a => a.id === demand.agentId)?.name } : d));
    } else {
      demand.id = Date.now().toString();
      demand.agentName = agents.find(a => a.id === demand.agentId)?.name;
      updatedDemands = [...demands, demand];
    }

    // Update the server
    fetch('http://localhost:5000/api/demands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ demands: updatedDemands }),
    })
    .then(response => response.json())
    .then(() => {
      setDemands(updatedDemands);
      setEditingDemand(null);
    })
    .catch(error => console.error('Error saving demand:', error));
  };

  const deleteDemand = (id) => {
    const updatedDemands = demands.filter(d => d.id !== id);
    fetch('http://localhost:5000/api/demands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ demands: updatedDemands }),
    })
    .then(response => response.json())
    .then(() => {
      setDemands(updatedDemands);
    })
    .catch(error => console.error('Error deleting demand:', error));
  };

  const editDemand = (demand) => {
    setEditingDemand(demand);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedDemands = demands.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const pageCount = Math.ceil(demands.length / itemsPerPage);

  return (
    <div className="demand-management">
      <h1>Gestão de Demandas</h1>
      <div className="demand-management__content">
        <DemandForm 
          onSave={saveDemand} 
          demand={editingDemand} 
          agents={agents} 
          stock={stock} 
        />
        <DemandList 
          demands={paginatedDemands} 
          onEdit={editDemand} 
          onDelete={deleteDemand} 
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DemandManagement;
