import React, { useState, useMemo, useCallback, memo, useEffect, useRef, Suspense, useTransition } from 'react';
import { Code, Palette, Layout, Monitor, ChevronLeft, ChevronRight, HeadsetIcon, ArrowUpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { debounce } from '../utils/performance';


interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list';
  index: number;
}

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  style?: React.CSSProperties;
}

export const SectionCard = memo<SectionCardProps>(({ 
  children, 
  className = '',
  animated = true,
  style = {} 
}) => {
  return (
    <div 
      className={`
        card-enhanced group
        backdrop-blur-lg bg-white/5 border border-white/10
        hover:border-purple-500/30 hover:bg-white/10
        transition-transform duration-300 ease-out
        ${animated ? 'animate-fade-in' : ''}
        ${className}
      `}
      style={{
        willChange: 'transform',
        ...style
      }}
    >
      {children}
    </div>
  );
});

// Update paths and constants
const IMAGE_PATHS = {
  bedroom: '/imgs/Bedroom.jpg',
  spaceship: '/imgs/Spaceship.jpg',
  webIde: '/imgs/WebIDE.jpg',
  emailTemplates: '/imgs/EmailTemplates.jpg',
  portfolio: '/imgs/Portfolio.jpg',
  sportswear: '/imgs/Sportswear.jpg',
  assets3d: '/imgs/3D-Assets.jpg',
  bottles: '/imgs/Bottles.jpg',
  fallback: '/imgs/fallback.jpg'
} as const;

// Simplify to use a single fallback image
const FALLBACK_IMAGE = './imgs/fallback.jpg';

// Update card dimensions
const CARD_DIMENSIONS = {
  grid: {
    width: '100%',
    height: 'auto',
    minHeight: '520px',
    imageHeight: '280px'
  },
  list: {
    width: '100%',
    height: '280px',
    imageWidth: '320px', // Made consistent
  }
} as const;

  interface Project {
    title: string;
    description: string;
    tech: string[];
    image: string;
    // Update category to allow array
    category: string | string[];
    longDescription: string;
    link?: string;
  }

  const projects: Project[] = [
    {
      title: "Neue AI Web IDE",
      description: "A modern web-based IDE for AI development and prototyping.",
      longDescription: "Built a full-featured web IDE for AI workflows, featuring code editing, live collaboration, integrated AI model runners, and visualization tools. Designed for rapid prototyping and seamless deployment.",
      tech: ["React", "TypeScript", "WebSockets", "Monaco Editor", "Node.js", "AI Integration"],
      image: IMAGE_PATHS.webIde,
      category: ["web", "ui"],
      link: "",
    },
    {
      title: "Personal Portfolio Website",
      description: "Modern React-based portfolio showcasing professional work and skills",
      longDescription: "Built from ground up using React, TypeScript, and Tailwind CSS. Features smooth animations, responsive design, and dynamic content management. Implements modern development practices and performance optimization.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "Responsive Design"],
      image: IMAGE_PATHS.portfolio,
      category: ["web", "ui"],
      link: "https://amarsportfolio.fly.dev/",
    },
    {
      title: "Customer Support Email Templates",
      description: "Streamlined customer support operations through automated email templates and shortcuts",
      longDescription: "Developed and implemented comprehensive email templates and keyboard shortcuts system for the support team during high-volume periods. Reduced response time and maintained quality during company transition.",
      tech: ["Email Templates", "Keyboard Shortcuts", "Process Optimization", "Customer Communication", "Quality Assurance", "Team Training"],
      image: IMAGE_PATHS.emailTemplates,
      category: "support",
      link: "",
    },
    {
      title: "Women's Sportswear Collection",
      description: "Modern gym and activewear designs for women",
      longDescription: "Designed a collection of functional and stylish sportswear focused on comfort and performance. Includes workout sets, leggings, and training tops.",
      tech: ["Fashion Design", "Textile Selection", "Pattern Making", "Adobe Illustrator", "Product Design", "Technical Drawing"],
      image: IMAGE_PATHS.sportswear,
      category: ["design", "digital"], // Added 'digital' category
      link: "",
    },
    {
      title: "3D Model: The Bedroom",
      description: "Photorealistic 3D interior design visualization of a modern bedroom.",
      longDescription: "Created a detailed 3D model of a contemporary bedroom space, focusing on lighting, textures, and atmospheric elements. Designed for interior visualization and architectural presentation.",
      tech: ["Blender", "Cycles", "Interior Design", "Lighting", "Material Design", "Architectural Visualization"],
      image: IMAGE_PATHS.bedroom,
      category: "design",
      link: "",
    },
    {
      title: "Spaceship 3D Model: Nebula",
      description: "Futuristic spaceship design with detailed interior and exterior visualization.",
      longDescription: "Created a highly detailed 3D model of a next-generation spacecraft, featuring innovative design elements, realistic texturing, and atmospheric lighting. The model includes both exterior hull details and interior command deck layouts.",
      tech: [
        "Blender",
        "Cycles",
        "3D Modeling",
        "Sci-fi Design",
        "Hard Surface Modeling",
        "Lighting Composition"
      ],
      image: IMAGE_PATHS.spaceship,
      category: "design",
      link: "",
    },
    {
      title: "Product Design: Glass Bottles",
      description: "Modern glass bottle designs for luxury beverages",
      longDescription: "Created a series of elegant glass bottle designs, combining modern aesthetics with practical functionality. Focused on creating unique shapes while maintaining manufacturability and brand identity.",
      tech: [
        "Blender",
        "Product Design",
        "Glass Materials",
        "Lighting Design",
        "Material Design",
        "Brand Identity"
      ],
      image: IMAGE_PATHS.bottles,
      category: ["design", "digital"], // Added 'digital' category
      link: "",
    },
    {
      title: "3D Assets Collection",
      description: "Collection of various 3D assets and models for games and visualization.",
      longDescription: "Developed a diverse collection of high-quality 3D assets including props, environments, and characters. All assets are optimized for real-time rendering and follow industry standards.",
      tech: ["Blender", "Maya", "ZBrush", "Substance Painter", "UV Mapping", "PBR Materials"],
      image: IMAGE_PATHS.assets3d,
      category: "design",
      link: "",
    },
  ];

