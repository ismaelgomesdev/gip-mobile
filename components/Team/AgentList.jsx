
import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './agent-list.module.scss';

const AgentList = ({ agents, onEdit, onDelete, pageCount, onPageChange }) => {
  return (
    <div className="w-full">
      <table className="w-full border-collapse bg-gray-100    rounded-md">
        <thead className="  text-white">
          <tr>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {agents.map(agent => (
            <tr key={agent.id} className="hover:bg-gray-200">
              <td className="p-3 border-b   text-gray-800">{agent.name}</td>
              <td className="p-3 border-b   text-gray-800">{agent.email}</td>
              <td className="p-3 border-b   text-gray-800">
                <button onClick={() => onEdit(agent)} className="bg-green-500 text-white py-1 px-3 rounded-md mr-2 hover:bg-green-600">Editar</button>
                <button onClick={() => onDelete(agent.id)} className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600">Deletar</button>
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
        containerClassName="flex justify-center mt-5"
        pageClassName="list-none mx-1"
        pageLinkClassName="px-3 py-1    rounded-md cursor-pointer text-gray-800 hover:bg-gray-300"
        activeClassName="  text-white"
        activeLinkClassName="px-3 py-1"
      />
    </div>
  );
};

export default AgentList;
