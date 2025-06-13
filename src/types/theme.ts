import { motionConfig } from '../utils/animation';

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  gradient: string;
}

export interface PortfolioState {
  theme: string;
  loading: Record<string, boolean>;
  animationPreferences: typeof motionConfig;
  activeSection: number;
  currentTheme: Theme;
}

export type PortfolioAction = 
  | { type: 'SET_THEME'; payload: string }
  | { type: 'SET_LOADING'; payload: { key: string; value: boolean } }
  | { type: 'SET_ANIMATION_PREFERENCES'; payload: typeof motionConfig }
  | { type: 'SET_ACTIVE_SECTION'; payload: number };
