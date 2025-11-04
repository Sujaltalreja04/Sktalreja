import { motion, useTransform, useViewportScroll } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useResponsive } from '../../hooks/useResponsive';
import { Code, Database, Brain, BarChart3, Server, Globe } from 'lucide-react';

export const AboutSection = () => {
  const [ref, isInView] = useInView();
  const { scrollY } = useViewportScroll();
  const { isSmallScreen } = useResponsive();
  
  // Parallax effect for background elements
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const skills = [
    { name: 'AI & Machine Learning', icon: Brain, level: 95 },
    { name: 'Full-Stack Development', icon: Code, level: 90 },
    { name: 'Data Science', icon: Database, level: 85 },
    { name: 'Data Visualization', icon: BarChart3, level: 80 },
    { name: 'Backend Systems', icon: Server, level: 85 },
    { name: 'Web Technologies', icon: Globe, level: 88 },
  ];

  const experienceItems = [
    {
      role: 'AI Engineer',
      company: 'Zeex AI',
      period: 'Sep 2025 - Present',
      description: 'Developing and deploying machine learning models, integrating AI systems, and optimizing end-to-end data pipelines.'
    },
    {
      role: 'Data Scientist Intern',
      company: 'Prasunet',
      period: 'Mar 2025 - May 2025',
      description: 'Contributed to predictive analytics and data-driven solutions for business intelligence.'
    },
    {
      role: 'Freelance Developer',
      company: 'Independent',
      period: '11+ months',
      description: 'Python development, data analysis, and full-stack applications for various clients.'
    }
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center justify-center py-16 md:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)' }}
    >
      {/* Animated background elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              border: `1px solid rgba(192, 192, 192, 0.3)`,
              top: `${20 + i * 10}%`,
              left: `${10 + i * 15}%`,
              y: parallaxY,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left Column - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text text-transparent"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                ABOUT ME
              </h2>

              <motion.div 
                className="backdrop-blur-md bg-[rgba(26,26,26,0.5)] border border-[rgba(192,192,192,0.2)] rounded-xl p-6 mb-6"
                whileHover={{
                  boxShadow: '0 0 30px rgba(192, 192, 192, 0.2)',
                }}
              >
                <p className="text-gray-300 text-base md:text-lg mb-4 leading-relaxed">
                  Hi, I'm Sujal Talreja — a passionate AI Engineer and Full-Stack Developer dedicated to building intelligent, data-driven solutions that bridge technology and business impact.
                </p>

                <p className="text-gray-300 text-base md:text-lg mb-4 leading-relaxed">
                  I've completed my B.Sc. in Information Technology and am currently pursuing an M.Sc. in Artificial Intelligence & Machine Learning at Ganpat University.
                </p>

                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  I'm working as an AI Engineer at Zeex AI, where I focus on developing and deploying machine learning models, integrating AI systems, and optimizing end-to-end data pipelines.
                </p>
              </motion.div>
            </div>

            {/* Experience Section */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-200 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <Code className="text-gray-400" />
                Experience
              </h3>

              <div className="space-y-4">
                {experienceItems.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="backdrop-blur-md bg-[rgba(26,26,26,0.5)] border border-[rgba(192,192,192,0.2)] rounded-xl p-5"
                    whileHover={{
                      scale: isSmallScreen ? 1 : 1.02,
                      boxShadow: '0 0 25px rgba(192, 192, 192, 0.3)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-wrap justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-gray-200">{exp.role}</h4>
                      <span className="text-sm bg-[rgba(192,192,192,0.1)] px-2 py-1 rounded text-gray-400">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{exp.company}</p>
                    <p className="text-gray-300 text-sm">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills and Additional Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Skills Section */}
            <div className="mt-0">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-200 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <Brain className="text-gray-400" />
                Core Skills
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={index}
                      className="backdrop-blur-md bg-[rgba(26,26,26,0.5)] border border-[rgba(192,192,192,0.2)] rounded-xl p-4"
                      whileHover={{
                        scale: isSmallScreen ? 1 : 1.02,
                        boxShadow: '0 0 25px rgba(192, 192, 192, 0.3)',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="text-gray-400" size={20} />
                        <span className="text-gray-200 font-medium">{skill.name}</span>
                      </div>
                      <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-gray-500 to-gray-300 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                      <div className="text-right text-xs text-gray-400 mt-1">{skill.level}%</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};