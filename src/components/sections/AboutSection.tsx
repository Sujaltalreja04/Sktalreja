import { motion, useScroll } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useResponsive } from '../../hooks/useResponsive';
import { Code, Database, Brain, BarChart3, Server, Globe, Award, TrendingUp, Users, Zap, Workflow, Cpu } from 'lucide-react';

export const AboutSection = () => {
  const [ref, isInView] = useInView();
  const { scrollYProgress } = useScroll();
  const { isSmallScreen } = useResponsive();



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
      role: 'Founder',
      company: 'Zyntral AI',
      period: 'Oct 2024 - Present',
      description: 'Founded Zyntral AI to build next-generation AI solutions and drive innovation in artificial intelligence. Leading the vision, strategy, and execution of cutting-edge AI products.',
      achievements: [
        'Established AI-first company from the ground up',
        'Developed strategic roadmap for AI product suite',
        'Built high-performing team focused on AI innovation',
        'Created scalable architecture for AI-driven solutions'
      ],
      skillsGained: ['Entrepreneurship', 'Leadership', 'Strategic Planning', 'AI Product Development', 'Business Development'],
      icon: Zap,
      techStack: [
        { name: 'AI/ML', icon: Brain, level: 'Expert' },
        { name: 'Product Strategy', icon: Cpu, level: 'Expert' },
        { name: 'Cloud Architecture', icon: Server, level: 'Advanced' },
        { name: 'Team Leadership', icon: Users, level: 'Expert' }
      ]
    },
    {
      role: 'Data Scientist Intern',
      company: 'Prasunet',
      period: 'Mar 2025 - May 2025',
      description: 'Contributed to predictive analytics and data-driven solutions for business intelligence.',
      achievements: [
        'Built predictive models with 87% accuracy',
        'Created dashboards used by 50+ stakeholders',
        'Identified cost-saving opportunities worth $50K'
      ],
      skillsGained: ['Data Science', 'Data Visualization', 'Business Analytics'],
      icon: TrendingUp,
      techStack: [
        { name: 'Python', icon: Code, level: 'Advanced' },
        { name: 'Pandas', icon: Database, level: 'Expert' },
        { name: 'Tableau', icon: BarChart3, level: 'Intermediate' },
        { name: 'SQL', icon: Server, level: 'Advanced' }
      ]
    },
    {
      role: 'AI Engineer',
      company: 'Zeex AI',
      period: 'Sep 2025 - Present',
      description: 'Developing and deploying machine learning models, integrating AI systems, and optimizing end-to-end data pipelines.',
      achievements: [
        'Deployed 5+ ML models with 92% accuracy',
        'Reduced processing time by 40%',
        'Led a team of 3 junior engineers'
      ],
      skillsGained: ['AI & Machine Learning', 'Leadership', 'Backend Systems'],
      icon: Zap,
      techStack: [
        { name: 'Python', icon: Code, level: 'Expert' },
        { name: 'TensorFlow', icon: Brain, level: 'Advanced' },
        { name: 'Docker', icon: Server, level: 'Intermediate' },
        { name: 'Cloud', icon: Globe, level: 'Advanced' }
      ]
    }
  ];

  // Tech stack evolution data for visualization
  const techEvolution = [
    { name: 'Python', levels: [85, 80, 90, 95], icon: Code },
    { name: 'AI/ML', levels: [95, 40, 0, 30, 70], icon: Brain },
    { name: 'Data Science', levels: [30, 0, 60, 80], icon: Database },
    { name: 'Web Dev', levels: [75, 60, 80, 90], icon: Globe },
    { name: 'Cloud', levels: [20, 0, 40, 70], icon: Server },
    { name: 'Robotics', levels: [90, 0, 0, 0, 0], icon: Cpu },
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
                  Hi, I'm Sujal Talreja — a passionate AI Engineer, Full-Stack Developer, and Entrepreneur dedicated to building intelligent, data-driven solutions that bridge technology and business impact.
                </p>

                <p className="text-gray-300 text-base md:text-lg mb-4 leading-relaxed">
                  I've completed my B.Sc. in Information Technology and am currently pursuing an M.Sc. in Artificial Intelligence & Machine Learning at Ganpat University. I'm also the Founder of Zyntral AI, building next-generation AI solutions and driving innovation in artificial intelligence.
                </p>

                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  I'm working as an AI Engineer at Zeex AI, where I focus on developing and deploying machine learning models, integrating AI systems, and optimizing end-to-end data pipelines.
                </p>
              </motion.div>
            </div>

            {/* Enhanced Experience Section with Timeline */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-200 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <Workflow className="text-gray-400" />
                Experience Journey & Tech Evolution
              </h3>

              {/* Timeline Visualization */}
              <div className="relative pl-8 pb-4 before:absolute before:left-2.5 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-700">
                {experienceItems.map((exp, index) => {
                  const Icon = exp.icon;
                  return (
                    <motion.div
                      key={index}
                      className="relative mb-8 last:mb-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {/* Timeline Node */}
                      <div className="absolute -left-9 top-1 w-5 h-5 rounded-full bg-gray-600 border-4 border-[#0a0a0a] flex items-center justify-center">
                        <Icon className="w-3 h-3 text-gray-300" />
                      </div>

                      <motion.div
                        className="backdrop-blur-md bg-[rgba(26,26,26,0.5)] border border-[rgba(192,192,192,0.2)] rounded-xl p-5"
                        whileHover={{
                          scale: isSmallScreen ? 1 : 1.02,
                          boxShadow: '0 0 25px rgba(192, 192, 192, 0.3)',
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex flex-wrap justify-between items-start mb-3">
                          <h4 className="text-lg font-semibold text-gray-200">{exp.role}</h4>
                          <span className="text-sm bg-[rgba(192,192,192,0.1)] px-2 py-1 rounded text-gray-400 whitespace-nowrap">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{exp.company}</p>
                        <p className="text-gray-300 text-sm mb-4">{exp.description}</p>

                        {/* Achievements */}
                        <div className="mb-4">
                          <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            Key Achievements
                          </h5>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="text-xs text-gray-300 flex items-start">
                                <span className="text-gray-500 mr-2">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack for this role */}
                        <div className="mb-4">
                          <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Tech Stack
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.techStack.map((tech, i) => {
                              const TechIcon = tech.icon;
                              return (
                                <motion.div
                                  key={i}
                                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-[rgba(192,192,192,0.1)] border border-[rgba(192,192,192,0.2)] text-gray-300"
                                  whileHover={{ scale: 1.05 }}
                                  title={`${tech.name} - ${tech.level}`}
                                >
                                  <TechIcon className="w-3 h-3" />
                                  <span className="text-xs">{tech.name}</span>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Skills Gained */}
                        <div>
                          <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Skills Enhanced
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.skillsGained.map((skill, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 rounded-full bg-[rgba(192,192,192,0.1)] text-gray-300 border border-[rgba(192,192,192,0.2)]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
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

            {/* Enhanced Dynamic Tech Stack Evolution Visualization */}
            <div className="mt-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-200 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <Cpu className="text-gray-400" />
                Tech Stack Evolution
              </h3>

              <div className="backdrop-blur-md bg-[rgba(26,26,26,0.5)] border border-[rgba(192,192,192,0.2)] rounded-xl p-5">
                <p className="text-gray-400 text-sm mb-6">
                  My technical expertise has evolved significantly across different roles. Hover over markers to see exact skill levels.
                </p>

                <div className="space-y-6">
                  {techEvolution.map((tech, techIndex) => {
                    const TechIcon = tech.icon;
                    const currentLevel = tech.levels[tech.levels.length - 1];
                    const maxLevel = Math.max(...tech.levels);

                    return (
                      <motion.div
                        key={techIndex}
                        className="space-y-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.6, delay: techIndex * 0.1 }}
                      >
                        {/* Header with icon, name, and current level */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TechIcon className="w-5 h-5 text-gray-300" />
                            <span className="text-gray-200 text-sm font-semibold">{tech.name}</span>
                          </div>
                          <motion.div
                            className="flex items-center gap-2"
                            animate={currentLevel === maxLevel ? {
                              scale: [1, 1.1, 1],
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1
                            }}
                          >
                            <span className="text-xs text-gray-400">Current:</span>
                            <span className="text-sm font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                              {currentLevel}%
                            </span>
                            {currentLevel === maxLevel && (
                              <motion.span
                                className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                Peak
                              </motion.span>
                            )}
                          </motion.div>
                        </div>

                        {/* Enhanced Progress Bar Container */}
                        <div className="relative h-8 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-lg overflow-hidden border border-[rgba(192,192,192,0.1)]">
                          {/* Background gradient effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(192,192,192,0.03)] to-transparent"
                            animate={{ x: [-200, 800] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          />

                          {/* Animated progress segments */}
                          <div className="absolute inset-0 flex">
                            {tech.levels.map((level, roleIndex) => {
                              const segmentWidth = 100 / tech.levels.length;
                              const gradientColors = [
                                ['#4b5563', '#6b7280'], // Founder - Gray
                                ['#6b7280', '#9ca3af'], // Data - Light Gray  
                                ['#9ca3af', '#d1d5db'], // AI - Lighter Gray
                              ];
                              const colors = gradientColors[roleIndex] || gradientColors[2];

                              return (
                                <motion.div
                                  key={roleIndex}
                                  className="h-full relative group cursor-pointer"
                                  style={{ width: `${segmentWidth}%` }}
                                  initial={{ scaleY: 0 }}
                                  animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                                  transition={{
                                    duration: 0.8,
                                    delay: 1 + techIndex * 0.2 + roleIndex * 0.15,
                                    ease: "easeOut"
                                  }}
                                >
                                  {/* Progress fill */}
                                  <motion.div
                                    className="absolute bottom-0 left-0 right-0 rounded-sm"
                                    style={{
                                      height: `${level}%`,
                                      background: `linear-gradient(180deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
                                      boxShadow: level > 0 ? `0 0 10px ${colors[1]}40` : 'none'
                                    }}
                                    whileHover={{
                                      scale: 1.05,
                                      boxShadow: `0 0 20px ${colors[1]}80`
                                    }}
                                  />

                                  {/* Skill level marker at top */}
                                  {level > 0 && (
                                    <motion.div
                                      className="absolute left-1/2 -translate-x-1/2 z-10"
                                      style={{ bottom: `${level}%` }}
                                      initial={{ scale: 0 }}
                                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                                      transition={{
                                        duration: 0.3,
                                        delay: 1.5 + techIndex * 0.2 + roleIndex * 0.15
                                      }}
                                    >
                                      <motion.div
                                        className="w-3 h-3 rounded-full bg-gray-200 border-2 border-[#0a0a0a] shadow-lg"
                                        whileHover={{ scale: 1.5 }}
                                        animate={roleIndex === tech.levels.length - 1 && currentLevel === maxLevel ? {
                                          boxShadow: ['0 0 0px #d1d5db', '0 0 15px #d1d5db', '0 0 0px #d1d5db']
                                        } : {}}
                                        transition={{ duration: 2, repeat: Infinity }}
                                      />

                                      {/* Tooltip on hover */}
                                      <motion.div
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                        initial={{ y: 5 }}
                                        whileHover={{ y: 0 }}
                                      >
                                        <div className="bg-[rgba(26,26,26,0.95)] backdrop-blur-md border border-[rgba(192,192,192,0.3)] rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-xl">
                                          <div className="font-semibold text-gray-200">{experienceItems[roleIndex]?.company || 'Role'}</div>
                                          <div className="text-gray-400">{tech.name}: <span className="text-gray-200 font-bold">{level}%</span></div>
                                        </div>
                                      </motion.div>
                                    </motion.div>
                                  )}
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Role labels with company names */}
                        <div className="flex justify-between text-xs text-gray-500 px-1">
                          {experienceItems.map((exp, i) => (
                            <motion.span
                              key={i}
                              className="text-center hover:text-gray-300 transition-colors cursor-default"
                              whileHover={{ scale: 1.1 }}
                            >
                              {exp.company}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Enhanced Legend */}
                <motion.div
                  className="mt-6 pt-4 border-t border-gray-700"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 2 }}
                >
                  <div className="flex flex-wrap gap-4 justify-center">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-gray-800"></div>
                      <span className="text-xs text-gray-400">Entry Level (0-40%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 border-2 border-gray-800"></div>
                      <span className="text-xs text-gray-400">Intermediate (41-70%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 border-2 border-gray-800"></div>
                      <span className="text-xs text-gray-400">Advanced (71-89%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-gray-800 shadow-lg"></div>
                      <span className="text-xs text-gray-400">Expert (90%+)</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};