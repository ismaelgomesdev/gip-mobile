import React, { useState, useEffect, useContext } from 'react';
import StockForm from '../components/Stock/StockForm';
import StockList from '../components/Stock/StockList';
import { StockContext } from '../src/contexts/StockContext';

const StockManagement = () => {
  const [editingStockItem, setEditingStockItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const { stock, updateStock, addStockItem, deleteStockItem } = useContext(StockContext);

  const handleSave = (stockItem) => {
    if (stockItem.id) {
      updateStock(stockItem);
    } else {
      addStockItem(stockItem);
    }
    setEditingStockItem(null);
  };

  const handleEdit = (stockItem) => {
    setEditingStockItem(stockItem);
  };

  const handleDelete = (id) => {
    deleteStockItem(id);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedStock = stock.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const pageCount = Math.ceil(stock.length / itemsPerPage);

  return (
    <div className="p-5 flex flex-col items-center w-full min-w-[73.5vw]">
      <h1 className="text-2xl font-bold mb-6">Gestão de Estoque</h1>
      <div className="flex flex-row justify-between items-start w-full p-5">
        <StockForm onSave={handleSave} stockItem={editingStockItem} />
        <StockList 
          stock={paginatedStock} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default StockManagement;