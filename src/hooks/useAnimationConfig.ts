import { usePortfolio } from './usePortfolio';

export const useAnimationConfig = () => {
  const { state: { animationPreferences } } = usePortfolio();
  
  const getTransition = (type: keyof typeof animationPreferences.transition) => {
    return animationPreferences.transition[type];
  };

  const getSpring = (weight: keyof typeof animationPreferences.spring) => {
    return animationPreferences.spring[weight];
  };

  return {
    getTransition,
    getSpring,
    config: animationPreferences
  };
};
