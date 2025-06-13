import { motionConfig } from '../utils/animation';

// App & Portfolio Types
export interface AppState {
  theme: string;
  activeSection: number;
  animationPreferences: typeof motionConfig;
  isLoading: { [key: string]: boolean };
}

export type AppAction =
  | { type: 'SET_THEME'; payload: string }
  | { type: 'SET_ACTIVE_SECTION'; payload: number }
  | { type: 'SET_ANIMATION_PREFERENCES'; payload: typeof motionConfig }
  | { type: 'SET_LOADING'; payload: { key: string; value: boolean } };

// Shared Component Types
export interface SectionLayoutProps {
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  style?: React.CSSProperties;
}

// Portfolio Specific Types
export * from './portfolio';
