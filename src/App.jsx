import React from 'react';
import AppRouter from './AppRouter';
import { StockProvider } from '../src/contexts/StockContext';
import { AgentProvider } from './contexts/AgentContext';
import { RequestProvider } from './contexts/RequestContext';

function App() {
  return (
    <StockProvider>
      <AgentProvider>
        <RequestProvider>
          <AppRouter />
        </RequestProvider>
      </AgentProvider>
    </StockProvider>
  );
}

export default App;
