import React, { createContext, useState } from 'react';

interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  gradient: string;
}

const themes: Theme[] = [
  {
    id: 'purple',
    name: 'Cosmic Purple',
    colors: {
      primary: 'purple-500',
      secondary: 'pink-500',
      accent: 'blue-500'
    },
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'cyber',
    name: 'Cyber Blue',
    colors: {
      primary: 'cyan-500',
      secondary: 'blue-500',
      accent: 'indigo-500'
    },
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'ember',
    name: 'Ember Gold',
    colors: {
      primary: 'amber-500',
      secondary: 'orange-500',
      accent: 'red-500'
    },
    gradient: 'from-amber-500 to-orange-500'
  }
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      document.documentElement.setAttribute('data-theme', themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

