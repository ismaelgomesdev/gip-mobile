import React, { useState } from 'react';
import styles from './demand-search.module.scss';

const DemandSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('address');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, filterBy);
  };

  return (
    <div className={styles.demandSearchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <label htmlFor="search-select" className={styles.searchLabel}>Pesquisar por:</label>
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className={styles.searchSelect}
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
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Buscar
        </button>
      </form>
    </div>
  );
};

export default DemandSearch;
