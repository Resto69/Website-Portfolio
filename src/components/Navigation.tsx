import React, { useRef } from 'react';
import { User, Code, Briefcase, Send, Palette, MessageCircleCodeIcon } from 'lucide-react';


// Define the section type for better type safety
interface Section {
  title: string;
  icon: JSX.Element;
  color: string;
}


interface NavigationProps {
  activeSection: number;
  setActiveSection: (index: number) => void;
}

const sections: Section[] = [
  {
    title: "About",
    icon: <User className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Experience",
    icon: <Briefcase className="w-8 h-8" />,
    color: "from-indigo-900 to-purple-900"
  },
  {
    title: "Contact",
    icon: <Send className="w-8 h-8" />,
    color: "from-purple-600 to-pink-600"
  },
  {
    title: "Versatilist",
    icon: <Palette className="w-8 h-8" />,
    color: "from-violet-500 to-fuchsia-500"
  },
  {
    title: "Projects",
    icon: <Code className="w-8 h-8" />,
    color: "from-blue-600 to-indigo-600"
  },
  {
    title: "Mindset",
    icon: <MessageCircleCodeIcon className="w-8 h-8" />,
    color: "from-orange-400 to-red-500"
  }
];

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Split sections into two groups
  const topSections = sections.slice(0, 3);
  const bottomSections = sections.slice(3);

  // Unified Logo component with self-contained sizing
  const LogoComponent = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-[clamp(3rem,6vw,4rem)] aspect-square relative"> {/* Increased size */}
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl" />
        
        {/* Logo SVG */}
        <div className="relative z-10 w-full h-full">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#A855F7' }} />
                    <stop offset="50%" style={{ stopColor: '#EC4899' }} />
                    <stop offset="100%" style={{ stopColor: '#A855F7' }} />
                </linearGradient>
                {/* Add subtle pattern */}
                <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                    <path d="M 4 0 L 0 0 0 4" fill="none" stroke="url(#logoGradient)" strokeWidth="0.5" opacity="0.3" />
                </pattern>
            </defs>
            
            {/* Background hexagon with pattern */}
            <path
                d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z"
                fill="url(#grid)"
                stroke="url(#logoGradient)"
                strokeWidth="2"
            />
            
            {/* Inner hexagon */}
            <path
                d="M50 15L80 32.5V67.5L50 85L20 67.5V32.5L50 15Z"
                stroke="url(#logoGradient)"
                strokeWidth="1"
                opacity="0.5"
            />
            
            {/* Stylized A */}
            <path
                d="M35 70L50 25L65 70M40 55H60"
                stroke="url(#logoGradient)"
                strokeWidth="3"
                strokeLinecap="round"
            />
            
            {/* Stylized Z */}
            <path
                d="M30 35H70L30 65H70"
                stroke="url(#logoGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.8"
            />
            
            {/* Decorative elements */}
            <circle cx="50" cy="25" r="2" fill="url(#logoGradient)" />
            <circle cx="30" cy="65" r="2" fill="url(#logoGradient)" className="animate-pulse" />
            <circle cx="70" cy="65" r="2" fill="url(#logoGradient)" className="animate-pulse delay-300" />
            
            {/* Small connecting lines */}
            <path
                d="M45 20L55 20M25 60L35 60M65 60L75 60"
                stroke="url(#logoGradient)"
                strokeWidth="1"
                opacity="0.3"
            />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:relative 
         sm:w-[clamp(6rem,12vw,8rem)] lg:w-[clamp(7rem,14vw,10rem)]
         glass border-t sm:border-t-0 sm:border-r border-white/10
         h-[calc(4rem+env(safe-area-inset-bottom))] sm:h-screen">
      <div className="w-full h-full bg-black/60 sm:bg-transparent backdrop-blur-lg sm:backdrop-blur-none
           flex items-center justify-between
           px-safe-small xxxs:px-2 xxs:px-3 sm:px-[clamp(1rem,2vw,1.5rem)]
           py-1.5 xxxs:py-2 sm:py-[clamp(2rem,4vh,3rem)]
           sm:flex-col
           gap-2 xxxs:gap-3 xxs:gap-4 sm:gap-0
           transition-all duration-300 ease-in-out">
        
        {/* Navigation groups */}
        <div className="flex-1 flex items-center justify-center 
             gap-1.5 xxxs:gap-2 xxs:gap-3
             sm:h-[33vh] sm:flex-col sm:items-center sm:justify-end 
             sm:gap-[clamp(1rem,2.5vh,1.75rem)] min-w-0">
          {topSections.map((section, index) => (
            <React.Fragment key={index}>
              <button
                ref={(el) => (buttonRefs.current[index] = el)}
                onClick={() => setActiveSection(index)}
                className="relative group flex-1 sm:flex-initial sm:w-full min-w-0 
                         max-w-[80px] xxs:max-w-none" // Added max-width for smallest screens
              >
                <div className={`
                  relative sm:p-2 lg:p-[clamp(0.25rem,1vw,0.75rem)] rounded-xl 
                  transition-all duration-300
                  flex flex-col items-center justify-center
                  ${activeSection === index 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/20' 
                    : 'hover:bg-purple-500/10'
                  }
                `}>
                  {activeSection === index && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 
                         w-[clamp(1rem,4vw,1.5rem)] h-[clamp(0.125rem,0.5vw,0.25rem)]
                         bg-gradient-to-r from-purple-500 to-pink-500 rounded-full
                         sm:hidden" />
                  )}
                  <div className="flex flex-col items-center relative">
                    {/* Icon with updated scaling */}
                    {React.cloneElement(section.icon, {
                      className: `w-4 h-4 xxs:w-5 xxs:h-5 
                        sm:w-5 sm:h-5 lg:w-[clamp(1.25rem,3vw,2rem)] lg:h-[clamp(1.25rem,3vw,2rem)]
                        transition-all duration-300
                        ${activeSection === index 
                          ? 'text-white filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' 
                          : 'text-gray-400 group-hover:text-gray-300'}`
                    })}
                    {/* Text with updated scaling */}
                    <span className={`
                      text-[0.6rem] xxs:text-[0.65rem] 
                      sm:text-[0.65rem] lg:text-[clamp(0.65rem,1.5vw,0.875rem)]
                      font-medium mt-1 truncate w-full text-center
                      transition-colors duration-300
                      ${activeSection === index 
                        ? 'text-white' 
                        : 'text-gray-400 group-hover:text-gray-300'}
                    `}>
                      {section.title}
                    </span>
                  </div>
                </div>
              </button>

              {/* Add dividers between buttons - same as bottom section */}
              {index < topSections.length - 1 && (
                <div className="hidden sm:block h-px w-[clamp(1.5rem,4vw,3rem)] 
                     bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Logo - Hide completely on mobile */}
        <div className="hidden sm:block h-[clamp(4rem,12vh,6rem)] 
             sm:h-20 lg:h-[clamp(5rem,14vh,7rem)]
             my-[clamp(1rem,2.5vh,2rem)]">
          <LogoComponent />
        </div>

        {/* Bottom section */}
        <div className="flex-1 flex items-center justify-center
             gap-1.5 xxxs:gap-2 xxs:gap-3
             sm:h-[33vh] sm:flex-col sm:items-center sm:justify-start 
             sm:gap-[clamp(1rem,2.5vh,1.75rem)] min-w-0">
          {bottomSections.map((section, index) => (
            <React.Fragment key={index + 3}>
              <button
                ref={(el) => (buttonRefs.current[index + 3] = el)}
                onClick={() => setActiveSection(index + 3)}
                className="relative group flex-1 sm:flex-initial sm:w-full min-w-0"
              >
                <div className={`
                  relative sm:p-2 lg:p-[clamp(0.25rem,1vw,0.75rem)] rounded-xl 
                  transition-all duration-300
                  flex flex-col items-center justify-center
                  ${activeSection === index + 3 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/20' 
                    : 'hover:bg-purple-500/10'
                  }
                `}>
                  {/* Active indicator - Matched with top buttons */}
                  {activeSection === index + 3 && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 
                         w-[clamp(1rem,4vw,1.5rem)] h-[clamp(0.125rem,0.5vw,0.25rem)]
                         bg-gradient-to-r from-purple-500 to-pink-500 rounded-full
                         sm:hidden" />
                  )}

                  <div className="flex flex-col items-center relative">
                    {React.cloneElement(section.icon, {
                      className: `w-4 h-4 xxs:w-5 xxs:h-5 
                        sm:w-5 sm:h-5 lg:w-[clamp(1.25rem,3vw,2rem)] lg:h-[clamp(1.25rem,3vw,2rem)]
                        transition-all duration-300
                        ${activeSection === index + 3 
                          ? 'text-white filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' 
                          : 'text-gray-400 group-hover:text-gray-300'}`
                    })}
                    <span className={`
                      text-[0.6rem] xxs:text-[0.65rem] 
                      sm:text-[0.65rem] lg:text-[clamp(0.65rem,1.5vw,0.875rem)]
                      font-medium mt-1 truncate w-full text-center
                      transition-colors duration-300
                      ${activeSection === index + 3 
                        ? 'text-white' 
                        : 'text-gray-400 group-hover:text-gray-300'}
                    `}>
                      {section.title}
                    </span>
                  </div>
                </div>
              </button>

              {/* Vertical divider - Matched with top spacing */}
              {index < bottomSections.length - 1 && (
                <div className="hidden sm:block h-px w-[clamp(1.5rem,4vw,3rem)] 
                     bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Navigation;