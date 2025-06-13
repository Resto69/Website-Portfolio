import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, MapPin, Linkedin, Globe, MessageCircleCode, Calendar, Sun, Moon } from 'lucide-react';

// Add Calendly types
declare global {
  interface Window {
    Calendly: {
      closePopupWidget(): unknown;
      initPopupWidget: (options: { url: string }) => void;
      showPopupWidget: (url: string) => void;
      hidePopupWidget: () => void;
    };
  }
}

const contactSectionConfig = {
  calendlyUrl: "https://calendly.com/amar-zuga",
  contactMethods: [
    {
      title: "Schedule a Call",
      description: "Book a 30-minute intro call",
      icon: <Calendar className="w-5 h-5" />,
      action: "Schedule",
      url: "https://calendly.com/amar-zuga/30min",
      type: "calendly"
    },
    {
      title: "Email",
      description: "zuga677@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      action: "Copy",
      value: "zuga677@gmail.com",
      type: "copy"
    },
    {
      title: "WhatsApp/Viber",
      description: "+38762287237",
      icon: <MessageCircleCode className="w-5 h-5" />,
      action: "Copy",
      value: "+38762287237",
      type: "copy"
    }
  ],
  socialLinks: [
    { icon: <Linkedin />, url: 'https://linkedin.com/in/azuga', label: 'LinkedIn' },
    { icon: <Globe />, url: 'https://amarsportfolio.fly.dev/', label: 'Portfolio' },
    { icon: <MapPin />, url: 'https://maps.google.com/?q=Sarajevo', label: 'Location' }
  ],
  availability: {
    schedule: [
      "Monday - Friday",
      "9:00 AM - 6:00 PM (GMT+2)",
      "Flexible for different time zones"
    ]
  },
  highlights: [
    {
      title: "Quick Response",
      description: "Usually within 24 hours",
      icon: <Clock className="w-6 h-6" />,
      color: "from-green-500/10 to-emerald-500/10"
    },
    {
      title: "Flexible Schedule",
      description: "Available for your timezone",
      icon: <Globe className="w-6 h-6" />,
      color: "from-purple-500/10 to-pink-500/10"
    },
    {
      title: "Professional Support",
      description: "Clear communication & updates",
      icon: <MessageCircleCode className="w-6 h-6" />,
      color: "from-blue-500/10 to-cyan-500/10"
    }
  ],
  calendly: {
    title: "Schedule a Call",
    description: "Let's discuss your project in detail",
    options: [
      {
        duration: "30 min",
        title: "Quick Consultation",
        description: "Brief project discussion and Q&A",
        url: "https://calendly.com/amar-zuga/30min"
      },
      {
        duration: "60 min",
        title: "In-Depth Discussion",
        description: "Detailed project planning and strategy",
        url: "https://calendly.com/amar-zuga/60min"
      }
    ]
  },
  footer: {
    links: [
      { title: "Portfolio", url: "https://amarsportfolio.fly.dev/" },
      { title: "LinkedIn", url: "https://linkedin.com/in/azuga" },
      { title: "Privacy Policy", url: "/privacy" }
    ],
    message: "Looking forward to creating something amazing together!"
  },
  status: {
    config: {
      available: {
        icon: <Sun className="w-4 h-4" />,
        text: "Available Now",
        color: "text-green-400",
        bgColor: "bg-green-500",
      },
      away: {
        icon: <Clock className="w-4 h-4" />,
        text: "Response Delayed",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500",
      },
      offline: {
        icon: <Moon className="w-4 h-4" />,
        text: "Currently Offline",
        color: "text-gray-400",
        bgColor: "bg-gray-500",
      }
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const socialButtons = [
  {
    name: 'LinkedIn',
    icon: <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />,
    url: 'https://linkedin.com/in/azuga',
    color: 'from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30',
    textColor: 'text-blue-400'
  },
  {
    name: 'Portfolio',
    icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5" />,
    url: 'https://amarsportfolio.fly.dev/',
    color: 'from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30',
    textColor: 'text-purple-400'
  },
  {
    name: 'Gmail',
    icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
    url: 'https://mail.google.com/mail/?view=cm&fs=1&to=zuga677@gmail.com',
    color: 'from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30',
    textColor: 'text-red-400'
  }
];

const TimeConverter: React.FC = () => {
  const [userTime, setUserTime] = useState<string>('');
  const [sarajevoTime, setSarajevoTime] = useState<string>('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const userTimeStr = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });

      // Convert to Sarajevo time (GMT+2)
      const sarajevoOffset = 2;
      const userOffset = -now.getTimezoneOffset() / 60;
      const diffHours = sarajevoOffset - userOffset;
      const sarajevoDate = new Date(now.getTime() + diffHours * 60 * 60 * 1000);
      
      const sarajevoTimeStr = sarajevoDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      setUserTime(userTimeStr);
      setSarajevoTime(sarajevoTimeStr);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-0 left-0 z-20"
    >
      <div className="flex items-center gap-2 px-4 py-2 rounded-br-2xl
                    bg-gradient-to-r from-purple-500/[0.08] to-pink-500/[0.08]
                    backdrop-blur-md border-r border-b border-purple-500/10
                    hover:border-purple-500/20 transition-colors">
        <Globe className="w-4 h-4 text-purple-400" />
        <div className="flex flex-col text-xs">
          <span className="text-gray-400">Your time: <span className="text-purple-300">{userTime}</span></span>
          <span className="text-gray-400">Sarajevo: <span className="text-purple-300">{sarajevoTime}</span></span>
        </div>
      </div>
    </motion.div>
  );
};

const ContactSection: React.FC = () => {
  const [isCalendlyLoading, setIsCalendlyLoading] = useState(false);
  const [calendlyError] = useState<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isPopupLoading, setIsPopupLoading] = useState(false);

  // Update script loading logic
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
      setIsCalendlyLoading(false);
    };

    document.body.appendChild(script);

    // Add CSS for Calendly
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);

    return () => {
      script.remove();
      link.remove();
    };
  }, []);

  // Fix Calendly popup function
  const openCalendly = useCallback((url: string) => {
    if (!window?.Calendly) {
      console.error('Calendly not loaded');
      return;
    }

    try {
      setIsPopupLoading(true);
      
      // Create Calendly widget
      const config = {
        url: url,
        prefill: {},
        customColors: {
          primary: "#8B5CF6",
          secondary: "#EC4899"
        }
      };

      window.Calendly.initPopupWidget(config);

      // Reset loading state
      setTimeout(() => {
        setIsPopupLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error opening Calendly:', error);
      setIsPopupLoading(false);
    }
  }, []);

  // Update LoadingSpinner with pointer-events-none
  const LoadingSpinner = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] 
                 flex items-center justify-center pointer-events-none"
    >
      <div className="relative flex flex-col items-center px-4">
        <motion.div 
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
          style={{
            border: '3px solid rgba(139, 92, 246, 0.3)',
            borderTopColor: 'rgb(139, 92, 246)',
            animation: 'spin 0.8s linear infinite'
          }}
        />
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-sm sm:text-base text-purple-300 text-center"
        >
          Loading calendar...
        </motion.div>
      </div>
    </motion.div>
  );

  // Add custom CSS for spinner animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Update CSS to hide all Calendly loading animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .calendly-spinner {
        display: none !important;
      }
      .calendly-inline-widget {
        min-width: 0 !important;
      }
      .calendly-loader {
        display: none !important;
      }
      /* Hide the blue loading dots */
      .calendly-spinner-loading {
        display: none !important;
      }
      /* Additional selectors to ensure all loading indicators are hidden */
      [class*="loading-dots"] {
        display: none !important;
      }
      .calendly-loading-spinner {
        display: none !important;
      }
      .calendly-widget-loading {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Update Calendly buttons to show loading state
  const renderCalendlyButton = (option: typeof contactSectionConfig.calendly.options[0]) => (
    <button
      key={option.duration}
      onClick={() => !isPopupLoading && openCalendly(option.url)}
      disabled={isCalendlyLoading || !isScriptLoaded || isPopupLoading}
      className={`group/card p-2 rounded-xl relative isolate
                 bg-purple-500/5 hover:bg-purple-500/10
                 border border-purple-500/10 hover:border-purple-500/20
                 transition-all duration-300 text-left
                 hover:-translate-y-1 w-full
                 disabled:opacity-50 disabled:cursor-not-allowed
                 ${isPopupLoading ? 'pointer-events-none' : ''}`}
      tabIndex={isPopupLoading ? -1 : 0}
      aria-label={`Schedule: ${option.title}`}
    >
      {/* Add interactive background effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/0 via-purple-500/[0.07] to-purple-500/0 
                    opacity-0 group-hover/card:opacity-100 blur-xl transition-opacity duration-500" 
           style={{ 
             transform: 'translate3d(0, 0, 0)',
             backfaceVisibility: 'hidden'
           }}
      />
      
      {/* Existing button content */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm sm:text-lg font-bold text-white 
                        group-hover/card:text-purple-300 transition-colors">
          {option.title}
        </span>
        <span className="px-2 py-1 rounded-full bg-purple-500/20 
                        text-xs sm:text-sm text-purple-200">
          {option.duration}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-gray-400">{option.description}</p>
      
      {/* Loading indicator */}
      {(isCalendlyLoading || !isScriptLoaded) && (
        <div className="absolute inset-0 bg-black/50 rounded-xl 
                      backdrop-blur-sm flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-purple-500/30 
                         border-t-purple-500 rounded-full animate-spin" />
        </div>
      )}
    </button>
  );

  // Update the Calendly section with error handling
  const renderCalendlySection = () => (
    <div className="space-y-5 sm:space-y-8">
      <motion.div className="content-container p-3 sm:p-5 md:p-8 rounded-2xl
                            bg-gradient-to-br from-purple-500/[0.08] to-pink-500/[0.08]
                            border border-purple-500/10
                            space-y-4 sm:space-y-8
                            max-w-full md:max-w-[900px] mx-auto">
        {calendlyError ? (
          <div className="text-center p-4 bg-red-500/10 rounded-xl border border-red-500/20">
            <p className="text-red-400">{calendlyError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 text-sm text-purple-400 hover:text-purple-300"
            >
              Try reloading the page
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold mb-1 
                          bg-clip-text text-transparent bg-gradient-to-r 
                          from-purple-200 to-pink-200">
                {contactSectionConfig.calendly.title}
              </h3>
              <p className="text-xs sm:text-base text-gray-400">
                {contactSectionConfig.calendly.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
              {contactSectionConfig.calendly.options.map(renderCalendlyButton)}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );

  return (
    <section className="section-container space-y-4 sm:space-y-8 md:space-y-10
                       relative backdrop-blur-sm
                       pt-6 sm:pt-12 md:pt-16
                       pb-6 sm:pb-10 md:pb-14
                       overflow-hidden"
      aria-label="Contact Section"
    >
      {/* Main Content Container */}
      <div className="relative max-w-[1000px] w-full mx-auto
        space-y-5 sm:space-y-6 md:space-y-6">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 sm:space-y-8 md:space-y-10">
          <motion.div
            className="content-container
              p-3 sm:p-5 md:p-8
              rounded-2xl
              bg-gradient-to-br from-purple-500/[0.05] to-pink-500/[0.05]
              border border-purple-500/10
              space-y-4 sm:space-y-8 md:space-y-10
              relative w-full"
          >
            <TimeConverter />
            
            {/* Enhanced Header Section */}
            <div className="flex flex-col items-center gap-2 sm:gap-5 mb-4 sm:mb-8">
              {/* Status Badges */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3
                            mt-8 sm:mt-4"
              >
                {contactSectionConfig.availability.schedule.map((badge, index) => (
                  <div key={index} className="flex items-center gap-1.5 px-2 py-1 rounded-full
                                        bg-gradient-to-r from-purple-500/10 to-pink-500/10
                                        border border-purple-500/20 hover:border-purple-500/30
                                        transition-all duration-300">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                    <span className="text-[11px] sm:text-sm text-gray-300">{badge}</span>
                  </div>
                ))}
              </div>

              {/* Title and Description */}
              <div className="text-center space-y-2 sm:space-y-4">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl sm:text-4xl md:text-5xl font-bold"
                >
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r 
                                  from-purple-400 via-pink-400 to-purple-400 animate-gradient-text">
                      Get in Touch
                    </span>
                    <span className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                                  blur-xl opacity-50 animate-pulse" />
                  </span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs sm:text-base md:text-lg max-w-[92%] sm:max-w-2xl mx-auto text-gray-400"
                >
                  I'm excited to discuss your project and explore how we can work together.
                </motion.p>
              </div>
            </div>

            {/* Highlights Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-5 mt-4 sm:mt-8">
              {contactSectionConfig.highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-2 sm:p-5 rounded-2xl bg-gradient-to-br ${highlight.color} 
                             border border-purple-500/10 hover:border-purple-500/20
                             transition-all duration-300 flex items-center justify-center`}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    {React.cloneElement(highlight.icon, { 
                      className: "text-purple-400 w-5 h-5 sm:w-6 sm:h-6" 
                    })}
                    <div className="space-y-1">
                      <h3 className="text-xs sm:text-lg font-semibold">{highlight.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-400">{highlight.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Calendly Section */}
        {renderCalendlySection()}

        {/* Footer - Centered layout with improved text scaling */}
        <motion.footer
          className="relative pt-6 xxxs:pt-3 xxs:pt-4 sm:pt-8 mt-2 border-t border-purple-500/10"
          variants={itemVariants}
        >
          {/* Background pattern and effects */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(139, 92, 246) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(139, 92, 246) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px'
            }}
          />
          <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

          <div className="content-container relative mx-auto
            px-2 xxxs:px-1 xxs:px-2 sm:px-4 lg:px-8
            pt-6 xxxs:pt-3 xxs:pt-4 sm:pt-8"
          >
            {/* Content with centered layout */}
            <div className="flex flex-col items-center gap-4 xxxs:gap-3 xxs:gap-4 sm:gap-6 text-center">
              {/* Message Section */}
              <div className="relative max-w-[600px]">
                <motion.p 
                  className="text-sm xxxs:text-[11px] xxs:text-sm sm:text-base lg:text-lg text-gray-300 relative z-10
                            px-4 xxxs:px-2 xxs:px-4 sm:px-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {contactSectionConfig.footer.message}
                </motion.p>
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-lg blur-lg" />
              </div>

              {/* Social Buttons - Centered */}
              <div className="flex flex-wrap justify-center gap-2 xxxs:gap-1.5 xxs:gap-2 sm:gap-3
                            px-2 xxxs:px-1 xxs:px-2 sm:px-0 w-full max-w-[400px] mx-auto">
                {socialButtons.map((button, index) => (
                  <motion.a
                    key={button.name}
                    href={button.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className={`inline-flex items-center gap-1.5 xxxs:gap-1 xxs:gap-1.5 sm:gap-2
                               px-2.5 xxxs:px-2 xxs:px-2.5 sm:px-3
                               py-1.5 xxxs:py-1 xxs:py-1.5 
                               rounded-xl
                               bg-gradient-to-r ${button.color}
                               border border-purple-500/10
                               transition-all duration-300 group
                               hover:shadow-lg hover:shadow-purple-500/10
                               hover:-translate-y-0.5
                               focus:outline-none focus:ring-2 focus:ring-purple-500/40
                               active:translate-y-0`}
                    tabIndex={0}
                    aria-label={button.name}
                  >
                    {React.cloneElement(button.icon, {
                      className: `${button.textColor} w-3 h-3 xxxs:w-2.5 xxxs:h-2.5 xxs:w-3 xxs:h-3 sm:w-4 sm:h-4
                                 group-hover:scale-110 transition-transform duration-300`
                    })}
                    <span className={`${button.textColor} text-[9px] xxxs:text-[8px] xxs:text-[9px] sm:text-xs font-medium`}>
                      {button.name}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Copyright with improved spacing and scaling */}
              <motion.div 
                className="relative mt-6 xxxs:mt-4 xxs:mt-5 sm:mt-6 pt-4 xxxs:pt-3 xxs:pt-4 
                         border-t border-purple-500/10 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent blur-xl" />
                <p className="text-center relative z-10">
                  <span className="text-[11px] text-gray-500">
                    © 2025{' '}
                  </span>
                  <span className="text-[11px] bg-clip-text text-transparent 
                               bg-gradient-to-r from-purple-400 to-pink-400 font-medium">
                    Amar Zuga
                  </span>
                  <span className="text-[11px] text-gray-500">
                    . All rights reserved.
                  </span>
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom border gradient */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
        </motion.footer>
      </div>

      {/* Add loading spinner */}
      {isPopupLoading && <LoadingSpinner />}
    </section>
  );
};

export default ContactSection;