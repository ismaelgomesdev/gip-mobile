import React, { useState, useEffect, useContext } from 'react';
import MapComponent from '../Map/MapComponent';
import StockSelector from '../Stock/StockSelector';
import { AgentContext } from '../../src/contexts/AgentContext'; // Import AgentContext
import './demand-form.scss';

const DemandForm = ({ onSave, demand, stock }) => {
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [agentId, setAgentId] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const { agents } = useContext(AgentContext); // Get agents from context

  useEffect(() => {
    if (demand) {
      setLocation(demand.location || '');
      setAddress(demand.address || '');
      setDescription(demand.description || '');
      setAgentId(demand.agentId || '');
      setSelectedItems(demand.selectedItems || []);
    }
  }, [demand]);

  const handleLocationSelect = (loc) => {
    setLocation(`${loc.lat}, ${loc.lng}`);
  };

  const handleSelectItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleRemoveItem = (index) => {
    const newSelectedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newSelectedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: demand?.id, location, address, description, agentId, selectedItems });

    // Reset form after saving
    setLocation('');
    setAddress('');
    setDescription('');
    setAgentId('');
    setSelectedItems([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Posicionamento Georreferencial:</label>
        <input 
          type="text" 
          value={location} 
          placeholder="Latitude, Longitude" 
          required 
          readOnly
        />
      </div>
      <MapComponent onLocationSelect={handleLocationSelect} />
      <div>
        <label>Endereço:</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Digite o endereço" 
          required 
        />
      </div>
      <div>
        <label>Descrição da Demanda:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Descreva a demanda" 
          required 
        />
      </div>
      <div>
        <label>Agente Responsável:</label>
        <select value={agentId} onChange={(e) => setAgentId(e.target.value)} required>
          <option value="" disabled>Selecione um agente</option>
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>
      <StockSelector stock={stock} onSelectItem={handleSelectItem} selectedItems={selectedItems} onRemoveItem={handleRemoveItem} />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default DemandForm;
