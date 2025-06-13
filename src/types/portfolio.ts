import { motionConfig } from '../utils/animation';

export interface PortfolioState {
  theme: string;
  loading: Record<string, boolean>;
  animationPreferences: typeof motionConfig;
  activeSection: number;
}

export type PortfolioAction = 
  | { type: 'SET_THEME'; payload: string }
  | { type: 'SET_LOADING'; payload: { key: string; value: boolean } }
  | { type: 'SET_ANIMATION_PREFERENCES'; payload: typeof motionConfig }
  | { type: 'SET_ACTIVE_SECTION'; payload: number };
