import React, { useState, useEffect, useContext } from 'react';
import MapComponent from '../Map/MapComponent';
import StockSelector from '../Stock/StockSelector';
import { AgentContext } from '../../src/contexts/AgentContext';

const DemandForm = ({ onSave, demand, stock }) => {
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [agentId, setAgentId] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const { agents } = useContext(AgentContext);

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

    setLocation('');
    setAddress('');
    setDescription('');
    setAgentId('');
    setSelectedItems([]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 border border-gray-700 p-4 rounded-md max-w-lg mb-5">
      <div className="mb-4">
        <label className="block font-bold mb-2 text-gray-800">Posicionamento Georreferencial:</label>
        <input 
          type="text" 
          value={location} 
          placeholder="Latitude, Longitude" 
          required 
          readOnly
          className="w-full p-3 border border-gray-600 rounded-md"
        />
      </div>
      <MapComponent onLocationSelect={handleLocationSelect} />
      <div className="mb-4">
        <label className="block font-bold mb-2 text-gray-800">Endereço:</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Digite o endereço" 
          required 
          className="w-full p-3 border border-gray-600 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2 text-gray-800">Descrição da Demanda:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Descreva a demanda" 
          required 
          className="w-full p-3 border border-gray-600 rounded-md resize-y"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2 text-gray-800">Agente Responsável:</label>
        <select 
          value={agentId} 
          onChange={(e) => setAgentId(e.target.value)} 
          required
          className="w-full p-3 border border-gray-600 rounded-md"
        >
          <option value="" disabled>Selecione um agente</option>
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>
      <StockSelector stock={stock} onSelectItem={handleSelectItem} selectedItems={selectedItems} onRemoveItem={handleRemoveItem} />
      <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600">Salvar</button>
    </form>
  );
};

export default DemandForm;
