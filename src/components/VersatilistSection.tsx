import React, { useState, memo, useMemo, useEffect, useRef, Component,  } from 'react';
import { motion } from 'framer-motion';
import { Palette, Code, Brain, PenToolIcon, Star, HeadphonesIcon, Coffee, FolderKanban } from 'lucide-react';
import { smoothTransition } from '../utils/animation';


// Move interfaces outside
interface SkillDetail {
  area: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  years: number;
}

interface VersatileSkill {
  icon: React.ReactElement;
  title: string;
  description: string;
  primarySkills: string[];
  detailedSkills: string[];
  achievements: { value: string; label: string }[];
  tools: string[];
  casestudy: {
    title: string;
    description: string;
    impact: string[];
  };
  skillDetails: SkillDetail[];
  recentProjects: { name: string; date: string }[];
  softSkills: string[];
  color: string;
}

// Add Error Boundary
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class SkillSectionErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 xxxs:p-6 sm:p-8 text-center">
          <p className="text-[11px] xxxs:text-xs xxs:text-sm sm:text-base lg:text-lg text-red-400">
            Something went wrong loading this section.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Enhance SkillLevelIndicator with hover effects
const SkillLevelIndicator = memo(({ level, years }: { level: string; years: number }) => (
  <div className="flex items-center gap-2 group">
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-1 h-4 rounded-full transition-all duration-300 
            ${i < years 
              ? 'bg-purple-500 group-hover:bg-purple-400' 
              : 'bg-purple-500/20 group-hover:bg-purple-500/30'}`}
        />
      ))}
    </div>
    <span className="text-[10px] xxxs:text-xs xxs:text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
      {level}
    </span>
  </div>
));

// Update text size utilities with adjusted base sizes
const textSizes = {
  heading: {
    title: "text-base xxxs:text-lg xxs:text-xl sm:text-2xl lg:text-3xl",
    subtitle: "text-sm xxxs:text-base xxs:text-lg sm:text-xl lg:text-2xl",
    description: "text-[8px] xxxs:text-xs xxs:text-sm sm:text-base leading-relaxed"
  },
  card: {
    title: "text-xs xxxs:text-sm xxs:text-base sm:text-lg lg:text-xl font-medium",
    description: "text-[8px] xxxs:text-xs xxs:text-sm sm:text-base leading-relaxed",
    stats: "text-[10px] xxxs:text-xs xxs:text-sm sm:text-base font-semibold"
  },
  detail: {
    label: "text-[8px] xxxs:text-[10px] xxs:text-xs sm:text-sm text-gray-400",
    value: "text-[9px] xxxs:text-xs xxs:text-sm sm:text-base text-gray-300"
  }
};

const VersatilistSection: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [, setHasError] = useState(false);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const [, setNavigationInView] = useState(true);
  const navigationRef = useRef<HTMLDivElement>(null);

  // Add this new state to track section bottom
  const [, setIsAtBottom] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Add scroll to active item
  useEffect(() => {
    if (buttonRefs.current[activeSkill] && navRef.current) {
      const button = buttonRefs.current[activeSkill];
      const container = navRef.current;
      const scrollLeft = button.offsetLeft - container.clientWidth / 2 + button.clientWidth / 2;
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeSkill]);

  // Update scroll handling

  // Add scroll shadow state
  const [, setShowLeftShadow] = useState(false);
  const [, setShowRightShadow] = useState(true);

  // Handle scroll shadows
  const handleScrollShadows = useMemo(() => {
    let timeout: NodeJS.Timeout;
    return () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (navRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
          setShowLeftShadow(scrollLeft > 20);
          setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 20);
        }
      }, 100);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (nav) {
      nav.addEventListener('scroll', handleScrollShadows);
      handleScrollShadows();
      return () => nav.removeEventListener('scroll', handleScrollShadows);
    }
  }, );

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Memoize versatileSkills array
  const versatileSkills = useMemo<VersatileSkill[]>(() => [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Visual Design & UI/UX",
      description: "Transforming ideas into visually stunning and functional experiences",
      primarySkills: [
        "Brand Design & Identity",
        "UI/UX Architecture",
        "Digital Illustration",
        "Responsive Design",
        "User Flow Mapping",
        "Design Systems"
      ],
      detailedSkills: [
        "Creating comprehensive brand identity systems and guidelines",
        "Designing intuitive user interfaces with focus on user experience",
        "Developing interactive prototypes and user flows",
        "Creating vector illustrations and digital assets",
        "Implementing responsive design principles",
        "Building scalable design systems"
      ],
      achievements: [
        { value: "40+", label: "Design Projects" },
        { value: "98%", label: "Client Satisfaction" },
        { value: "15+", label: "Design Systems" }
      ],
      tools: [
        "Figma",
        "Adobe Creative Suite",
        "Sketch",
        "InVision",
        "Adobe XD",
        "Photoshop",
        "Illustrator",
        "After Effects"
      ],
      casestudy: {
        title: "E-commerce Redesign Success",
        description: "Complete overhaul of an e-commerce platform's user experience",
        impact: [
          "45% conversion rate increase",
          "60% reduction in cart abandonment",
          "90% positive user feedback"
        ]
      },
      skillDetails: [
        { area: 'UI Design', level: 'Expert', years: 4 },
        { area: 'Brand Design', level: 'Advanced', years: 3 },
        { area: 'Motion Design', level: 'Intermediate', years: 2 }
      ] as SkillDetail[],
      recentProjects: [
        { name: 'E-commerce Redesign', date: '2023' },
        { name: 'Brand System', date: '2023' }
      ],
      softSkills: ['Creative Problem Solving', 'Visual Communication'],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <PenToolIcon className="w-6 h-6" />,
      title: "Hardware & Device Repair",
      description: "Expert diagnostics and repair of computers and mobile devices",
      primarySkills: [
        "PC Diagnostics",
        "Hardware Repair",
        "Mobile Device Repair",
        "System Optimization",
        "Data Recovery",
        "Component Replacement"
      ],
      detailedSkills: [
        "Advanced computer hardware diagnostics and troubleshooting",
        "Smartphone and tablet repair including screen replacements",
        "System performance optimization and maintenance",
        "Data recovery from damaged storage devices",
        "Custom PC building and upgrades",
        "Network hardware setup and configuration"
      ],
      achievements: [
        { value: "80+", label: "Devices Repaired" },
        { value: "98%", label: "Success Rate" },
        { value: "4.9 ★", label: "Service Rating" }
      ],
      tools: [
        "Hardware Diagnostic Tools",
        "Repair Toolkits",
        "Testing Equipment",
        "Recovery Software",
        "Soldering Equipment",
        "Benchmarking Tools"
      ],
      casestudy: {
        title: "Service Center Success",
        description: "Established efficient repair workflow system",
        impact: [
          "24hr average turnaround",
          "95% first-time fix rate",
          "Zero data loss incidents"
        ]
      },
      skillDetails: [
        { area: 'Hardware Repair', level: 'Expert', years: 5 },
        { area: 'Data Recovery', level: 'Advanced', years: 4 },
        { area: 'System Optimization', level: 'Intermediate', years: 3 }
      ] as SkillDetail[],
      recentProjects: [
        { name: 'Device Repair Streamlining', date: '2023' },
        { name: 'Data Recovery Case Study', date: '2023' }
      ],
      softSkills: ['Attention to Detail', 'Problem Solving'],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Technical Implementation",
      description: "Bringing designs to life with clean, organized code",
      primarySkills: [
        "HTML/CSS Architecture",
        "Web Development",
        "API Integration",
        "Responsive Design",
        "Performance Optimization",
        "Cross-browser Compatibility"
      ],
      detailedSkills: [
        "Building semantic HTML structures for accessibility",
        "Implementing complex CSS layouts and animations",
        "Integrating and consuming REST APIs",
        "Creating responsive and mobile-first designs",
        "Optimizing web performance and loading times",
        "Ensuring cross-browser and device compatibility"
      ],
      achievements: [
        { value: "100+", label: "Pages Built" },
        { value: "5s", label: "Load Time" },
        { value: "99%", label: "Mobile-Friendly" }
      ],
      tools: ["Visual Studio Code", "Git", "Postman", "Chrome DevTools"],
      casestudy: {
        title: "Performance Optimization",
        description: "Improved website speed and responsiveness",
        impact: ["50% reduction in load time", "30% increase in mobile traffic", "20% boost in SEO ranking"]
      },
      skillDetails: [
        { area: 'Frontend Development', level: 'Expert', years: 4 },
        { area: 'API Development', level: 'Advanced', years: 3 },
        { area: 'Web Performance', level: 'Intermediate', years: 2 }
      ] as SkillDetail[],
      recentProjects: [
        { name: 'Corporate Website', date: '2023' },
        { name: 'API Development for Mobile App', date: '2023' }
      ],
      softSkills: ['Analytical Thinking', 'Creativity'],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI & Automation",
      description: "Leveraging AI to enhance digital experiences",
      primarySkills: [
        "AI Implementation",
        "Process Automation",
        "ChatGPT Integration",
        "Workflow Optimization",
        "Machine Learning",
        "Data Analysis"
      ],
      detailedSkills: [
        "Implementing AI-powered features and functionalities",
        "Creating automated workflow systems",
        "Integrating ChatGPT and other AI models",
        "Optimizing business processes through automation",
        "Analyzing data for AI-driven insights",
        "Building AI-enhanced user experiences"
      ],
      achievements: [
        { value: "15+", label: "AI Projects" },
        { value: "40%", label: "Efficiency Gain" },
        { value: "3", label: "AI Solutions" }
      ],
      tools: ["TensorFlow", "Python", "R", "RapidMiner"],
      casestudy: {
        title: "AI Chatbot Development",
        description: "Created a chatbot that handles 70% of customer inquiries",
        impact: ["24/7 customer support", "60% reduction in response time", "50% decrease in support costs"]
      },
      skillDetails: [
        { area: 'Machine Learning', level: 'Expert', years: 3 },
        { area: 'AI Integration', level: 'Advanced', years: 2 },
        { area: 'Data Analysis', level: 'Intermediate', years: 2 }
      ] as SkillDetail[],
      recentProjects: [
        { name: 'Customer Support Chatbot', date: '2023' },
        { name: 'Sales Prediction Model', date: '2023' }
      ],
      softSkills: ['Critical Thinking', 'Innovation'],
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6" />,
      title: "Customer Care & Support",
      description: "Managing complex customer relationships and technical support with empathy and expertise",
      primarySkills: [
        "Complaint Resolution",
        "Technical Support",
        "Ombudsman Case Handling",
        "Escalation Management",
        "Customer Communication",
        "Process Documentation"
      ],
      detailedSkills: [
        "Resolving complex customer complaints and disputes",
        "Providing technical support and troubleshooting",
        "Managing Ombudsman and regulatory cases",
        "Implementing support workflow improvements",
        "Creating customer communication strategies",
        "Developing support documentation and guides"
      ],
      achievements: [
        { value: "98%", label: "Resolution Rate" },
        { value: "4.9★", label: "CSAT Score" },
        { value: "1.2hr", label: "Avg Response" }
      ],
      tools: [
        "Zendesk",
        "Jira Service Desk",
        "Salesforce",
        "Confluence",
        "TeamViewer",
        "LiveChat",
        "Knowledge Base",
        "QMS Systems"
      ],
      casestudy: {
        title: "Support Excellence Program",
        description: "Transformed customer support operations and complaint handling processes",
        impact: [
          "95% first-contact resolution rate",
          "40% reduction in escalations",
          "Zero upheld Ombudsman cases"
        ]
      },
      skillDetails: [
        { area: 'Technical Support', level: 'Expert', years: 5 },
        { area: 'Complaint Handling', level: 'Expert', years: 4 },
        { area: 'Process Improvement', level: 'Advanced', years: 3 }
      ] as SkillDetail[],
      recentProjects: [
        { name: 'Support Center Optimization', date: '2023' },
        { name: 'Complaint Process Redesign', date: '2023' }
      ],
      softSkills: ['Problem Resolution', 'Customer Empathy'],
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Coffee Shop Management",
      description: "Comprehensive cafe operations management focusing on staff, inventory, and financial oversight",
      primarySkills: [
        "Staff Scheduling",
        "Inventory Control",
        "Financial Management",
        "Quality Assurance",
        "Team Leadership",
        "Operations Planning"
      ],
      detailedSkills: [
        "Creating efficient staff rosters and shift management",
        "Managing stock levels and supplier relationships",
        "Handling basic bookkeeping and financial reports",
        "Maintaining product quality and consistency",
        "Training and supervising barista teams",
        "Implementing operational procedures and standards"
      ],
      achievements: [
        { value: "25%", label: "Cost Reduction" },
        { value: "98%", label: "Staff Retention" },
        { value: "4.8★", label: "Store Rating" }
      ],
      tools: [
        "POS Systems",
        "Square",
        "Inventory Management",
        "Staff Scheduling Software",
        "QuickBooks",
        "Recipe Management",
        "Equipment Maintenance",
        "Safety Protocols"
      ],
      casestudy: {
        title: "Cafe Operations Optimization",
        description: "Streamlined operations and improved profitability in high-volume coffee shop",
        impact: [
          "30% reduction in waste",
          "20% increase in staff efficiency",
          "15% boost in customer satisfaction"
        ]
      },
      skillDetails: [
        { area: 'Operations Management', level: 'Expert', years: 4 },
        { area: 'Staff Management', level: 'Expert', years: 4 },
        { area: 'Financial Control', level: 'Advanced', years: 3 }
      ] as SkillDetail[],
      recentProjects: [
        { name: 'Staff Training Program', date: '2023' },
        { name: 'Inventory System Implementation', date: '2023' }
      ],
      softSkills: ['Leadership', 'Organization'],
      color: "from-amber-500 to-yellow-500"
    },
    {
      icon: <FolderKanban className="w-6 h-6" />,
      title: "Project Management",
      description: "Orchestrating successful project delivery through effective planning and execution",
      primarySkills: [
        "Agile Methodologies",
        "Risk Management",
        "Resource Planning",
        "Stakeholder Management",
        "Budget Control",
        "Timeline Management"
      ],
      detailedSkills: [
        "Leading cross-functional teams",
        "Sprint planning and execution",
        "Project scope definition",
        "Risk assessment and mitigation",
        "Resource allocation",
        "Budget monitoring"
      ],
      achievements: [
        { value: "15+", label: "Projects Delivered" },
        { value: "95%", label: "On-time Delivery" },
        { value: "100%", label: "Client Satisfaction" }
      ],
      tools: [
        "Jira",
        "Trello",
        "MS Project",
        "Confluence",
        "Slack",
        "Notion",
        "Asana"
      ],
      casestudy: {
        title: "Digital Transformation Project",
        description: "Led a complex digital transformation initiative",
        impact: [
          "Delivered 2 months ahead of schedule",
          "20% under budget",
          "Zero scope creep"
        ]
      },
      skillDetails: [
        { area: 'Agile Management', level: 'Expert', years: 4 },
        { area: 'Risk Management', level: 'Advanced', years: 3 },
        { area: 'Resource Planning', level: 'Expert', years: 4 }
      ] as SkillDetail[],
      recentProjects: [
        { name: 'Enterprise System Migration', date: '2023' },
        { name: 'Digital Transformation', date: '2023' }
      ],
      softSkills: ['Leadership', 'Communication'],
      color: "from-fuchsia-500 to-pink-500"
    }
    // Add more skills as needed
  ], []);

  // Update navigation container classes
  const navigationClasses = `
    sticky top-0 z-30 w-full
    backdrop-blur-md
    bg-gradient-to-b from-black/95 via-black/90 to-transparent
    py-2 xxxs:py-3 sm:py-4 mt-3
    overflow-hidden
  `;


  // Improved tab animations
  const tabVariants = {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.03, // Reduced delay for snappier feel
        duration: 0.15,      // Faster animation
        ease: [0.2, 0, 0.3, 1]
      }
    }),
    hover: { 
      scale: 1.03, // Reduced scale for subtler hover
      y: -1,       // Smaller lift
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  // Improved card animations
  const cardVariants = {
    initial: { opacity: 0, scale: 0.97, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.97,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  // Enhanced navigation visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNavigationInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (navigationRef.current) {
      observer.observe(navigationRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Add this effect to handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { bottom } = sectionRef.current.getBoundingClientRect();
        const isBottom = bottom <= window.innerHeight;
        setIsAtBottom(isBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add missing type for skill detail rendering

  // Add loading state component
  const LoadingSkeleton = () => (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-xl bg-purple-500/10"></div>
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-purple-500/10 rounded-lg w-3/4"></div>
          <div className="h-4 bg-purple-500/10 rounded-lg w-1/2"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-purple-500/10 rounded-xl"></div>
        ))}
      </div>
    </div>
  );

  // Update error handling
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Section Error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <SkillSectionErrorBoundary>
      <section className="section-container space-y-6 xxs:space-y-4 sm:space-y-10 relative backdrop-blur-sm 
         overflow-x-hidden max-w-[100vw]">
    
        <motion.div className="relative z-10">
          {/* Header Container */}
          <motion.div className="content-container relative overflow-hidden">
            <div className="flex flex-col items-center gap-1">
              <div className="flex-1 text-center max-w-[95vw] xxxs:max-w-[90vw] sm:max-w-2xl mx-auto">
                {/* Badge */}
                <motion.div className="flex justify-center mb-2 xxxs:mb-3 xxs:mb-4 sm:mb-5">
                  <div className="inline-flex items-center gap-1 xxxs:gap-1.5 sm:gap-2 
                                px-1.5 xxxs:px-2 xxs:px-3 
                                py-0.5 xxxs:py-1 xxs:py-1.5
                                rounded-full 
                                bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 
                                border border-purple-500/20 backdrop-blur-md 
                                hover:bg-purple-500/10 hover:border-purple-500/30 transition-colors">
                    <div className="relative w-1 xxxs:w-1.5 sm:w-2">
                      <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                      <div className="relative rounded-full bg-emerald-400 w-1 xxxs:w-1.5 sm:w-2 h-1 xxxs:h-1.5 sm:h-2" />
                    </div>
                    <span className="text-xs xxs:text-sm sm:text-base text-gray-300 font-medium">
                      Driven by curiosity
                    </span>
                  </div>
                </motion.div>

                {/* Title and Description */}
                <motion.h2 className={`${textSizes.heading.title} font-bold tracking-tight 
                                   mb-1 xxxs:mb-2 sm:mb-3`}>
                  <span className="text-3xl xxs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-tight">
                    <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r 
                              from-purple-400 via-pink-400 to-purple-400 animate-gradient-text">
                      Creative Technologist
                    </span>
                    <span className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl opacity-50 animate-pulse-slow" />
                  </span>
                </motion.h2>

                <motion.p className={`${textSizes.heading.description} text-gray-300/90 
                                  leading-relaxed max-w-[95vw] xxxs:max-w-[90vw] sm:max-w-xl`}>
                  Bridging creativity and technology with an intuitive approach to design and problem-solving.
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Navigation with fixed container */}
          <div className={navigationClasses}>
            <div className="max-w-[1440px] mx-auto px-2 xxxs:px-3 sm:px-4">
              <div 
                ref={navRef}
                className="overflow-x-auto scrollbar-hide no-scrollbar scroll-smooth
                           [scrollbar-width:none] [-ms-overflow-style:none] 
                           [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex items-center gap-1.5 py-3 min-w-max">
                  {versatileSkills.map((skill, index) => (
                    <motion.button
                      key={index}
                      ref={el => buttonRefs.current[index] = el}
                      onClick={() => setActiveSkill(index)}
                      className={`px-4 py-2.5 rounded-xl transition-all duration-200 
                                 flex items-center gap-2 text-sm whitespace-nowrap
                                 ${activeSkill === index 
                                   ? `bg-gradient-to-r ${skill.color} text-white shadow-lg` 
                                   : 'bg-zinc-900/50 text-gray-400 hover:text-gray-300'}`}
                      variants={tabVariants}
                      custom={index}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {React.cloneElement(skill.icon, { 
                        className: `w-4 h-4 transition-transform duration-300 ${
                          activeSkill === index ? 'scale-110' : ''
                        }` 
                      })}
                      {skill.title}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content area with refined spacing and scaling */}
          <motion.div
            variants={cardVariants}
            className="w-full rounded-lg xxxs:rounded-xl sm:rounded-2xl
                       p-1.5 xxxs:p-2 sm:p-3"
          >
            <div className="relative">
              <div className="space-y-4 xxxs:space-y-5 sm:space-y-6 lg:space-y-8">
                <div className="max-w-5xl mx-auto">
                  <motion.div
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full rounded-2xl sm:rounded-3xl 
                             bg-gradient-to-b from-zinc-900/90 via-zinc-900/80 to-zinc-900/70
                             backdrop-blur-md border border-zinc-700/20 
                             hover:border-purple-500/10 
                             relative overflow-hidden transition-all duration-500
                             shadow-xl shadow-black/5
                             group"
                  >
                    {/* Add subtle background effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] to-transparent opacity-0 
                                  group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 opacity-[0.02]"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, rgb(139, 92, 246, 0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgb(139, 92, 246, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '24px 24px'
                      }}
                    />

                    {isLoading ? <LoadingSkeleton /> : (
                      <div className="relative h-full p-4 xxxs:p-5 xxs:p-6 sm:p-8 lg:p-10">
                        {/* Header Section with improved scaling */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, ...smoothTransition }}
                          className="flex flex-col gap-2 xxxs:gap-3 xxs:gap-4 sm:gap-6 mb-4 xxxs:mb-5 xxs:mb-6 sm:mb-8 lg:mb-10"
                        >
                          <div className="flex flex-col sm:flex-row items-start gap-3 xxxs:gap-4 sm:gap-6">
                            {/* Icon container with improved scaling */}
                            <motion.div
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              className={`p-2 xxxs:p-3 sm:p-4 lg:p-5 
                                         rounded-lg xxxs:rounded-xl sm:rounded-2xl 
                                         bg-gradient-to-r ${versatileSkills[activeSkill].color} 
                                         bg-opacity-10 transition-all duration-300`}
                            >
                              {React.cloneElement(
                                versatileSkills[activeSkill].icon,
                                { className: "w-4 h-4 xxxs:w-5 xxxs:h-5 xxs:w-6 xxs:h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" }
                              )}
                            </motion.div>
                              
                            {/* Card content with improved text scaling */}
                            <div className="flex-1 space-y-2 xxxs:space-y-3 sm:space-y-4">
                              {/* Title with improved scaling */}
                              <motion.h3 className="text-base xxxs:text-lg xxs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold 
                               bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                                {versatileSkills[activeSkill].title}
                              </motion.h3>

                              {/* Description with improved scaling */}
                              <motion.p className="text-[9px] xxxs:text-xs xxs:text-sm sm:text-base">
                                {versatileSkills[activeSkill].description}
                              </motion.p>

                              {/* Achievement stats with improved scaling */}
                              <div className="flex flex-wrap gap-2 xxxs:gap-3 sm:gap-4">
                                {(versatileSkills[activeSkill].achievements || []).map((achievement, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5 xxxs:gap-2">
                                    <span className={`${textSizes.card.stats} font-bold
                                bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400`}>
                                      {achievement.value}
                                    </span>
                                    <span className="text-[10px] xxxs:text-xs xxs:text-sm sm:text-base text-gray-400">
                                      {achievement.label}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Grid Layout with improved scaling */}
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          className="grid grid-cols-1 lg:grid-cols-2 gap-4 xxxs:gap-5 xxs:gap-6 sm:gap-8 lg:gap-10"
                        >
                          {/* Left Column */}
                          <div className="space-y-4 xxxs:space-y-5 xxs:space-y-6 sm:space-y-8">
                            {/* Key Skills Section */}
                            <div className="space-y-2 xxxs:space-y-3 sm:space-y-4">
                              <h4 className="text-sm xxxs:text-base xxs:text-lg sm:text-xl lg:text-2xl font-semibold text-purple-400 
                  flex items-center gap-2">
                                <Star className="w-3 h-3 xxxs:w-4 xxxs:h-4" /> Key Skills
                              </h4>
                              <div className="grid grid-cols-2 gap-1.5 xxxs:gap-2 sm:gap-3">
                                {(versatileSkills[activeSkill].primarySkills || []).map((skill, idx) => (
                                  <div key={idx} className="p-2 xxxs:p-3 sm:p-4 rounded-lg bg-purple-500/5">
                                    <span className={`${textSizes.detail.value} text-gray-300`}>
                                      {skill}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Expertise Levels with improved scaling */}
                            <div className="space-y-2 xxxs:space-y-3 sm:space-y-4">
                              <h4 className="text-sm xxxs:text-base xxs:text-lg sm:text-xl lg:text-2xl font-semibold text-purple-400">
                                Expertise Levels
                              </h4>
                              <div className="grid gap-1.5 sm:gap-3">
                                {(versatileSkills[activeSkill].skillDetails || []).map((detail, idx) => (
                                  <div key={idx} className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                                    <SkillLevelIndicator level={detail.level} years={detail.years} />
                                    <span className="text-[11px] xxxs:text-xs xxs:text-sm sm:text-base text-gray-300 mt-2">{detail.area}</span>
                                  </div>
                                ))}
                              </div>
                              
                            </div>
                            
                          </div>

                          {/* Right Column with improved scaling */}
                          <div className="space-y-4 xxxs:space-y-5 xxs:space-y-6 sm:space-y-8">
                            {/* Case Study with improved scaling */}
                            <div className="space-y-3 xxxs:space-y-4">
                              <h4 className="text-sm xxxs:text-base xxs:text-lg sm:text-xl lg:text-2xl font-semibold text-purple-400">
                                Featured Case Study
                              </h4>
                              <div className="p-3 xxxs:p-4 xxs:p-5 sm:p-6 rounded-xl bg-purple-500/5 border border-purple-500/10 
                 space-y-3 xxxs:space-y-4">
                                <h5 className="text-[13px] xxxs:text-base xxs:text-lg sm:text-xl lg:text-2xl font-semibold bg-clip-text text-transparent 
                                               bg-gradient-to-r from-purple-400 to-pink-400">
                                  {versatileSkills[activeSkill].casestudy.title}
                                </h5>
                                <p className="text-[11px] xxxs:text-xs xxs:text-sm sm:text-base lg:text-lg text-gray-300">
                                  {versatileSkills[activeSkill].casestudy.description}
                                </p>
                                <div className="grid gap-3 mt-4">
                                  {(versatileSkills[activeSkill].casestudy.impact || []).map((impact) => (
                                    <div className="flex items-center gap-2 text-[11px] xxxs:text-xs xxs:text-sm sm:text-base text-gray-400">
                                      <Star className="w-4 h-4 text-purple-400 flex-shrink-0 
                                                       group-hover:text-purple-300 transition-colors" />
                                      <span className="group-hover:text-gray-300 transition-colors">
                                        {impact}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                
                              </div>
                            </div>

                            {/* Tools section with improved scaling */}
                            <div className="space-y-2 xxxs:space-y-3 sm:space-y-4">
                              <h4 className="text-sm xxxs:text-base xxs:text-lg sm:text-xl lg:text-2xl font-semibold text-purple-400">
                                Tools & Technologies
                              </h4>
                              <div className="flex flex-wrap gap-1.5 xxxs:gap-2 sm:gap-2.5">
                                {(versatileSkills[activeSkill].tools || []).map((tool, idx) => (
                                  <motion.span
                                    key={idx}
                                    className="px-2 xxxs:px-3 py-1 xxxs:py-1.5 text-[11px] xxxs:text-xs xxs:text-sm sm:text-base rounded-lg
                                              bg-purple-500/5 border border-purple-500/10
                                              hover:bg-purple-500/10 hover:border-purple-500/20
                                              transition-all duration-300 cursor-default"
                                  >
                                    {tool}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
            
                </div>
            

                {/* Mobile navigation dots - Update positioning and visibility */}
                <div className="relative w-full mt-4 md:hidden px-2">
                  <motion.div
                    className="fixed bottom-4 left-1/2 -translate-x-1/2 
                     px-3 xxxs:px-4 py-1.5 xxxs:py-2
                     rounded-full bg-zinc-900/95 z-50"
                  >
                    <div className="flex gap-3 px-1">
                      {versatileSkills.map((_, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => setActiveSkill(idx)}
                          className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300
                                     ${idx === activeSkill 
                                       ? 'bg-purple-400' 
                                       : 'bg-purple-500/20 hover:bg-purple-500/30'}`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {idx === activeSkill && (
                            <motion.div
                              layoutId="activeDot"
                              className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm"
                              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
        </motion.div>
          </motion.div>
        </section>  
      </SkillSectionErrorBoundary>
  );
};

// Update styles
const styles = `

`;

// Add styles to document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default memo(VersatilistSection);
