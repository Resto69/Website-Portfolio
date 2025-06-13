import React, { useReducer } from 'react';
import { initialState, portfolioReducer } from './portfolioState';
import { PortfolioContext } from './portfolioContext';

interface PortfolioProviderProps {
  children: React.ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  return (
    <PortfolioContext.Provider value={{ state, dispatch }}>
      {children}
    </PortfolioContext.Provider>
  );
};
