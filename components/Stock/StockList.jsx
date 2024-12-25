import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './stock-list.module.scss';

const StockList = ({ stock, onEdit, onDelete, pageCount, onPageChange }) => {
  return (
    <div className={styles.container}>
      <table className={`${styles.table} w-full border-collapse bg-gray-100 rounded-md`}>
        <thead className="text-white">
          <tr>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Quantidade</th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(item => (
            <tr key={item.id} className="hover:bg-gray-200">
              <td className="p-3 border-b text-gray-800">{item.name}</td>
              <td className="p-3 border-b text-gray-800">{item.quantity}</td>
              <td className="p-3 border-b text-gray-800">
                <button onClick={() => onEdit(item)} className="bg-green-500 text-white py-1 px-3 rounded-md mr-2 hover:bg-green-600">Editar</button>
                <button onClick={() => onDelete(item.id)} className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600">Deletar</button>
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
        pageLinkClassName="px-3 py-1 rounded-md cursor-pointer text-gray-800 hover:bg-gray-300"
        activeClassName="text-white"
        activeLinkClassName="px-3 py-1"
      />
    </div>
  );
};

export default StockList;