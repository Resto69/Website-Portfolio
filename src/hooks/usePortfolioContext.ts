import { useContext } from 'react';
import { PortfolioContext } from '../context/portfolioContext';

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
