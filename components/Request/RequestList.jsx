import React from 'react';
import ReactPaginate from 'react-paginate';
import './request-list.scss';

const RequestList = ({ requests, onEdit, onDelete, pageCount, onPageChange }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome Completo</th>
            <th>CPF</th>
            <th>Endereço</th>
            <th>Descrição da Solicitação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.fullName}</td>
              <td>{request.cpf}</td>
              <td>{request.address}</td>
              <td>{request.description}</td>
              <td>
                <button onClick={() => onEdit(request)}>Editar</button>
                <button onClick={() => onDelete(request.id)}>Deletar</button>
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

export default RequestList;
