import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import DemandSearch from './DemandSearch';
import './demand-list.scss';

const DemandList = ({ demands, onEdit, onDelete, pageCount, onPageChange }) => {
  const [filteredDemands, setFilteredDemands] = useState(demands);

  // Atualizar lista de demandas filtradas ao inicializar o componente ou quando 'demands' mudar
  useEffect(() => {
    setFilteredDemands(demands);
  }, [demands]);

  // Função para filtrar as demandas
  const handleSearch = (term, filterBy) => {
    if (term.trim() === '') {
      setFilteredDemands(demands); // Se o termo estiver vazio, retorna todas as demandas
    } else {
      const filtered = demands.filter((demand) => {
        if (filterBy === 'address') {
          return demand.address.toLowerCase().includes(term.toLowerCase());
        } else if (filterBy === 'description') {
          return demand.description.toLowerCase().includes(term.toLowerCase());
        } else if (filterBy === 'agentName') {
          return demand.agentName.toLowerCase().includes(term.toLowerCase());
        }
        return false;
      });
      setFilteredDemands(filtered);
    }
  };

  return (
    <div className="demand-list-container">
      <DemandSearch onSearch={handleSearch} />
      <table className="demand-table">
        <thead>
          <tr>
            <th>Posicionamento</th>
            <th>Endereço</th>
            <th>Descrição</th>
            <th>Agente Resp.</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredDemands.map(demand => (
            <tr key={demand.id}>
              <td>{demand.location}</td>
              <td>{demand.address}</td>
              <td>{demand.description}</td>
              <td>{demand.agentName}</td>
              <td>
                <button onClick={() => onEdit(demand)} className="edit-button">
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button onClick={() => onDelete(demand.id)} className="delete-button">
                  <i className="fas fa-trash-alt"></i> Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName="pagination-container"
        pageClassName="pagination-item"
        pageLinkClassName="pagination-link"
        activeClassName="pagination-active"
        activeLinkClassName="pagination-active-link"
        previousClassName="pagination-prev"
        nextClassName="pagination-next"
      />
    </div>
  );
};

export default DemandList;
