/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
        accent: '#FF4081',
      },
      screens: {
        'xxxs': '280px',  // Add even smaller breakpoint
        'xxs': '300px',   // Adjust existing breakpoint
        'tiny': '320px',  // iPhone SE
        'xs': '375px',    // iPhone X/12/13
        's-sm': '425px',  // Large mobile
        's-md': '480px',  // Larger mobile/Small tablet
        's-lg': '540px',  // Landscape mobile
        'sm': '640px',    // Small tablet
        'md': '768px',    // Tablet
        'lg': '1024px',   // Laptop
        'xl': '1280px',   // Desktop
        '2xl': '1536px',  // Large screens
        '3xl': '1920px',  // Extra large screens
        '4xl': '2560px',  // 4K and ultra-wide
      },
      padding: {
        'vw-2': '2vw',
        'vw-4': '4vw',
        'vw-6': '6vw',
        'vw-8': '8vw',
        // Mobile-first padding
        'mobile': 'clamp(0.75rem, 2vw, 1.5rem)',
        'tablet': 'clamp(1rem, 3vw, 2rem)',
        'desktop': 'clamp(1.5rem, 4vw, 3rem)',
        'fluid-btn': 'clamp(0.5rem, 1.5vw, 1.5rem)',
        'fluid-card': 'clamp(0.75rem, 2vw, 2rem)',
        'fluid-section': 'clamp(1rem, 3vw, 3rem)',
      },
      spacing: {
        'vw-1': '1vw',
        'vw-2': '2vw',
        'vw-3': '3vw',
        'vw-4': '4vw',
        // Mobile-first spacing
        'xs-space': 'clamp(0.25rem, 1vw, 0.5rem)',
        'sm-space': 'clamp(0.5rem, 1.5vw, 1rem)',
        'md-space': 'clamp(1rem, 2.5vw, 2rem)',
        'lg-space': 'clamp(1.5rem, 3.5vw, 3rem)',
        'xl-space': 'clamp(2rem, 5vw, 4rem)',
        // Ultra-small screen optimized spacing
        'fluid-1': 'clamp(0.25rem, 0.5vw + 0.1rem, 0.5rem)',
        'fluid-2': 'clamp(0.5rem, 1vw + 0.2rem, 1rem)',
        'fluid-3': 'clamp(0.75rem, 1.5vw + 0.3rem, 1.5rem)',
        'fluid-4': 'clamp(1rem, 2vw + 0.4rem, 2rem)',
        'fluid-6': 'clamp(1.5rem, 3vw + 0.6rem, 3rem)',
        'fluid-8': 'clamp(2rem, 4vw + 0.8rem, 4rem)',
        'fluid-12': 'clamp(3rem, 6vw + 1.2rem, 6rem)',
        'safe-small': 'max(0.5rem, env(safe-area-inset-left))',
        'safe-base': 'max(1rem, env(safe-area-inset-left))',
      },
      width: {
        'fluid-xs': 'clamp(1rem, 2vw + 0.5rem, 2rem)',
        'fluid-sm': 'clamp(1.5rem, 3vw + 0.75rem, 3rem)',
        'fluid-md': 'clamp(2rem, 4vw + 1rem, 4rem)',
        'fluid-lg': 'clamp(3rem, 6vw + 1.5rem, 6rem)',
        'fluid-xl': 'clamp(4rem, 8vw + 2rem, 8rem)',
        'fluid-2xl': 'clamp(5rem, 10vw + 2.5rem, 10rem)',
        'fluid-3xl': 'clamp(6rem, 12vw + 3rem, 12rem)',
    // Fluid widths for responsive design // 
      },

      fontSize: {
        // Micro text (labels, captions)
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        
        // Small text (secondary info)
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        
        // Body text
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        
        // Large body text
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        
        // Subheadings
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        
        // Small headings
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
        
        // Medium headings
        'fluid-3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem)',
        
        // Large headings
        'fluid-4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)',
        
        // Hero text
        'fluid-5xl': 'clamp(3rem, 2.5rem + 2.5vw, 4rem)',
        
        // Display text
        'fluid-6xl': 'clamp(3.75rem, 3rem + 3.75vw, 6rem)',
      },
      lineHeight: {
        'fluid': 'clamp(1.5, 1.2 + 1vw, 2)',
        'fluid-tight': 'clamp(1.2, 1.1 + 0.5vw, 1.5)',
        'fluid-loose': 'clamp(1.8, 1.5 + 1.5vw, 2.5)',
      },
      letterSpacing: {
        'fluid-tight': 'clamp(-0.05em, -0.075em + 0.125vw, 0em)',
        'fluid-normal': 'clamp(0em, -0.025em + 0.125vw, 0.05em)',
        'fluid-wide': 'clamp(0.05em, 0.025em + 0.125vw, 0.1em)',
      },
      maxWidth: {
        'screen-90': '90vw',
        // Responsive max-width
        'mobile': 'clamp(280px, 95vw, 540px)',
        'tablet': 'clamp(540px, 85vw, 768px)',
        'content': 'clamp(300px, 90vw, 1200px)',
      },
      gap: {
        'fluid-xs': 'clamp(0.25rem, 0.5vw, 0.5rem)',
        'fluid-sm': 'clamp(0.5rem, 1vw, 1rem)',
        'fluid-md': 'clamp(1rem, 2vw, 2rem)',
      },
      borderRadius: {
        'fluid': 'clamp(0.375rem, 1vw, 0.75rem)',
      }
    },
  },
};