// Update project categories to match the order of importance
  const projectCategories = [
    {
      id: 'web',
      name: 'Web Development',
      icon: <Code className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Websites and web applications'
    },
    {
      id: 'design',
      name: 'Design & Branding',
      icon: <Palette className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Visual identity and branding projects'
    },
    {
      id: 'support',
      name: 'Customer Support',
      icon: <HeadsetIcon className="w-6 h-6" />,
      color: 'from-teal-500 to-emerald-500',
      description: 'Customer service and support projects'
    },
    {
      id: 'ui',
      name: 'UI/UX Design',
      icon: <Layout className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      description: 'User interface and experience design'
    },
    {
      id: 'digital',
      name: 'Digital Marketing',
      icon: <Monitor className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-500',
      description: 'Marketing and social media content'
    }
  ];

// Reduce projects per page for faster initial load
  const projectsPerPage = 4;

// Add interfaces and helper functions
  interface HeaderWithFiltersProps {
    selectedCategory?: string; // Make optional since not all uses need it
    setSelectedCategory?: (category: string) => void;
    viewMode?: 'grid' | 'list'; // Make optional
    setViewMode?: (mode: 'grid' | 'list') => void;
    setCurrentPage?: (page: number) => void;
  }

  interface ProjectCardProps {
    project: Project;
    viewMode: 'grid' | 'list';
    index: number;
  }


// Memoize HeaderWithFilters component

interface HeaderProps {
  title: string;
  description: string;
}

// Update Header component with improved desktop hierarchy
const Header = memo(({ title, description }: HeaderProps) => (
  <div className="flex flex-col items-center text-center pb-2">
    {/* Badge with consistent mobile sizing */}
    <div className="flex justify-center mb-4 xxxs:mb-5 xxs:mb-6 sm:mb-8">
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
        <span className="text-xs xxs:text-sm sm:text-base text-gray-300 font-medium">
          Featured workflow section
        </span>
      </motion.div>
    </div>

    <div className="space-y-6 max-w-4xl mx-auto mb-8">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl xxxs:text-3xl xxs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-3 xxxs:mb-4 sm:mb-5
          md:text-[2.7rem] md:leading-tight lg:text-[3.2rem] lg:leading-[1.1] xl:text-[3.7rem] xl:leading-[1.08]
          md:drop-shadow-[0_2px_16px_rgba(168,85,247,0.10)]"
      >
        <span className="relative inline-block">
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-pink-300 to-purple-200 
                          animate-gradient-text [text-shadow:_0_1px_20px_rgb(236,72,153,0.1)]">
            {title}
          </span>
          <span className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 
                        blur-2xl opacity-50 animate-pulse-slow" />
        </span>
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-[11px] xxxs:text-xs xxs:text-sm sm:text-base lg:text-lg xl:text-xl 
                   text-gray-300/90 leading-relaxed max-w-2xl mx-auto
                   md:text-lg md:leading-relaxed lg:text-xl xl:text-2xl
                   md:mt-2"
      >
        {description}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[10px] xxs:text-xs sm:text-sm text-purple-300/60 italic
          md:text-base md:mt-2"
      >
        Use the categories below to explore or switch to list view for a different perspective →
      </motion.p>
    </div>
  </div>
));

