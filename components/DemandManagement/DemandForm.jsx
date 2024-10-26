import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import MapComponent from '../Map/MapComponent'; // Importando o componente de mapa
import StockSelector from '../Stock/StockSelector';
import './demand-form.scss';

Modal.setAppElement('#root'); // Isso é necessário para acessibilidade

const DemandForm = ({ isOpen, onRequestClose, onSave, demand, agents, stock }) => {
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [agentId, setAgentId] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

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
    onRequestClose(); // Fecha o modal após salvar
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Demand Form"
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Detalhes da Demanda</h2>

        <div className="w-full flex flex-row gap-4">
          <div className="w-full">
            <div className="mb-4">
              <label className="block font-bold mb-2">Posicionamento Georreferencial:</label>
              <input
                type="text"
                value={location}
                placeholder="Latitude, Longitude"
                required
                readOnly
                className="w-full p-2  rounded"
              />
            </div>
            <div className="mb-4">
              <MapComponent onLocationSelect={handleLocationSelect} />
            </div>
          </div>
          <div className="w-full max-h-[70vh]">
            <div className="mb-4">
              <label className="block font-bold mb-2">Endereço:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Digite o endereço"
                required
                className="w-full p-2  rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2">Descrição da Demanda:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva a demanda"
                required
                className="w-full p-2  rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2">Agente Responsável:</label>
              <select value={agentId} onChange={(e) => setAgentId(e.target.value)} required className="w-full p-2  rounded">
                <option value="" disabled>Selecione um agente</option>
                {agents.map(agent => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>
            <StockSelector
              stock={stock}
              onSelectItem={handleSelectItem}
              selectedItems={selectedItems}
              onRemoveItem={handleRemoveItem}
            />
          </div>

        </div>
        <hr className="my-4" />
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Salvar</button>
          <button type="button" onClick={onRequestClose} className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">Cancelar</button>
        </div>
      </form>
    </Modal>
  );
};

export default DemandForm;