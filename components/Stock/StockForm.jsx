import React, { useState, useEffect } from 'react';
import './stock-form.scss';

const StockForm = ({ onSave, stockItem }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (stockItem) {
      setName(stockItem.name || '');
      setQuantity(stockItem.quantity || '');
    }
  }, [stockItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: stockItem?.id, name, quantity: parseInt(quantity, 10) });

    // Resetando o formulário após o salvamento
    setName('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 border border-gray-700 p-4 rounded-md max-w-lg mb-5">
      <div className="mb-4">
        <label className="block font-bold mb-2 text-gray-800">Nome do Item:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nome do item" 
          required 
          className="w-full p-3 border border-gray-600 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2 text-gray-800">Quantidade:</label>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          placeholder="Quantidade" 
          required 
          className="w-full p-3 border border-gray-600 rounded-md max-w-xs"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600">Salvar</button>
    </form>
  );
};

export default StockForm;