// Add new animation variants for navigation
const tabVariants = {
  initial: { opacity: 0, y: -10, scale: 0.95 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.03,
      duration: 0.15,
      ease: [0.2, 0, 0.3, 1]
    }
  }),
  hover: { 
    scale: 1.03,
    y: -1,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

// Update CategoryNavigation component
const CategoryNavigation = memo(({
  selectedCategory,
  setSelectedCategory,
  setCurrentPage
}: Required<HeaderWithFiltersProps>) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  // Add handleScrollShadows function
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
      const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }, []);

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

  return (
    <div className="sticky top-[64px] z-30 w-full backdrop-blur-md 
                    bg-gradient-to-b from-black/95 via-black/90 to-transparent">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
      
      <div className="section-container">
        <div className="relative w-full max-w-[1000px] mx-auto py-3 xxxs:py-4 sm:py-5">
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
              <div className="flex justify-start gap-3 min-w-max px-2">
                {/* All Projects Button */}
                <motion.button
                  onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }}
                  className={`px-4 py-2.5 rounded-xl transition-all duration-200 
                             flex items-center gap-2 text-sm whitespace-nowrap
                             ${selectedCategory === 'all' 
                               ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                               : 'bg-zinc-900/50 text-gray-400 hover:text-gray-300'}`}
                  variants={tabVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  All Projects
                </motion.button>

                {/* Category Buttons */}
                {projectCategories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => { setSelectedCategory(category.id); setCurrentPage(1); }}
                    className={`px-4 py-2.5 rounded-xl transition-all duration-200 
                                 flex items-center gap-2 text-sm whitespace-nowrap
                                 ${selectedCategory === category.id 
                                   ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                                   : 'bg-zinc-900/50 text-gray-400 hover:text-gray-300'}`}
                    variants={tabVariants}
                    custom={index}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {React.cloneElement(category.icon, { 
                      className: `w-4 h-4 transition-transform duration-300 ${
                        selectedCategory === category.id ? 'scale-110' : ''
                      }` 
                    })}
                    {category.name}
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
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" />
    </div>
  );
});

// Remove this section as it's already handled in the ProjectsSection component

