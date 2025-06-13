
// This file defines the design tokens for the application, including colors, typography, spacing, and effects.
export const designTokens = { // src/styles/design-tokens.ts
  containers: {
    maxWidth: 'max-w-6xl',
    padding: {
      section: 'py-12',
      container: 'p-8',
      card: 'p-6',
    },
    gap: {
      grid: 'gap-8',
      stack: 'space-y-8',
    },
    rounded: {
      lg: 'rounded-2xl',
      md: 'rounded-xl',
      sm: 'rounded-lg'
    },
  },
  
  typography: {
    heading: {
      primary: 'text-4xl md:text-5xl font-bold',
      secondary: 'text-3xl md:text-4xl font-bold',
      section: 'text-2xl md:text-3xl font-semibold',
      card: 'text-xl font-semibold',
    },
    body: {
      large: 'text-lg text-gray-300',
      base: 'text-base text-gray-300',
      small: 'text-sm text-gray-400',
    },
    spacing: {
      heading: 'mb-6',
      section: 'mb-4',
      paragraph: 'mb-3',
    }
  },
  colors: {
    primary: {
      base: 'purple-500',
      hover: 'purple-600',
      light: 'purple-400',
      transparent: 'purple-500/10',
      glow: 'purple-500/20',
    },
    accent: {
      base: 'pink-500',
      hover: 'pink-600',
      light: 'pink-400',
      transparent: 'pink-500/10',
      glow: 'pink-500/20',
    },
    success: {
      base: 'emerald-500',
      light: 'emerald-400',
      dark: 'emerald-600',
    },
  },
  gradients: {
    primary: 'from-purple-500 to-pink-500',
    primaryHover: 'from-purple-600 to-pink-600',
    subtle: 'from-purple-500/10 to-pink-500/10',
  },
  effects: {
    glass: 'backdrop-blur-lg bg-white bg-opacity-10 border border-white/10',
    hover: 'hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1',
    transition: 'transition-all duration-300'
  },
  spacing: {
    section: {
      outer: 'py-12 px-6 md:px-8 lg:px-12',
      inner: 'space-y-8 md:space-y-12',
      header: 'mb-12'
    },
    content: {
      card: 'p-6 md:p-8',
      grid: 'gap-6 md:gap-8'
    }
  },
  animation: {
    transition: 'transition-all duration-300',
    hover: 'hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20',
    gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
  }
};
