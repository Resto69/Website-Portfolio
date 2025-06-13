import { createContext } from 'react';
import { PortfolioState, PortfolioAction } from '../types/theme';
import { initialState } from './portfolioState';

export const PortfolioContext = createContext<{
  state: PortfolioState;
  dispatch: React.Dispatch<PortfolioAction>;
}>({
  state: initialState,
  dispatch: () => null
});