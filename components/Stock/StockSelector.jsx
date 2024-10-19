import React, { useState, useContext } from 'react';
import { StockContext } from '../../src/contexts/StockContext';
import './stock-selector.scss';

const StockSelector = ({ onSelectItem, selectedItems, onRemoveItem }) => {
  const [selectedStockItem, setSelectedStockItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { stock, updateStock } = useContext(StockContext);

  const handleSelectChange = (e) => {
    setSelectedStockItem(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddItem = () => {
    const item = stock.find(s => s.id === selectedStockItem);
    if (item && quantity <= item.quantity) {
      const updatedItem = { ...item, quantity: item.quantity - quantity };
      updateStock(updatedItem);
      onSelectItem({ ...item, selectedQuantity: quantity });
      setQuantity(1);
      setSelectedStockItem('');
    } else {
      alert('Quantidade indisponível ou inválida.');
    }
  };

  return (
    <div className="stock-selector mb-5">
      <div className="flex items-center mb-4">
        <label className="font-bold mr-4 text-gray-800">Selecionar Item do Estoque:</label>
        <select value={selectedStockItem} onChange={handleSelectChange} className="mr-4 p-2 border border-gray-600 rounded-md">
          <option value="" disabled>Selecione um item</option>
          {stock.map(item => (
            <option key={item.id} value={item.id}>
              {item.name} (Disponível: {item.quantity})
            </option>
          ))}
        </select>
        <input 
          type="number" 
          value={quantity} 
          onChange={handleQuantityChange} 
          min="1" 
          placeholder="Quantidade"
          className="mr-4 p-2 border border-gray-600 rounded-md w-20"
        />
        <button type="button" onClick={handleAddItem} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Adicionar</button>
      </div>
      {selectedItems.length > 0 && (
        <div className="selected-items">
          <h4 className="font-bold mb-3 text-gray-800">Itens Selecionados</h4>
          <ul className="list-disc pl-5">
            {selectedItems.map((item, index) => (
              <li key={index} className="mb-2 flex items-center justify-between">
                {item.name} - {item.selectedQuantity} unidades
                <button type="button" onClick={() => onRemoveItem(index)} className="ml-4 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600">Remover</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StockSelector;
