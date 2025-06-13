import { PortfolioState, PortfolioAction } from '../types/portfolio';
import { motionConfig } from '../utils/animation';

export const initialState: PortfolioState = {
  theme: 'dark',
  loading: {},
  animationPreferences: motionConfig,
  activeSection: 0
};

export function portfolioReducer(state: PortfolioState, action: PortfolioAction): PortfolioState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LOADING':
      return { 
        ...state, 
        loading: { ...state.loading, [action.payload.key]: action.payload.value }
      };
    case 'SET_ANIMATION_PREFERENCES':
      return { ...state, animationPreferences: action.payload };
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };
    default:
      return state;
  }
}
