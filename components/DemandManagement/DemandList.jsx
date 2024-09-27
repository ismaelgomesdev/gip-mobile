import React from 'react';
import ReactPaginate from 'react-paginate';
import './demand-list.scss';

const DemandList = ({ demands, onEdit, onDelete, pageCount, onPageChange }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Posicionamento</th>
            <th>Endereço</th>
            <th>Descrição</th>
            <th>Agente</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {demands.map(demand => (
            <tr key={demand.id}>
              <td>{demand.location}</td>
              <td>{demand.address}</td>
              <td>{demand.description}</td>
              <td>{demand.agentName}</td>
              <td>
                <button onClick={() => onEdit(demand)}>Editar</button>
                <button onClick={() => onDelete(demand.id)}>Deletar</button>
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
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default DemandList;
