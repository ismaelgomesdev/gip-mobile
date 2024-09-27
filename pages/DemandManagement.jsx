import React, { useContext, useState } from 'react';
import DemandForm from '../components/DemandManagement/DemandForm';
import DemandList from '../components/DemandManagement/DemandList';
import { StockContext } from '../src/contexts/StockContext';
import './demand-management.scss';

const DemandManagement = () => {
  const [demands, setDemands] = useState([]);
  const [editingDemand, setEditingDemand] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const agents = [
    { id: '1', name: 'Agente 1' },
    { id: '2', name: 'Agente 2' },
    { id: '3', name: 'Agente 3' },
  ];

  const { stock, updateStock } = useContext(StockContext);

  const saveDemand = (demand) => {
    if (demand.id) {
      setDemands(demands.map(d => (d.id === demand.id ? { ...demand, agentName: agents.find(a => a.id === demand.agentId).name } : d)));
    } else {
      demand.id = Date.now().toString();
      demand.agentName = agents.find(a => a.id === demand.agentId).name;
      setDemands([...demands, demand]);
    }
    setEditingDemand(null);
  };

  const deleteDemand = (id) => {
    setDemands(demands.filter(d => d.id !== id));
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
