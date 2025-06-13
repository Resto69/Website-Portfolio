import { useContext } from 'react';
import { PortfolioContext } from '../context/portfolioContext';

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const useAnimationConfig = () => {
  const {
    state: { animationPreferences },
  } = usePortfolio();

  const getTransition = (type: keyof typeof animationPreferences.transition) => {
    return animationPreferences.transition[type];
  };

  const getSpring = (weight: keyof typeof animationPreferences.spring) => {
    return animationPreferences.spring[weight];
  };

  return {
    getTransition,
    getSpring,
    config: animationPreferences,
  };
};

