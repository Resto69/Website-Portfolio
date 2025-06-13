import React, { useState } from 'react';
import { BookCheck, Clock, GraduationCap, FolderKanban, Star, Mail, MapPin, Code, HeadsetIcon, Palette, Languages, InboxIcon, FolderGit2} from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    content: "Working with Amar was an absolute pleasure. Their attention to detail and creative vision transformed our brand identity.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Michael Chen",
    role: "Marketing Director, InnovateCo",
    content: "The level of professionalism and creativity brought to our project was outstanding. Highly recommended!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "David Williams",
    role: "Product Manager, TechCorp",
    content: "Amar's ability to understand complex requirements and deliver elegant solutions is remarkable. A true professional.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Emily Rodriguez",
    role: "Design Director, CreativeHub",
    content: "The attention to detail and creative approach brought to our projects has been invaluable. Highly recommended!",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const AboutSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 2;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const [imgError, setImgError] = useState<{[key: string]: boolean}>({});

  interface CustomWindow extends Window {
    navigateToSection?: (section: number) => void;
  }

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      ((window as unknown) as CustomWindow).navigateToSection?.(4);
    }
  };

  const handleImageError = (imagePath: string) => {
    setImgError(prev => ({
      ...prev,
      [imagePath]: true
    }));
  };

  // Preload images to avoid flickering
  return (
    <div className="section-container space-y-6 xxs:space-y-4 sm:space-y-10 relative backdrop-blur-sm 
         overflow-x-hidden max-w-[100vw]"
         id="about-section"
         role="region"
         aria-label="About Section">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_at_50%_-100px,_#3B0764,_transparent)]" />
        
        {/* Improved star field with depth layers */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: i % 3 === 0 ? '#EC4899' : '#A855F7',
              opacity: Math.random() * 0.7 + 0.3,
              filter: 'blur(0.5px)',
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
              zIndex: Math.floor(Math.random() * 3)
            }}
          />
        ))}

        {/* Animated grid background */}
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="content-container animate-fade-in relative px-2 xxs:px-4 sm:px-6">
          <div className="space-y-3 xxs:space-y-4 sm:space-y-6">
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-1.5 xxs:gap-2 sm:gap-3 
                 px-2 xxs:px-3 sm:px-4 
                 py-1 xxs:py-1.5 sm:py-2 
                 rounded-full 
                 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 
                 border border-purple-500/20 backdrop-blur-md 
                 hover:bg-purple-500/10 hover:border-purple-500/30 transition-colors">
              <div className="relative w-1 xxs:w-1.5 sm:w-2 h-1 xxs:h-1.5 sm:h-2">
                <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                <div className="relative rounded-full bg-green-400 w-1 xxs:w-1.5 sm:w-2 h-1 xxs:h-1.5 sm:h-2" />
              </div>
              <span className="text-xs xxs:text-sm sm:text-base text-gray-300 font-medium">Seeking New Challenges</span>
            </div>

            {/* Enhanced Name Display */}
            <div className="space-y-2 xxs:space-y-3 sm:space-y-4">
              <h1 className="text-3xl xxs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-tight">
                <span className="relative inline-block">
                  <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r 
                                 from-purple-400 via-pink-400 to-purple-400 animate-gradient-text">
                    Amar Zuga
                  </span>
                  <span className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                                 blur-xl opacity-50 animate-pulse-slow" />
                </span>
              </h1>

              <div className="max-w-3xl space-y-3 xxs:space-y-4 sm:space-y-6">
                <p className="text-lg xxs:text-xl sm:text-2xl md:text-3xl lg:text-[2rem] text-gray-200 font-medium leading-tight">
                  I craft exceptional digital experiences through customer support, design, and IT solutions.
                </p>
                <p className="text-sm xxs:text-base sm:text-lg lg:text-[1.125rem] text-gray-400 leading-relaxed">
                  A versatile professional focused on delivering high-quality results across multiple domains. 
                  I combine technical expertise with creative problem-solving to help businesses thrive in the digital space.
                </p>
                
                <div className="pt-3 xxs:pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 xxs:gap-3 sm:gap-4">
                  <a
                    href="https://drive.usercontent.google.com/u/0/uc?id=1W_LftBMLaexw7buPbPpJDGmI5wSo6Ls5&export=download"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center sm:inline-flex gap-1.5 xxs:gap-2 px-3 xxs:px-4 sm:px-6 py-2 xxs:py-2.5 sm:py-3 rounded-full 
                             bg-gradient-to-r from-purple-500 to-pink-500
                             hover:from-purple-600 hover:to-pink-600
                             transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-1 text-white text-sm font-medium">
                      <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                        />
                      </svg>
                      Download CV
                      <span className="text-sm opacity-80">(PDF)</span>
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    </div>
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-500/50 to-pink-500/50 blur-md" />
                  </a>

                  <button
                    onClick={() => window.open('https://drive.google.com/file/d/1W_LftBMLaexw7buPbPpJDGmI5wSo6Ls5/view', '_blank')}
                    className="flex items-center justify-center px-4 py-2.5 sm:py-2 rounded-full border border-purple-500/30 
                             text-purple-400 hover:text-purple-300 hover:border-purple-500/50
                             hover:bg-purple-500/10 transition-all duration-300"
                  >
                    <span className="text-sm">Preview</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-2">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-purple-500/5 text-gray-400 text-sm sm:text-base hover:bg-purple-500/10 transition-colors">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>Bosnia and Herzegovina, Sarajevo </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-purple-500/5 text-gray-400 text-sm sm:text-base hover:bg-purple-500/10 transition-colors">
                <Mail className="w-4 h-4 text-purple-400" />
                <a href="mailto:zuga677@gmail.com" className="hover:text-purple-400 transition-colors">
                  zuga677@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Services */}
      <div className="grid grid-cols-1 gap-2 xxs:gap-3 sm:gap-6 
                 sm:grid-cols-1 lg:grid-cols-3" role="list" aria-label="Core services">
        {[
          {
            icon: <HeadsetIcon className="w-8 h-8" />,
            title: "Customer Support",
            description: "Delivering exceptional customer experiences with personalized support solutions.",
            pros: ["24/7 availability", "Quick response time", "Multi-channel support"],
            features: ["Issue resolution tracking", "Customer feedback integration", "Process optimization"],
            color: "from-green-500 to-emerald-500"
          },
          {
            icon: <Palette className="w-8 h-8" />,
            title: "Creative Design Solutions",
            description: "Crafting visually stunning and purposeful design experiences.",
            pros: ["Brand-focused approach", "Modern aesthetics", "User-centric design"],
            features: ["Visual identity creation", "UI/UX design", "Marketing materials"],
            color: "from-purple-500 to-pink-500"
          },
          {
            icon: <Code className="w-8 h-8" />,
            title: "Technical Expertise",
            description: "Implementing robust technical solutions for business efficiency.",
            pros: ["System optimization", "Problem-solving", "Technical documentation"],
            features: ["IT infrastructure", "Software solutions", "Technical support"],
            color: "from-blue-500 to-cyan-500"
          }
        ].map((service, index) => (
          <div key={index} className="glass rounded-xl group relative">
            <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-sm" />
            <div className="relative p-8 h-full flex flex-col">
              <div className="mb-6">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.color} bg-opacity-10 mb-4`}>
                  {React.cloneElement(service.icon, { className: "text-white" })}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>

              <div className="flex-grow space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-purple-400 mb-2">Key Benefits</h4>
                  <ul className="space-y-2">
                    {service.pros.map((pro, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-purple-400 mb-2">Features</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Achievements */}
      <div className="content-container px-3 xxs:px-5 sm:px-8">
        <h3 className="text-lg xxs:text-xl sm:text-2xl font-bold mb-4 xxs:mb-6 sm:mb-8 
             bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
          Professional Impact 
        </h3>
        <div className="grid grid-cols-2 gap-2 xxs:gap-2 sm:gap-2 md:gap-3
             sm:grid-cols-2 md:grid-cols-4">
          {[
            { icon: <FolderGit2 />, value: "3+", label: "Years Experience" },
            { icon: <BookCheck />, value: "20+", label: "Projects Completed" },
            { icon: <Star />, value: "96%", label: "Client Satisfaction" },
            { icon: <Clock />, value: "24/7", label: "Support Availability" },
            { icon: <Languages />, value: "4", label: "Languages Spoken" },
            { icon: <FolderKanban />, value: "2", label: "Projects in Progress" },
            { icon: <InboxIcon />, value: "3 Hours", label: "Response Time" },
            { icon: <GraduationCap />, value: "1+", label: "Certifications" },
          ].map((stat, index) => (
            <div key={index} 
                 className="p-4 sm:p-6 rounded-xl bg-purple-500/5 hover:bg-purple-500/10 
                          transform hover:scale-105 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center">
                <div className="text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                  {React.cloneElement(stat.icon, { className: "w-6 h-6" })}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="content-container space-y-4 xxs:space-y-6 sm:space-y-8 px-3 xxs:px-6 sm:px-6">
        <h3 className="text-lg xxs:text-xl sm:text-2xl font-bold mb-4 xxs:mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
          Client Testimonials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xxs:gap-3 sm:gap-6">
          {testimonials
        .slice(currentPage * testimonialsPerPage, (currentPage + 1) * testimonialsPerPage)
        .map((testimonial, index) => (
          <div 
            key={`${currentPage}-${index}`}
            className="relative p-3 xxs:p-4 sm:p-6 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 group 
             before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r 
             before:from-purple-500/10 before:to-pink-500/10 before:opacity-0 
             before:transition-opacity before:duration-500 group-hover:before:opacity-100
             after:absolute after:inset-px after:rounded-xl after:bg-gradient-to-br 
             after:from-purple-500/5 after:to-pink-500/5 after:opacity-0 
             after:transition-all after:duration-500 group-hover:after:opacity-100
             overflow-hidden min-h-[180px] xxs:min-h-[200px]"
            style={{
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.05)'
            }}
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex items-center gap-2 xxs:gap-4 mb-3 xxs:mb-4">
            <div className="relative w-10 h-10 xxs:w-14 xxs:h-14">
              <img 
            src={!imgError[testimonial.image] ? testimonial.image : 'default-avatar.png'} 
            alt={testimonial.name} 
            className="w-full h-full rounded-full object-cover"
            onError={() => handleImageError(testimonial.image)}
            loading="lazy"
              />
            </div>
            <div>
              <h4 className="font-semibold text-base xxs:text-lg text-white group-hover:text-purple-400 transition-colors duration-300">
            {testimonial.name}
              </h4>
              <p className="text-xs xxs:text-sm text-purple-400">{testimonial.role}</p>
            </div>
          </div>
          <p className="text-sm xxs:text-s-sm text-gray-300 italic leading-relaxed">
            {testimonial.content}
          </p>
            </div>
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-0 left-[50%] w-[200%] h-[50px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent 
               transform -translate-x-[50%] -translate-y-[80%] rotate-45"></div>
            </div>
          </div>
        ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4 xxs:mt-6 sm:mt-8">
          <button
        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
        disabled={currentPage === 0}
        className="p-1.5 xxs:p-2 rounded-full glass disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous testimonials"
          >
        <svg className="w-4 h-4 xxs:w-6 xxs:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
          </button>
          <div className="flex justify-center items-center gap-1.5 xxs:gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-2 xxs:w-2.5 h-2 xxs:h-2.5 rounded-full transition-all duration-300 ${
          currentPage === index
            ? 'bg-gradient-to-r from-purple-400 to-pink-400 w-4 xxs:w-6'
            : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to testimonial page ${index + 1}`}
            aria-current={currentPage === index ? 'true' : 'false'}
          />
        ))}
          </div>
          <button
        onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
        disabled={currentPage === totalPages - 1}
        className="p-1.5 xxs:p-2 rounded-full glass disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next testimonials"
          >
        <svg className="w-4 h-4 xxs:w-6 xxs:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
          </button>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="content-container relative group overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 
                        group-hover:from-purple-500/10 group-hover:to-pink-500/10 
                        transition-all duration-500" />
        
        <div className="absolute inset-0 opacity-30">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl
                         animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative text-center space-y-4 sm:space-y-6 p-6 sm:p-3">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ready to Start a Project?
          </h3>
          <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Let's create something exceptional together. I'm always excited to take on new challenges 
            and help businesses achieve their goals.
          </p>
          <button 
            onClick={handleContactClick}
            className="px-3 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                      hover:from-purple-600 hover:to-pink-600 transform hover:-translate-y-1 
                      transition-all duration-300 relative group/button overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-white font-medium">
              Get in Touch
              <svg 
                className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-[-1px] bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover/button:opacity-100 blur-sm transition-opacity duration-300" />
            </div>
          </button>
        </div>
      </div>
        {/* Footer */}
        <motion.div 
          className="mt-4 xxs:mt-5 sm:mt-10"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center justify-center space-y-2 text-center text:sm xxs:text-base sm:text-lg text-gray-400">
            <p className="text-[10px] xxs:text-xs sm:text-sm lg:text-base xl:text-lg text-gray-500">© 2025 Amar Zuga. All rights reserved.</p>
            <div className="flex space-x-4 mt-2">
            </div>
          </div>
        </motion.div>
        </div>
  );
};

export default AboutSection;