import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Brain, Puzzle, Rocket, Network, Code, Target, Users, Shield, Zap, Compass, Telescope, SquareDashedBottomCodeIcon, 
         Lightbulb, Workflow, Microscope, Sparkles, Binary, CircleEllipsis, ChevronLeft, ChevronRight, GitBranch, Infinity as InfinityIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// categories and traits data
const mindsetCategories = [
	{
		id: 'versatility',
		title: 'Versatile Thinking',
		description: 'Adapting and evolving across domains',
		traits: [
			{
				icon: <Compass className="w-6 h-6" />,
				title: "Cross-Domain Mastery",
				description: "Bridging multiple disciplines to create comprehensive solutions.",
				details: "Combining technical expertise with creative problem-solving.",
				stats: [
					{ value: "5+", label: "Domains Mastered" },
					{ value: "80%", label: "Cross-skill Integration" }
				]
			},
			{
				icon: <Telescope className="w-6 h-6" />,
				title: "Adaptive Vision",
				description: "Identifying opportunities across different fields and technologies.",
				details: "Staying ahead of trends while maintaining practical grounding.",
				stats: [
					{ value: "10+", label: "Technologies Integrated" },
					{ value: "3", label: "Industry Pivots" }
				]
			},
			{
				icon: <SquareDashedBottomCodeIcon className="w-6 h-6" />,
				title: "Rapid Adaptation",
				description: "Quick learning and implementation of new technologies.",
				details: "Converting challenges into opportunities through agile thinking.",
				stats: [
					{ value: "48h", label: "Avg. Learning Sprint" },
					{ value: "90%", label: "Implementation Rate" }
				]
			}
		],
		color: 'from-violet-400 to-purple-400'
	},

// Philosophy and approach categories
	{
		id: 'philosophy',
		title: 'Creative Philosophy',
		description: 'Core principles that drive innovation and problem-solving',
		traits: [
			{
				icon: <Brain className="w-6 h-6" />,
				title: "Learn by Building",
				description: "Transform concepts into reality through hands-on experimentation and iterative development.",
				details: "Every project is a learning laboratory where theory meets practice.",
				stats: [
					{ value: "300+", label: "Hours of Learning" },
					{ value: "15+", label: "New Skills Mastered" }
				]
			},
			{
				icon: <Network className="w-6 h-6" />,
				title: "Pattern Recognition",
				description: "Identify connections between different domains to create unique solutions.",
				details: "Cross-pollinating ideas from various fields for innovative approaches.",
				stats: [
					{ value: "40+", label: "Projects Connected" },
					{ value: "3", label: "Industries Bridged" }
				]
			},
			{
				icon: <Puzzle className="w-6 h-6" />,
				title: "Systematic Solutions",
				description: "Transform complex challenges into clear, actionable frameworks.",
				details: "Breaking down problems into manageable, systematic solutions.",
				stats: [
					{ value: "85%", label: "Efficiency Increase" },
					{ value: "20+", label: "Frameworks Created" }
				]
			}
		],
		color: 'from-purple-400 to-pink-400'
	},
	{
		id: 'approach',
		title: 'Technical Approach',
		description: 'Methodologies and strategies in development',
		traits: [
			{
				icon: <Code className="w-6 h-6" />,
				title: "Clean Architecture",
				description: "Build scalable systems through solid principles and clean code practices.",
				details: "Focus on modularity, testing, and future-proof design patterns.",
				stats: [
					{ value: "95%", label: "Code Quality" },
					{ value: "40%", label: "Maintenance Time Reduced" }
				]
			},
			{
				icon: <Shield className="w-6 h-6" />,
				title: "Best Practices",
				description: "Implement industry standards and security-first development.",
				details: "Ensuring robust, secure, and maintainable solutions.",
				stats: [
					{ value: "100%", label: "Security Compliance" },
					{ value: "0", label: "Major Incidents" }
				]
			},
			{
				icon: <Zap className="w-6 h-6" />,
				title: "Performance Focus",
				description: "Optimize for speed, efficiency, and user experience.",
				details: "Creating lightning-fast, responsive applications.",
				stats: [
					{ value: "2s", label: "Avg. Load Time" },
					{ value: "60%", label: "Performance Boost" }
				]
			}
		],
		color: 'from-blue-400 to-indigo-400'
	},
	{
		id: 'leadership',
		title: 'Leadership Style',
		description: 'Guiding principles in team and project management',
		traits: [
			{
				icon: <Target className="w-6 h-6" />,
				title: "Goal-Oriented",
				description: "Focus on clear objectives and measurable outcomes.",
				details: "Driving projects with purpose and direction.",
				stats: [
					{ value: "95%", label: "Project Success Rate" },
					{ value: "12", label: "Team Goals Achieved" }
				]
			},
			{
				icon: <Users className="w-6 h-6" />,
				title: "Collaborative Growth",
				description: "Foster an environment of shared learning and development.",
				details: "Building strong, skilled, and motivated teams.",
				stats: [
					{ value: "4", label: "Team Members Mentored" },
					{ value: "30%", label: "Team Skill Growth" }
				]
			},
			{
				icon: <Rocket className="w-6 h-6" />,
				title: "Innovation Driver",
				description: "Encourage creative thinking and calculated risk-taking.",
				details: "Pushing boundaries while maintaining stability.",
				stats: [
					{ value: "5", label: "New Processes Implemented" },
					{ value: "25%", label: "Efficiency Gained" }
				]
			}
		],
		color: 'from-green-400 to-emerald-400'
	},
	{
		id: 'innovation',
		title: 'Innovation Mindset',
		description: 'Pushing boundaries and exploring new possibilities',
		traits: [
			{
				icon: <Lightbulb className="w-6 h-6" />,
				title: "Creative Problem Solving",
				description: "Approaching challenges with innovative and unconventional solutions.",
				details: "Combining analytical thinking with creative approaches.",
				stats: [
					{ value: "85%", label: "Problem Resolution Rate" },
					{ value: "12+", label: "Innovation Awards" }
				]
			},
			{
				icon: <Workflow className="w-6 h-6" />,
				title: "Process Innovation",
				description: "Optimizing and reinventing workflows for maximum efficiency.",
				details: "Creating streamlined, efficient processes.",
				stats: [
					{ value: "40%", label: "Efficiency Increase" },
					{ value: "8", label: "Processes Reimagined" }
				]
			},
			{
				icon: <Microscope className="w-6 h-6" />,
				title: "Research & Development",
				description: "Continuously exploring new technologies and methodologies.",
				details: "Staying ahead of industry trends through constant learning.",
				stats: [
					{ value: "20+", label: "Research Projects" },
					{ value: "15", label: "New Tech Adopted" }
				]
			}
		],
		color: 'from-amber-400 to-orange-400'
	},
	{
		id: 'growth',
		title: 'Growth & Learning',
		description: 'Continuous development and skill expansion',
		traits: [
			{
				icon: <Binary className="w-6 h-6" />,
				title: "Digital Adaptation",
				description: "Rapidly learning and implementing new digital technologies.",
				details: "Mastering emerging tools and platforms.",
				stats: [
					{ value: "30+", label: "Tools Mastered" },
					{ value: "95%", label: "Digital Proficiency" }
				]
			},
			{
				icon: <Sparkles className="w-6 h-6" />,
				title: "Skill Synthesis",
				description: "Combining diverse skills to create unique solutions.",
				details: "Bridging multiple disciplines effectively.",
				stats: [
					{ value: "8+", label: "Fields Integrated" },
					{ value: "20+", label: "Cross-skill Projects" }
				]
			},
			{
				icon: <CircleEllipsis className="w-6 h-6" />,
				title: "Continuous Learning",
				description: "Dedicated to ongoing professional development.",
				details: "Regular upskilling and knowledge expansion.",
				stats: [
					{ value: "500+", label: "Learning Hours" },
					{ value: "12", label: "Certifications" }
				]
			}
		],
		color: 'from-rose-400 to-red-400'
	},
	{
		id: 'agile',
		title: 'Agile Mindset',
		description: 'Embracing change and continuous improvement',
		traits: [
			{
				icon: <GitBranch className="w-6 h-6" />,
				title: "Adaptive Planning",
				description: "Flexible approach to project planning and execution.",
				details: "Balancing structure with adaptability for optimal outcomes.",
				stats: [
					{ value: "30%", label: "Efficiency Gain" },
					{ value: "90%", label: "Sprint Success Rate" }
				]
			},
      {
        icon: <InfinityIcon className="w-6 h-6" />,
				title: "Continuous Improvement",
				description: "Regular refinement of processes and methods.",
				details: "Implementing iterative improvements through feedback loops.",
				stats: [
					{ value: "25+", label: "Process Improvements" },
					{ value: "40%", label: "Quality Increase" }
				]
			},
			{
				icon: <Users className="w-6 h-6" />,
				title: "Collaborative Synergy",
				description: "Fostering team collaboration and shared responsibility.",
				details: "Building strong cross-functional relationships.",
				stats: [
					{ value: "100%", label: "Team Engagement" },
					{ value: "45%", label: "Productivity Boost" }
				]
			}
		],
		color: 'from-sky-400 to-blue-400'
	}
];

