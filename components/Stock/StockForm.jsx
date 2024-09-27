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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome do Item:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nome do item" 
          required 
        />
      </div>
      <div>
        <label>Quantidade:</label>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          placeholder="Quantidade" 
          required 
        />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default StockForm;
