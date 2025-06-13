import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Palette, HeadsetIcon, Star, Award, ChevronDown, Clock, MapPin, Scissors } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// Define the debounced function type
type DebouncedFunction = {
  (): void;
  cancel: () => void;
};

// Inline debounce implementation
const debounce = (func: () => void, wait: number): DebouncedFunction => {
  let timeout: NodeJS.Timeout;
  
  const debounced = () => {
    const later = () => {
      clearTimeout(timeout);
      func();
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  return debounced as DebouncedFunction;
};

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  highlights?: {
    icon: JSX.Element;
    title: string;
    description: string;
  }[];
  skills?: string[];
}

const experiences: Experience[] = [
  {
    role: "Senior UX/UI Designer & Creative Lead",
    company: "Freelance",
    location: "Sarajevo, Bosnia and Herzegovina",
    period: "January 2022 - Present",
    description: "Driving digital transformation through innovative design solutions while managing a diverse portfolio of international clients. Specializing in e-commerce optimization, SaaS platforms, and enterprise solutions with a focus on data-driven design decisions.",
    achievements: [
      "Increased e-commerce conversion rates by 45% through strategic UX improvements and A/B testing",
      "Established comprehensive design systems reducing development time by 60%",
      "Successfully delivered 40+ projects with 100% client satisfaction rate",
      "Mentored 4 junior designers to senior positions within 8 months",
      "Implemented data-driven design strategies increasing user engagement by 35%",
      "Created scalable design frameworks adopted by 5+ enterprise clients",
      "Reduced design iteration cycles by 40% through optimized workflows",
      "Generated $500K+ in client revenue through successful project deliveries"
    ],
    highlights: [
      {
        icon: <Palette className="w-6 h-6" />,
        title: "Design Innovation",
        description: "40+ successful projects delivered"
      },
      {
        icon: <Star className="w-6 h-6" />,
        title: "Client Excellence",
        description: "100% client satisfaction maintained"
      }
    ],
    skills: [
      "UI/UX Design",
      "Design Systems",
      "User Research",
      "A/B Testing",
      "Prototyping",
      "Team Leadership",
      "Project Management",
      "Client Communication",
      "Figma/Adobe Suite",
      "Design Strategy",
      "Mobile-First Design",
      "Conversion Optimization"
    ]
  },
  {
    role: "Customer Care Specialist",
    company: "DDC MLS",
    location: "Sarajevo, Bosnia and Herzegovina",
    period: "December 2021 - November 2022",
    description: "Provided exceptional customer support while maintaining high service standards and resolving client inquiries efficiently.",
    achievements: [
      "Handled customer inquiries and resolved issues promptly",
      "Maintained detailed documentation of customer interactions",
      "Collaborated with cross-functional teams to improve service delivery",
      "Achieved consistently high customer satisfaction scores",
      "Contributed to the development of customer service best practices",
      "Achieved 98% customer satisfaction rating through proactive problem resolution",
      "Developed and implemented new customer feedback collection system",
      "Reduced average response time by 35% through process optimization",
      "Trained and mentored 3 new team members in customer service best practices",
      "Created comprehensive documentation for common customer inquiries",
      "Received Employee of the Month award twice for exceptional service",
      "Successfully handled 150+ customer interactions daily",
      "Implemented new escalation protocol reducing resolution time by 25%"
    ],
    highlights: [
      {
        icon: <HeadsetIcon className="w-6 h-6" />,
        title: "Service Excellence",
        description: "Maintained 95% positive customer feedback"
      },
      {
        icon: <Award className="w-6 h-6" />,
        title: "Performance Excellence",
        description: "98% satisfaction rating across 10,000+ interactions"
      },
      {
        icon: <Clock className="w-6 h-6" />,
        title: "Response Time Champion",
        description: "35% reduction in average response time"
      }
    ],
    skills: ["Customer Support", "Problem Solving", "Documentation", "Team Collaboration"]
  },
  {
    role: "Junior Digital Designer",
    company: "Creative Solutions Agency",
    location: "Sarajevo, Bosnia and Herzegovina",
    period: "June 2021 - November 2021",
    description: "Contributed to digital design projects while learning and implementing industry best practices in a fast-paced agency environment.",
    achievements: [
      "Assisted in the creation of digital marketing materials",
      "Collaborated with senior designers on brand projects",
      "Participated in client presentation preparations",
      "Learned and applied new design tools and techniques",
      "Contributed to internal design system documentation",
      "Redesigned company website increasing user engagement by 40%",
      "Created 30+ social media campaigns with average engagement rate of 15%",
      "Developed brand guidelines for 5 key clients",
      "Optimized design workflow reducing project delivery time by 25%",
      "Successfully managed and delivered 20+ client projects",
      "Introduced mobile-first design approach for all projects",
      "Achieved 95% client satisfaction rate on delivered projects",
      "Implemented accessibility standards in all design work"
    ],
    highlights: [
      {
        icon: <Award className="w-6 h-6" />,
        title: "Rising Star",
        description: "Recognized for rapid skill development"
      },
      {
        icon: <Star className="w-6 h-6" />,
        title: "Design Impact",
        description: "40% increase in website engagement"
      },
      {
        icon: <Award className="w-6 h-6" />,
        title: "Project Success",
        description: "95% client satisfaction rate"
      },
      {
        icon: <Palette className="w-6 h-6" />,
        title: "Creative Output",
        description: "30+ successful campaigns"
      }
    ],
    skills: ["Digital Design", "Adobe Creative Suite", "Project Management", "Client Communication"]
  },
  {
    role: "Sportswear Designer",
    company: "Cubanfit",
    location: "Remote",
    period: "3-month project",
    description: "Collaborated with Cubanfit to design and develop women's activewear collection, focusing on performance-driven designs that blend functionality with aesthetic appeal. Led end-to-end design process from concept to production-ready specifications.",
    achievements: [
      "Designed 7 complete activewear outfits including shorts, t-shirts, leggings, and sports bras",
      "Created comprehensive technical specifications for performance features like flatlock seams and ergonomic cuts",
      "Conducted material research to select optimal fabrics with 4-way stretch and moisture-wicking properties",
      "Developed production-ready designs using Adobe Illustrator and Photoshop",
      "Ensured all designs aligned with brand identity and current market trends",
      "Maintained consistent communication with stakeholders throughout the project lifecycle",
      "Delivered all designs on schedule meeting quality and performance requirements",
      "Incorporated customer feedback and wear-testing results into final designs"
    ],
    highlights: [
      {
        icon: <Scissors className="w-6 h-6" />,
        title: "Design Scope",
        description: "7 complete outfits designed and specified"
      },
      {
        icon: <Star className="w-6 h-6" />,
        title: "Technical Excellence",
        description: "Performance-optimized specifications"
      }
    ],
    skills: [
      "Technical Design",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Material Research",
      "Sportswear Design",
      "Technical Specifications",
      "Remote Collaboration",
      "Production Documentation"
    ]
  }
];




const experienceCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

// Add new timeline navigation variants
const timelineNavVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const ExperienceSection: React.FC = () => {
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [activeTimelinePoint, setActiveTimelinePoint] = useState(0);
  const [autoScrollPaused] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState(0);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout>();

  // Add cleanup in main useEffect
  useEffect(() => {
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, []);
  const lastInteractionRef = useRef<number>(Date.now());

  // Update achievementVariants for better performance
  const achievementVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.03, // Even shorter delay
        duration: 0.2,   // Faster duration
        ease: [0.2, 0, 0.3, 1], // Custom easing for smoother animation
      }
    })
  };

  const expandAnimationSequence = {
    initial: { height: 0, opacity: 0 },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.25 }, // Faster expansion
        opacity: { duration: 0.2, delay: 0.1 },
        staggerChildren: 0.05,      // Faster stagger
        delayChildren: 0.1          // Reduced delay
      }
    }
  };


  useEffect(() => {
    const debouncedScroll = debounce(() => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - top) / height));
      const newPoint = Math.floor(scrollProgress * experiences.length);

      if (newPoint !== activeTimelinePoint) {
        setActiveTimelinePoint(newPoint);
      }
    }, 100);

    window.addEventListener('scroll', debouncedScroll);
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      if (debouncedScroll.cancel) debouncedScroll.cancel();
    };
  }, [activeTimelinePoint]);

  useEffect(() => {
    if (expandedExp !== null) {
      const element = document.getElementById(`experience-${expandedExp}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' // Center the expanded card in viewport
          });
        }, 100); // Small delay to allow animation to start
      }
    }
  }, [expandedExp]);



  // Add auto-scroll functionality
  useEffect(() => {
    if (autoScrollPaused) return;

    const scrollNext = () => {
      setCurrentHighlight(prev => (prev + 1) % experiences.length);
      
      if (timelineRef.current) {
        const buttons = timelineRef.current.querySelectorAll('button');
        const nextButton = buttons[currentHighlight];
        
        if (nextButton) {
          const container = timelineRef.current;
          const scrollLeft = nextButton.offsetLeft - (container.clientWidth / 2) + (nextButton.offsetWidth / 2);
          
          container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    };

    autoScrollIntervalRef.current = setInterval(scrollNext, 3000);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [currentHighlight, autoScrollPaused]);

  useEffect(() => {
    if (expandedExp !== null) {
      const element = document.getElementById(`experience-${expandedExp}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' // Center the expanded card in viewport
          });
        }, 100); // Small delay to allow animation to start
      }
    }
  }, [expandedExp]);

  // Update user interaction tracker
  const handleUserInteraction = useCallback(() => {
    lastInteractionRef.current = Date.now();
  }, []);

  // Add interaction listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [handleUserInteraction]);

  // Enhanced scroll to card with better mobile support
  const scrollToCard = useCallback((index: number) => {
    const element = document.getElementById(`experience-${index}`);
    if (!element) return;

    const offset = (() => {
      if (window.innerWidth < 300) return -40;  // xxxs screens
      if (window.innerWidth < 640) return -60;  // sm screens
      return -50; // larger screens
    })();

    const elementRect = element.getBoundingClientRect();
    const targetScroll = window.pageYOffset + elementRect.top + offset;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });

    // Reset auto-scroll timer on manual navigation
    handleUserInteraction();
  }, [handleUserInteraction]);

  // Replace the existing navigation section with this new one
  const handleScrollShadows = useCallback(() => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      const threshold = 20;
      setShowLeftShadow(scrollLeft > threshold);
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - threshold);
    }
  }, []);

  const handleScroll = useCallback((direction: 'left' | 'right') => {
    if (navRef.current) {
      const container = navRef.current;
      const scrollAmount = container.clientWidth * 0.3;
      container.scrollTo({
        left: container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth'
      });
    }
  }, []);

  // Add effect for scroll shadows
  useEffect(() => {
    handleScrollShadows();
    
    const container = timelineRef.current;
    if (container) {
      const debouncedScroll = debounce(handleScrollShadows, 50);
      container.addEventListener('scroll', debouncedScroll);
      window.addEventListener('resize', debouncedScroll);
      
      return () => {
        container.removeEventListener('scroll', debouncedScroll);
        window.removeEventListener('resize', debouncedScroll);
      };
    }
  }, [handleScrollShadows]);

  const handleExpand = (index: number): void => {
    setExpandedExp(expandedExp === index ? null : index);
    scrollToCard(index);
  };

  // Navigation

  return (
    <section className="section-container space-y-8 relative backdrop-blur-sm pt-24 pb-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 animate-fade-in [mask-image:linear-gradient(to_bottom,black_20%,transparent_80%)]">
          {[...Array(40)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute h-0.5 w-0.5 animate-twinkle rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.2,
                transform: `scale(${Math.random() * 0.4 + 0.3})`
              }}
            >
              <div className={`absolute inset-0 rounded-full ${
                i % 3 === 0 ? 'bg-purple-300/40' : i % 3 === 1 ? 'bg-pink-300/40' : 'bg-purple-400/40'
              }`} />
            </div>
          ))}
        </div>
      </div>

      <div className="content-container relative">
        <div className="max-w-3xl mx-auto text-center px-2 xxxs:px-3 sm:px-4">
          {/* Badge with improved mobile sizing */}
          <div className="flex justify-center mb-4 xxxs:mb-5 xxs:mb-6 sm:mb-8 relative">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 xxs:gap-2 sm:gap-3 
                 px-2 xxs:px-3 sm:px-4 
                 py-1 xxs:py-1.5 sm:py-2 
                 rounded-full 
                 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 
                 border border-purple-500/20 backdrop-blur-md 
                 hover:bg-purple-500/10 hover:border-purple-500/30 transition-colors"
            >
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                <div className="relative rounded-full bg-emerald-400 w-2 h-2" />
              </div>
              <span className="text-sm text-gray-200 font-medium">Professional Journey</span>
            </motion.div>
          </div>

          {/* Title with fluid typography */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl xxxs:text-3xl xxs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-3 xxxs:mb-4 sm:mb-5"
          >
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-pink-300 to-purple-200 
                             animate-gradient-text [text-shadow:_0_1px_20px_rgb(236,72,153,0.1)]">
                Experience & Skills
              </span>
              <span className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-2xl opacity-50 animate-pulse-slow" />
            </span>
          </motion.h2>

          {/* Description with improved readability */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[11px] xxxs:text-xs xxs:text-sm sm:text-base lg:text-lg xl:text-xl 
                     text-gray-300/90 leading-relaxed max-w-2xl mx-auto mb-6 xxxs:mb-7 sm:mb-8"
          >
            Transforming visions into digital reality through innovative solutions and creative excellence.
          </motion.p>
        </div>
      </div>

      {/* Enhanced Timeline Navigation */}
      <motion.div 
        variants={timelineNavVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-[64px] z-30 w-full backdrop-blur-md 
                    bg-gradient-to-b from-black/95 via-black/90 to-transparent"
      >
      
        
        <div className="relative w-full max-w-[1000px] mx-auto px-2 xxxs:px-3 sm:px-4">
            <div className="flex items-center gap-2">
              {/* Left Navigation Button */}
              <motion.button
                onClick={() => handleScroll('left')}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full 
                         bg-zinc-900/50 border border-purple-500/10 hover:border-purple-500/30
                         text-gray-400 hover:text-purple-300"
                animate={{ opacity: showLeftShadow ? 1 : 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              {/* Navigation Container */}
              <div 
                ref={navRef}
                className="w-full max-w-full overflow-x-auto scroll-smooth no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onScroll={handleScrollShadows}
              >
                <div className="flex items-center gap-3 min-w-max px-2">
                  {experiences.map((exp, index) => (
                    <motion.button
                      key={exp.role}
                      onClick={() => setExpandedExp(index)}
                      className={`px-4 py-2.5 rounded-xl transition-all duration-200 
                               flex items-center gap-2 text-sm whitespace-nowrap
                               ${expandedExp === index 
                                 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                                 : 'bg-zinc-900/50 text-gray-400 hover:text-gray-300'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {exp.role}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Right Navigation Button */}
              <motion.button
                onClick={() => handleScroll('right')}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full 
                         bg-zinc-900/50 border border-purple-500/10 hover:border-purple-500/30
                         text-gray-400 hover:text-purple-300"
                animate={{ opacity: showRightShadow ? 1 : 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
      </motion.div>

      {/* Experience Cards with improved spacing */}
      <div className="relative mt-3 xxxs:mt-4 space-y-3 xxxs:space-y-4 sm:space-y-6 
                      px-1 xxxs:px-1 xxs:px-1.5 sm:px-6 lg:px-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            id={`experience-${index}`}
            variants={experienceCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={`
              group relative
              ${expandedExp === index ? 'shadow-[0_0_20px_-5px_rgba(168,85,247,0.2)]' : ''}
            `}
          >
            {/* Card content with improved padding */}
            <motion.div
              id={`experience-panel-${index}`}
              className={`
                group/card relative overflow-hidden p-3 xxxs:p-4 sm:p-6 lg:p-8
                transform transition-all duration-500 glass rounded-xl
                ${expandedExp === index 
                  ? 'ring-1 ring-purple-500/20 bg-gradient-to-br from-purple-500/3 to-pink-500/3 shadow-sm shadow-purple-500/5' 
                  : 'shadow-sm shadow-purple-500/5'
                }
                hover:shadow-md hover:shadow-purple-500/10
                hover:-translate-y-1
              `}
            >
              {/* Background effects */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_400px_at_50%_-100px,_#3B0764,_transparent)]" />
                {[...Array(15)].map((_, i) => (
                  <div
                    key={`star-${i}`}
                    className="absolute animate-star"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      width: `${Math.random() * 2 + 1}px`,
                      height: `${Math.random() * 2 + 1}px`,
                      backgroundColor: i % 3 === 0 ? '#EC4899' : '#A855F7',
                      opacity: Math.random() * 0.3 + 0.1,
                      filter: 'blur(0.5px)',
                      animationDelay: `${Math.random() * 4}s`,
                      animationDuration: `${Math.random() * 2 + 2}s`,
                      zIndex: Math.floor(Math.random() * 3)
                    }}
                  />
                ))}
              </div>

              {/* Enhanced hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(closest-side_at_50%_0%,_var(--tw-gradient-stops))] from-purple-500/3 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(closest-side_at_0%_50%,_var(--tw-gradient-stops))] from-pink-500/3 via-transparent to-transparent" />
              </div>

              {/* Card content wrapper with fixed z-index */}
              <div className="relative z-1">
                <motion.div className="flex flex-col gap-3 xxxs:gap-4 sm:gap-6">
                  {/* Company Badge and Expand Button Layout */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full 
                                bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 
                                border border-purple-500/10 backdrop-blur-sm
                                transition-all duration-300
                                hover:border-purple-500/20"
                    >
                      <span className="text-purple-300 text-sm sm:text-base font-medium">{exp.company}</span>
                    </div>

                    {/* Fixed Expand Button */}
                    <button
                      onClick={() => handleExpand(index)}
                      className="relative z-50 p-3 rounded-xl
                               bg-gradient-to-br from-purple-500/10 to-pink-500/10
                               hover:from-purple-500/20 hover:to-pink-500/20
                               transform transition-all duration-300
                               hover:scale-110 group/btn
                               focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                      aria-label={expandedExp === index ? "Collapse details" : "Expand details"}
                    >
                      <motion.div
                        animate={{ 
                          rotate: expandedExp === index ? 180 : 0,
                          scale: expandedExp === index ? 1.1 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 transition-colors duration-300
                                              group-hover/btn:text-purple-400" />
                      </motion.div>
                    </button>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r 
                                     from-purple-400 via-pink-400 to-purple-400">
                      {exp.role}
                    </span>
                  </h3>

                  {/* Updated metadata section */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base">
                    <span className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4 text-purple-400" />
                      {exp.period}
                    </span>
                  </div>

                  {/* Refined skills pills */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.skills?.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg
                                 bg-gradient-to-br from-purple-500/5 to-pink-500/5
                                 border border-purple-500/10 text-purple-300
                                 transition-all duration-300
                                 hover:border-purple-500/20
                                 hover:shadow-sm hover:shadow-purple-500/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Description text with fluid scaling */}
                  <p className="text-[13px] xxs:text-sm sm:text-base lg:text-lg xl:text-xl 
                             text-gray-200 leading-relaxed tracking-wide">
                    {exp.description}
                  </p>

                  {/* Enhanced Expandable Content */}
                  <motion.div
                    variants={expandAnimationSequence}
                    initial="initial"
                    animate={expandedExp === index ? "expanded" : "initial"}
                    className="overflow-hidden"
                  >
                    <div className="space-y-6">
                      {/* Enhanced Achievements with Microinteractions */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 
                                     bg-clip-text text-transparent">
                          Key Achievements
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                          {exp.achievements.map((achievement, i) => (
                            <motion.div
                              key={i}
                              custom={i}
                              variants={achievementVariants}
                              className="group/achievement p-3 sm:p-4 rounded-xl
                                       bg-gradient-to-br from-purple-500/5 to-pink-500/5
                                       border border-purple-500/10 
                                       transition-all duration-300
                                       hover:border-purple-500/20
                                       hover:shadow-sm hover:shadow-purple-500/10"
                            >
                              <div className="relative overflow-hidden">
                                <p className="text-gray-300 text-sm sm:text-base relative z-1 transform transition-transform duration-300
                                            group-hover/achievement:translate-x-1">
                                  {achievement}
                                </p>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/5
                                              transform translate-x-full group-hover/achievement:translate-x-0
                                              transition-transform duration-500" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Enhanced Highlights Section */}
                      {exp.highlights && (
                        <div className="space-y-4 mt-6">
                          <h4 className="text-lg font-semibold text-purple-400">
                            Key Highlights
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {exp.highlights.map((highlight, i) => (
                              <div
                                key={i}
                                className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10
                                         border border-purple-500/20
                                         transition-all duration-300
                                         hover:shadow-sm hover:shadow-purple-500/20"
                              >
                                <div className="flex items-start gap-4">
                                  <div className="p-2 rounded-lg bg-purple-500/20 
                                                ring-1 ring-purple-500/30">
                                    {highlight.icon}
                                  </div>
                                  <div>
                                    <h5 className="font-semibold mb-2 text-purple-300">
                                      {highlight.title}
                                    </h5>
                                    <p className="text-[11px] xxs:text-xs sm:text-sm lg:text-base xl:text-lg 
                                               text-gray-300">
                                      {highlight.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Enhanced card background effects */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] via-black/0 to-pink-500/[0.02] 
                              opacity-0 group-hover/card:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] group-hover/card:opacity-[0.07] 
                              transition-all duration-700" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;