// This file contains configurations for animations, transitions, and parallax effects
// to enhance the user experience in a web application.
export const animationConfig = {
  fadeIn: {
    duration: 0.5,
    delay: 0,
    easing: 'ease-in-out',
    opacity: [0, 1],
    transform: ['translateY(20px)', 'translateY(0)']
  },
  slideIn: {
    duration: 0.6,
    delay: 0.1,
    easing: 'ease-in-out',
    transform: ['translateX(-100%)', 'translateX(0)']
  },
  zoomIn: {
    duration: 0.4,
    delay: 0.2,
    easing: 'ease-in-out',
    transform: ['scale(0.8)', 'scale(1)']
  },
  bounceIn: {
    duration: 0.7,
    delay: 0.3,
    easing: 'ease-in-out',
    transform: ['translateY(-30px)', 'translateY(0)']
  }
};
// This file contains configurations for motion, transitions, and parallax effects
// to enhance the user experience in a web application. 
// It includes settings for spring animations, performance optimizations, and parallax effects.
export const motionConfig = {
  spring: {
    light: { stiffness: 300, damping: 20 },
    medium: { stiffness: 400, damping: 25 },
    heavy: { stiffness: 500, damping: 30 }
  },
  performance: {
    // Optimize animations for better performance
    light: { 
      willChange: 'transform',
      backfaceVisibility: 'hidden',
      perspective: '1000px'
    },
    heavy: {
      willChange: 'transform, opacity',
      backfaceVisibility: 'hidden',
      perspective: '1000px',
      translateZ: 0
    }
  },
  transition: {
    // More performant transitions with reduced properties
    hover: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }, // Reduced duration
    click: { duration: 0.1, ease: [0.4, 0, 0.2, 1] },     // Reduced duration
    page: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }  // Reduced duration
  }
};

export const parallaxConfig = {
  stars: {
    layers: [
      { scale: 1, speed: 0.2, blur: '0px' },
      { scale: 1.5, speed: 0.5, blur: '1px' },
      { scale: 2, speed: 0.8, blur: '2px' }
    ]
  },
  nebula: {
    intensity: 0.5,
    colorTransition: 0.3,
    mouseSensitivity: 0.1
  }
};

export const scrollConfig = {
  smooth: true,
  speed: 0.8,
  easing: 'easeInOutQuad',
  offset: 50, // Offset for sections
  threshold: 0.1 // Threshold for triggering animations
};

export const transitionConfig = {
  fade: { duration: 0.5, ease: 'easeInOut' },
  slide: { duration: 0.6, ease: 'easeInOut' },
  zoom: { duration: 0.4, ease: 'easeInOut' },
  bounce: { duration: 0.7, ease: 'easeInOut' }
};

export const fluidTransition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 0.3
};

export const smoothTransition = {
  type: "tween",
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1]
};

export const smoothAnimation = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

