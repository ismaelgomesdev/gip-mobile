import React, { createContext, useState, useEffect } from 'react';

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    // Carregar os dados do arquivo JSON
    fetch('/stock.json')
      .then(response => response.json())
      .then(data => setStock(data.stock))
      .catch(error => console.error('Erro ao carregar o estoque:', error));
  }, []);

  const updateStock = (updatedItem) => {
    const updatedStock = stock.map(item =>
      item.id === updatedItem.id ? { ...item, quantity: updatedItem.quantity } : item
    );
    setStock(updatedStock);

    // Aqui, você pode adicionar a lógica para persistir a alteração no arquivo JSON,
    // caso estivesse usando um backend ou API.
  };

  return (
    <StockContext.Provider value={{ stock, updateStock }}>
      {children}
    </StockContext.Provider>
  );
};
