import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import MindsetSection from './components/MindsetSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import VersatilistSection from './components/VersatilistSection';
import './styles/animations.css';

function App() {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [starPositions, setStarPositions] = useState<Array<{ width: number, height: number, left: number, top: number, delay: number, opacity: number }>>([]);

  useEffect(() => {
    // Precalculate star positions to reduce layout thrashing
    const starPositions = [...Array(50)].map(() => ({
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.7 + 0.3
    }));

    setStarPositions(starPositions);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 0:
        return <AboutSection />;
      case 1:
        return <ExperienceSection />;
      case 2:
        return <ContactSection />;
      case 3:
        return <VersatilistSection />;
      case 4:
        return <ProjectsSection />;
      case 5:
        return <MindsetSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Starry Background */}
      <div className="fixed w-full h-full pointer-events-none">
        {/* Optimized star rendering */}
        {starPositions.map((pos, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white animate-twinkle gpu-accelerated"
            style={{
              width: `${pos.width}px`,
              height: `${pos.height}px`,
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${pos.delay}s`,
              opacity: pos.opacity
            }}
          />
        ))}

        {/* Medium stars with glow */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`star-med-${i}`}
            className="absolute animate-twinkle-glow"
            style={{
              width: '3px',
              height: '3px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: `${Math.random() * 4}s`,
              boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}

        {/* Subtle nebula effects */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`nebula-${i}`}
            className="absolute rounded-full animate-nebula-drift opacity-10"
            style={{
              width: Math.random() * 300 + 200 + 'px',
              height: Math.random() * 300 + 200 + 'px',
              background: `radial-gradient(circle, 
                rgba(${Math.random() * 50 + 100}, ${Math.random() * 50}, ${Math.random() * 255}, 0.15) 0%,
                transparent 70%)`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              filter: 'blur(30px)',
              animationDelay: `${i * 5}s`
            }}
          />
        ))}
        
        {/* Shooting stars */}
        {[...Array(2)].map((_, i) => (
          <div
            key={`shooting-star-${i}`}
            className="absolute h-px w-32 animate-shooting-star"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)',
              top: Math.random() * 50 + '%',
              left: '-32px',
              animationDelay: `${i * 7 + Math.random() * 7}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Navigation */}
        <div className="fixed inset-x-0 bottom-0 sm:left-0 sm:bottom-auto sm:top-0 
             h-[calc(4rem+env(safe-area-inset-bottom))] sm:h-screen 
             w-full sm:w-[clamp(6rem,12vw,8rem)] lg:w-[clamp(7rem,14vw,10rem)]
             transition-all duration-300 z-50">
          <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>

        {/* Content Area - Enhanced padding and spacing consistency */}
        <div className="flex-1 
             pb-[calc(4rem+env(safe-area-inset-bottom))] sm:pb-8
             pt-2 sm:pt-[clamp(2rem,5vh,4rem)]
           
             sm:pl-[calc(clamp(6rem,12vw,8rem)_+_1.5rem)] 
             lg:pl-[calc(clamp(7rem,14vw,10rem)_+_2rem)]
             lg:pr-[calc(5rem_+_2rem)]
             overflow-y-auto">
          <div className="max-w-[min(100%,1400px)] mx-auto w-full">
            <div className="transition-opacity duration-500 space-y-6 sm:space-y-8 lg:space-y-10">
              {renderSection()}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="hidden lg:block fixed right-0 top-0 bottom-0 w-20
             glass border-l border-white/10
             transition-transform duration-300">
          <div className="h-full flex flex-col justify-center items-center gap-8">
            <div className="w-2 h-2 rounded-full bg-purple-500/70 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500/70 animate-pulse delay-150"></div>
            <div className="w-2 h-2 rounded-full bg-pink-500/70 animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;