// Add lazy loading component
  const renderCategories = (categories: string | string[]) => {
    const categoryArray = Array.isArray(categories) ? categories : [categories];
    return categoryArray.map(categoryId => {
      const category = projectCategories.find(c => c.id === categoryId);
      if (!category) return null;
      return (
        <span
          key={category.id}
          className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${category.color} text-white`}
        >
          {category.name}
        </span>
      );
    });
  };
  
  const renderTechStack = (techArray: string[]) => {
    return techArray.map((tech, index) => (
      <span
        key={index}
        className="px-2 py-1 text-xs bg-purple-500/10 text-purple-200 rounded-full"
      >
        {tech}
      </span>
    ));
  };
  
// Lazy load ProjectCard for better performance
const LazyProjectCard = React.lazy(() =>
  Promise.resolve({ default: memo(({ project, viewMode }: ProjectCardProps) => {
    const [imageError, setImageError] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    const handleImageError = () => setImageError(true);
    const imageSrc = imageError ? FALLBACK_IMAGE : project.image;

    return (
      <div className={`w-full transform transition-all duration-500 ease-out h-full
        ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      >
        <SectionCard 
          className={`overflow-hidden glass rounded-2xl relative p-0
            border border-purple-500/10
            w-full transition-all duration-300 ease-in-out
            flex ${viewMode === 'list' ? 'md:flex-row flex-col' : 'flex-col'}
            ${viewMode === 'list' ? 'h-[280px]' : 'h-full'}`} // Add fixed height for list view
        >
          {/* Updated Image container */}
          <div 
            className={`relative overflow-hidden flex-shrink-0
              ${viewMode === 'list' ? 'md:w-[320px] w-full' : 'w-full'}`}
            style={{ 
              height: viewMode === 'list' ? '280px' : CARD_DIMENSIONS.grid.imageHeight,
            }}
          >
            <img
              loading="lazy"
              decoding="async"
              src={imageSrc}
              alt={project.title}
              className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
              onError={handleImageError}
            />
            {/* Gradient overlay */}
            <div 
              className={`absolute inset-0 transition-opacity duration-300
                ${viewMode === 'list' 
                  ? 'bg-gradient-to-r from-black/80 via-black/40 to-transparent' 
                  : 'bg-gradient-to-t from-black/90 via-black/40 to-transparent'}`}
            />
            <div className="absolute bottom-4 left-4 flex gap-2 items-center flex-wrap max-w-[90%] z-10">
              {renderCategories(project.category)}
            </div>
          </div>

          {/* Content section - Updated layout */}
          <div className={`flex flex-col flex-grow p-3 xxxs:p-4 xxs:p-5 sm:p-6 
            ${viewMode === 'list' ? 'md:px-8 justify-between' : 'h-full justify-between gap-4'}`}
          >
            <div className="space-y-3">
              <h3 className="text-base xxxs:text-lg xxs:text-xl sm:text-2xl font-bold">
                {project.title}
              </h3>
              <p className="text-[11px] xxxs:text-xs xxs:text-sm sm:text-base lg:text-lg 
                    text-gray-300 leading-relaxed">
                {project.longDescription}
              </p>
            </div>
            
            <div className="space-y-4 mt-auto pt-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.length > 0 ? renderTechStack(project.tech) : 
                  <span className="text-xs text-purple-300 opacity-30">Tech stack</span>}
              </div>
              {/* Link section */}
              <div>
                {project.link ? (
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-pink-400 font-medium
                      transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project →
                  </a>
                ) : (
                  <span className="text-purple-400 opacity-30">Coming soon</span>
                )}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    );
  }) })
);

  

  // Update ProjectsSection component
  const ProjectsSection: React.FC = () => {
    const [, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isLoading, setIsLoading] = useState(false);
    const [isPageTransitioning, setIsPageTransitioning] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [, startTransition] = useTransition();

    // Add window resize handler
    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        setWindowWidth(width);
        // Force grid view on mobile
        if (width < 768) { // md breakpoint
          setViewMode('grid');
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // Initial check
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Optimize page/category change handlers with useTransition for responsiveness
    const handlePageChange = useCallback((newPage: number) => {
      setIsPageTransitioning(true);
      setIsLoading(true);
      startTransition(() => {
        setCurrentPage(newPage);
        setTimeout(() => {
          setIsLoading(false);
          setIsPageTransitioning(false);
        }, 200);
      });
    }, [startTransition]);

    const handleCategoryChange = useCallback((category: string) => {
      setIsLoading(true);
      setIsPageTransitioning(true);
      startTransition(() => {
        setSelectedCategory(category);
        setCurrentPage(1);
        setTimeout(() => {
          setIsLoading(false);
          setIsPageTransitioning(false);
        }, 200);
      });
    }, [startTransition]);

    // Memoize filtered and paginated projects
    const filteredProjects = useMemo(() => 
      projects.filter(project =>
        selectedCategory === 'all' || 
        (Array.isArray(project.category) 
          ? project.category.includes(selectedCategory)
          : project.category === selectedCategory)
      ),
      [selectedCategory]
    );

    const paginatedProjects = useMemo(() => 
      filteredProjects.slice(
        (currentPage - 1) * projectsPerPage,
        currentPage * projectsPerPage
      ),
      [filteredProjects, currentPage]
    );

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    // Update renderProjectsByView with improved grid layout
    const renderProjectsByView = useCallback(() => {
      const renderedProjects = paginatedProjects.map((project, index) => (
        <Suspense key={`${project.title}-${viewMode}`} fallback={<div style={{ minHeight: 200 }} />}>
          <LazyProjectCard
            project={project}
            viewMode={viewMode}
            index={index}
          />
        </Suspense>
      ));

      const containerClassName = viewMode === 'grid'
        ? 'grid gap-4 grid-cols-1 md:grid-cols-2'
        : 'flex flex-col gap-6';

      return (
        <div className={`transition-all duration-300 ease-in-out ${containerClassName}`}>
          {renderedProjects}
        </div>
      );
    }, [viewMode, paginatedProjects]);

    // Update pagination section
    const renderPagination = useCallback(() => {
      if (totalPages <= 1) return null;

      return (
        <div className="flex justify-center items-center gap-4 mt-8 relative z-10">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1 || isPageTransitioning || isLoading}
            className="p-2 rounded-full glass disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
            tabIndex={0}
          >
            <ChevronLeft className={`w-6 h-6 ${isLoading ? 'animate-pulse' : ''}`} />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-6 xxxs:w-7 xxs:w-8 sm:w-10
                            h-6 xxxs:h-7 xxs:h-8 sm:h-10
                            text-[10px] xxxs:text-xs xxs:text-sm sm:text-base
                            rounded-full flex items-center justify-center transition-all duration-300 font-medium ${
                  currentPage === i + 1
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'glass hover:bg-purple-500 hover:bg-opacity-20 text-purple-200'
                }`}
                aria-current={currentPage === i + 1 ? 'true' : 'false'}
                aria-label={`Go to page ${i + 1}`}
                tabIndex={0}
                onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && currentPage !== i + 1) setCurrentPage(i + 1); }}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || isPageTransitioning}
            className="p-2 rounded-full glass disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
            tabIndex={0}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      );
    }, [currentPage, totalPages, handlePageChange, isLoading, isPageTransitioning]);

    // Add loading indicator
    const LoadingIndicator = () => (
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2">
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-ping" />
      </div>
    );

    // Add scroll restoration utility
    const useScrollRestoration = () => {
      useEffect(() => {
        const scrollPos = sessionStorage.getItem('projectScrollPos');
        if (scrollPos) {
          window.scrollTo(0, parseInt(scrollPos));
          sessionStorage.removeItem('projectScrollPos');
        }
        return () => {
          sessionStorage.setItem('projectScrollPos', window.scrollY.toString());
        };
      }, []);
    };

    // Add scroll restoration
    useScrollRestoration();

    // Preload next page images
    useEffect(() => {
      const nextPageImages = filteredProjects
        .slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage)
        .map(p => p.image);

      nextPageImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }, [currentPage, filteredProjects]);

    // Update keyboard navigation handler
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (document.activeElement === document.body) {
          if (e.key === 'ArrowLeft' && currentPage > 1) {
            handlePageChange(currentPage - 1);
          } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
            handlePageChange(currentPage + 1);
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPage, totalPages, handlePageChange]);

    // Add error boundary with retry
    useEffect(() => {
      const handleError = () => setHasError(true);
      window.addEventListener('error', handleError);
      return () => window.removeEventListener('error', handleError);
    }, []);

    if (hasError) {
      return (
        <div className="text-center p-8">
          <p className="text-gray-300">Something went wrong. Please try again.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-200"
          >
            Reload Page
          </button>
        </div>
      );
    }

    // Add ScrollToTop component
    const ScrollToTop = memo(() => {
      const [isVisible, setIsVisible] = useState(false);

      useEffect(() => {
        const toggleVisibility = () => {
          if (window.pageYOffset > 500) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
      }, []);

      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

      return (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 p-3 rounded-full 
            bg-gradient-to-r from-purple-500/10 to-pink-500/10 
            hover:from-purple-500/20 hover:to-pink-500/20
            border border-purple-500/20 backdrop-blur-md
            transition-opacity duration-300
            pointer-events-${isVisible ? 'auto' : 'none'}`}
          aria-label="Scroll to top"
          style={{ visibility: isVisible ? 'visible' : 'hidden' }}
        >
          <ArrowUpCircle className="w-6 h-6 text-purple-400" />
        </motion.button>
      );
    });

    return (
      <section className="section-container space-y-6 xxs:space-y-4 sm:space-y-10 relative backdrop-blur-sm 
         overflow-x-hidden max-w-[100vw]">
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

        {/* Content wrapper */}
        <div className="relative">
          {/* Header Section */}
          <div className="content-container animate-fade-in relative px-2 xxs:px-4 sm:px-6">
            {/* Decorative header background */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Circular gradient blur */}
              <div className="absolute -top-1/2 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-50 mix-blend-overlay" />
              <div className="absolute -bottom-1/2 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl opacity-50 mix-blend-overlay" />
              
              {/* Grid pattern */}
              <div 
                className="absolute inset-0 opacity-[0.015]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgb(139, 92, 246) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(139, 92, 246) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px'
                }}
              />
            </div>

            <div className="relative max-w-5xl mx-auto px-2 xxxs:px-3 xxs:px-4 sm:px-6 lg:px-8">
              <Header
                title="Open to full-time opportunities"
                description="Showcasing innovative solutions across design, development, and digital experiences."
              />
            </div>
          </div>
          
          {/* Navigation */}
          <CategoryNavigation
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            viewMode={viewMode}
            setViewMode={setViewMode}
            setCurrentPage={setCurrentPage}
          />
          
          {/* Projects Grid/List with improved spacing */}
          <div className="relative container">
            <div className="relative max-w-5xl mx-auto px-2 xxxs:px-3 xxs:px-4 sm:px-6 lg:px-8">

              {isLoading && <LoadingIndicator />}
              <motion.div 
                className="space-y-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {renderProjectsByView()}
                {renderPagination()}
              </motion.div>
            </div>
          </div>
        </div>
        <ScrollToTop />
      </section>
    );
  };

// Export memoized component
export default memo(ProjectsSection);

