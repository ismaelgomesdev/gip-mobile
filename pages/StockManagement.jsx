import React, { useState, useEffect, useContext } from 'react';
import StockForm from '../components/Stock/StockForm';
import StockList from '../components/Stock/StockList';
import { StockContext } from '../src/contexts/StockContext';
import './stock-management.scss';

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
    <div className="stock-management">
      <h1>Gestão de Estoque</h1>
      <div className="stock-management__content">
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
