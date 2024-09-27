import React from 'react';
import AppRouter from './AppRouter';
import { StockProvider } from '../src/contexts/StockContext';

function App() {
  return (
    <StockProvider>
      <AppRouter />
    </StockProvider>
  );
}

export default App;
