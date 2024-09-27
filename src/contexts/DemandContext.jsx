import React, { createContext, useState, useEffect } from 'react';

export const DemandContext = createContext();

export const DemandProvider = ({ children }) => {
  const [demands, setDemands] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/demands')
      .then(response => response.json())
      .then(data => setDemands(data.demands))
      .catch(error => console.error('Erro ao carregar as demandas:', error));
  }, []);

  const persistDemands = (updatedDemands) => {
    fetch('http://localhost:5000/api/demands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ demands: updatedDemands }),
    }).catch(error => console.error('Erro ao persistir as demandas:', error));
  };

  const saveDemand = (newDemand) => {
    let updatedDemands;
    if (newDemand.id) {
      updatedDemands = demands.map(demand =>
        demand.id === newDemand.id ? newDemand : demand
      );
    } else {
      newDemand.id = Date.now().toString();
      updatedDemands = [...demands, newDemand];
    }
    setDemands(updatedDemands);
    persistDemands(updatedDemands);
  };

  const deleteDemand = (id) => {
    const updatedDemands = demands.filter(demand => demand.id !== id);
    setDemands(updatedDemands);
    persistDemands(updatedDemands);
  };

  return (
    <DemandContext.Provider value={{ demands, saveDemand, deleteDemand }}>
      {children}
    </DemandContext.Provider>
  );
};
