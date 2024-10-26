import React, { useState } from 'react';
import './demand-search.scss';

const DemandSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('address');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, filterBy);
  };

  return (
    <div className="demand-search-container">
      <form onSubmit={handleSearch} className="search-form">
        <label htmlFor="search-select" className="search-label">Pesquisar por:</label>
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="search-select"
        >
          <option value="address">Endereço</option>
          <option value="description">Descrição</option>
          <option value="agentName">Agente Responsável</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o termo de busca..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default DemandSearch;
