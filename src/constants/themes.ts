import { Theme } from '../types/theme';

export const themes: Theme[] = [
  {
    id: 'purple',
    name: 'Cosmic Purple',
    colors: {
      primary: '#4C1D95', // violet-900
      secondary: '#7C3AED', // violet-600
      accent: '#A855F7' // pink-500
    },
    gradient: 'linear-gradient(to right, #4C1D95, #7C3AED)',
  }
];