// Update cardVariants for smoother transitions
const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 10, // Reduced distance
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1], // Custom easing
    }
  }
};

// Simpler trait card animation
const traitCardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Update stat animation config
const animatedStatSpringConfig = {
  type: "tween",
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1]
};

// AnimatedStat component
const AnimatedStat = ({ value, label }: { value: string; label: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { setIsVisible(true); }, []);

  return (
    <motion.div 
      className="group relative p-2.5 sm:p-4 rounded-lg bg-purple-950/30 hover:bg-purple-900/40 
                border border-purple-500/10 hover:border-purple-500/20
                transition-all duration-200 ease-out shadow-lg"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={animatedStatSpringConfig}
    >
      <div className="space-y-1.5 sm:space-y-2">
        <motion.div 
          className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.div>
        <div className="text-xs sm:text-sm text-gray-300 group-hover:text-purple-200 transition-colors duration-200 font-medium">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

// Main MindsetSection component
// This component displays the mindset section with categories and traits
const MindsetSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('versatility');
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  // Update the handleScrollShadows function
  const handleScrollShadows = useCallback(() => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      const threshold = 20;
      
      setShowLeftShadow(scrollLeft > threshold);
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - threshold);
    }
  }, []);

  // Update navigation scroll behavior
  const handleScroll = useCallback((direction: 'left' | 'right') => {
    if (navRef.current) {
      const container = navRef.current;
      const scrollAmount = container.clientWidth * 0.3;
      const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });

      requestAnimationFrame(() => {
        handleScrollShadows();
      });
    }
  }, [handleScrollShadows]);

  // Update the active category scroll
  const scrollToActiveCategory = useCallback(() => {
    if (buttonRefs.current[mindsetCategories.findIndex(c => c.id === activeCategory)] && navRef.current) {
      const button = buttonRefs.current[mindsetCategories.findIndex(c => c.id === activeCategory)];
      const container = navRef.current;
      if (button && container) {
        const scrollLeft = button.offsetLeft - (container.clientWidth / 2) + (button.clientWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });

        requestAnimationFrame(() => {
          handleScrollShadows();
        });
      }
    }
  }, [activeCategory, handleScrollShadows]);

  // Update scroll effect and cleanup
  useEffect(() => {
    scrollToActiveCategory();
  }, [activeCategory, scrollToActiveCategory]);

  useEffect(() => {
    handleScrollShadows();
    
    const container = navRef.current;
    if (container) {
      const debouncedScroll = debounce(() => handleScrollShadows(), 50);
      container.addEventListener('scroll', debouncedScroll);
      window.addEventListener('resize', debouncedScroll);
      
      return () => {
        container.removeEventListener('scroll', debouncedScroll);
        window.removeEventListener('resize', debouncedScroll);
      };
    }
  }, [handleScrollShadows]);

  // Add debounce utility
  const debounce = <F extends (...args: unknown[]) => unknown>(
    fn: F,
    delay: number
  ) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<F>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  // Update navigation section in render
  return (
    <div className="section-container space-y-6 xxs:space-y-4 sm:space-y-10 relative backdrop-blur-sm 
         overflow-x-hidden max-w-[100vw]">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
				{/* Star field */}
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

      {/* Header Content Container */}
      <div className="content-container animate-fade-in relative px-4 sm:px-6 lg:px-8 
                      max-w-[1440px] mx-auto">
        {/* Status Badge */}
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-12">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full 
                      bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 
                      hover:from-purple-500/20 hover:via-pink-500/20 hover:to-purple-500/20
                      border border-purple-500/20 backdrop-blur-md shadow-lg
                      transition-all duration-500"
          >
            <div className="relative w-2.5 h-2.5">
              <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
              <div className="relative rounded-full bg-emerald-400 w-2.5 h-2.5" />
            </div>
            <span className="text-xs xxs:text-sm sm:text-base text-gray-300 font-medium">Technical Philosophy & Approach</span>
          </motion.div>
        </div>

        {/* Vision Statement */}
        <div className="text-center space-y-6 sm:space-y-8 max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight"
          >
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r 
                              from-purple-400 via-pink-400 to-purple-400 animate-gradient-text">
                "The best solutions emerge from the intersection of technical excellence, 
                creative thinking, and a deep understanding of real-world needs."
              </span>
              <span className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                            blur-xl opacity-50 animate-pulse-slow" />
            </span>
          </motion.blockquote>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium leading-relaxed"
          >
            Building bridges between technical excellence and creative innovation
          </motion.p>
        </div>
      </div>

      {/* Navigation container - Updated for consistent height */}
      <div className="relative w-full max-w-[1440px] mx-auto mb-6 sm:mb-8 md:mb-10 px-4 sm:px-6 lg:px-8">
        <div className="flex items-stretch h-full gap-2"> {/* Changed: items-center to items-stretch */}
          {/* Left Navigation Button */}
          <div className="relative flex items-center">
            <motion.div
              className="absolute left-0 w-24 h-full bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: showLeftShadow ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.button
              onClick={() => handleScroll('left')}
              className="hidden md:flex items-center justify-center w-8 h-full rounded-xl {/* Changed: rounded-full to rounded-xl and added h-full */}
                       bg-zinc-900/50 border border-purple-500/10 hover:border-purple-500/30
                       text-gray-400 hover:text-purple-300 transition-all duration-200
                       flex-shrink-0 z-20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: showLeftShadow ? 1 : 0.5 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Navigation Items - Updated for consistent height */}
          <div 
            ref={navRef}
            className="w-full max-w-full overflow-x-auto no-scrollbar scroll-smooth h-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={handleScrollShadows}
          >
            <div className="flex justify-start gap-3 min-w-full h-full py-2"> {/* Added: h-full */}
              {mindsetCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  ref={el => buttonRefs.current[index] = el}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2.5 rounded-xl 
                            transition-all duration-200 ease-out
                            flex items-center gap-2 text-sm whitespace-nowrap
                            focus:outline-none focus:ring-2 focus:ring-purple-500/50
                            min-w-fit h-full {/* Added: h-full */}
                            ${activeCategory === category.id 
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-lg shadow-purple-500/10' 
                              : 'bg-zinc-900/50 text-gray-400 border border-purple-500/10 hover:border-purple-500/30'}`}
                >
                  {React.cloneElement(category.traits[0].icon, { 
                    className: "w-4 h-4 transition-transform duration-200",
                    'aria-hidden': true 
                  })}
                  {category.title}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Navigation Button - Updated for consistent height */}
          <div className="relative flex items-center">
            <motion.div
              className="absolute right-0 w-24 h-full bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: showRightShadow ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.button
              onClick={() => handleScroll('right')}
              className="hidden md:flex items-center justify-center w-8 h-full rounded-xl {/* Changed: rounded-full to rounded-xl and added h-full */}
                       bg-zinc-900/50 border border-purple-500/10 hover:border-purple-500/30
                       text-gray-400 hover:text-purple-300 transition-all duration-200
                       flex-shrink-0 z-20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: showRightShadow ? 1 : 0.5 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.div
          key={activeCategory}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full rounded-2xl sm:rounded-3xl bg-zinc-900/80 backdrop-blur-md
                     border border-purple-500/10 hover:border-purple-500/20 
                     relative overflow-hidden transition-all duration-300
                     shadow-xl shadow-purple-500/5 transform-gpu"
        >
          <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            <motion.div
              role="tabpanel"
              id={`panel-${activeCategory}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                        gap-3 sm:gap-3 md:gap-3 lg:gap-3 w-full
                        [&>*:nth-child(3)]:sm:col-span-2 lg:[&>*:nth-child(3)]:col-span-1"
            >
              {mindsetCategories
                .find(c => c.id === activeCategory)
                ?.traits.map((trait, index) => (
                  <motion.div
                    key={index}
                    variants={traitCardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.05 }}
                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl 
                              p-4
                              border border-purple-500/20
                              hover:border-purple-500/30
                              transition-all duration-200
                              backdrop-blur-sm
                              flex flex-col"
                  >
                    <div className="relative z-10 space-y-4 sm:space-y-5 flex-1 flex flex-col">
                      {/* Icon container */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl 
                                    bg-gradient-to-br from-purple-600/30 to-pink-600/30 
                                    flex items-center justify-center shadow-lg
                                    flex-shrink-0">
                        {React.cloneElement(trait.icon, { 
                          className: "w-5 h-5 sm:w-6 sm:h-6 text-purple-200 group-hover:text-white transition-colors" 
                        })}
                      </div>
                      
                      {/* Content container */}
                      <div className="space-y-2 sm:space-y-3 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-purple-100 
                                     bg-clip-text text-transparent tracking-tight">
                          {trait.title}
                        </h3>
                        <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-sm sm:text-base">
                          {trait.description}
                        </p>
                        <p className="text-purple-300/90 text-xs sm:text-sm font-medium">
                          {trait.details}
                        </p>
                      </div>
                      
                      {/* Stats grid */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 mt-auto">
                        {trait.stats.map((stat, i) => (
                          <AnimatedStat key={i} value={stat.value} label={stat.label} />
                        ))}
                      </div>
                    </div>
                    {/* Background Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Footer with improved spacing */}
        <motion.div className="mt-8 sm:mt-12 md:mt-16">
          <div className="flex flex-col items-center">
            <p className="text-gray-500">© 2025 Amar Zuga. All rights reserved.</p>
            <div className="flex space-x-4 mt-2">
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MindsetSection;