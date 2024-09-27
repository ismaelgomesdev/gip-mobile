import React, { createContext, useState, useEffect } from 'react';

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/stock')
      .then(response => response.json())
      .then(data => setStock(data.stock))
      .catch(error => console.error('Erro ao carregar o estoque:', error));
  }, []);

  const persistStock = (updatedStock) => {
    fetch('http://localhost:5000/api/stock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stock: updatedStock }),
    }).catch(error => console.error('Erro ao persistir o estoque:', error));
  };

  const updateStock = (updatedItem) => {
    const updatedStock = stock.map(item =>
      item.id === updatedItem.id ? { ...item, quantity: updatedItem.quantity, name: updatedItem.name } : item
    );
    setStock(updatedStock);
    persistStock(updatedStock);
  };

  const addStockItem = (newItem) => {
    newItem.id = Date.now().toString();
    const updatedStock = [...stock, newItem];
    setStock(updatedStock);
    persistStock(updatedStock);
  };

  const deleteStockItem = (id) => {
    const updatedStock = stock.filter(item => item.id !== id);
    setStock(updatedStock);
    persistStock(updatedStock);
  };

  return (
    <StockContext.Provider value={{ stock, updateStock, addStockItem, deleteStockItem }}>
      {children}
    </StockContext.Provider>
  );
};
