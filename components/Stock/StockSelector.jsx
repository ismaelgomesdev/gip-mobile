import React, { useState, useContext } from 'react';
import { StockContext } from '../../src/contexts/StockContext';
import './stock-selector.scss';

const StockSelector = ({ onSelectItem, selectedItems }) => {
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
        setQuantity(1); // Reset the quantity field after adding the item
        setSelectedStockItem(''); // Reset the selection field
      } else {
        alert('Quantidade indisponível ou inválida.');
      }
    };

    return (
      <div className="stock-selector">
        <label>Selecionar Item do Estoque:</label>
        <select value={selectedStockItem} onChange={handleSelectChange}>
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
        />
        <button onClick={handleAddItem}>Adicionar</button>

        {selectedItems.length > 0 && (
          <div className="selected-items">
            <h4>Itens Selecionados</h4>
            <ul>
              {selectedItems.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.selectedQuantity} unidades
                  <button onClick={() => onRemoveItem(index)}>Remover</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
};

export default StockSelector;
