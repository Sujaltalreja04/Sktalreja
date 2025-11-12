import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import {
  Code,
  Layers,
  Cpu,
  Wind,
  Database,
  Grid,
  Box,
  GitBranch,
} from 'lucide-react';

const skills = [
  { name: 'Full Stack Development', level: 100, icon: Code, color: '#808080' },
  { name: 'Business Analytics', level: 90, icon: Layers, color: '#909090' },
  { name: 'Story Telling', level: 88, icon: Cpu, color: '#a0a0a0' },
  { name: 'Leadership', level: 92, icon: Wind, color: '#888888' },
  { name: 'Data Science', level: 60, icon: Database, color: '#989898' },
  { name: 'Prompt Engineering', level: 87, icon: Grid, color: '#787878' },
  { name: 'English Communication', level: 100, icon: Box, color: '#b0b0b0' },
  { name: 'Entrepreneurship', level: 90, icon: GitBranch, color: '#888888' },
];

export const SkillsSection = () => {
  const [ref, isInView] = useInView();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="min-h-screen flex items-center justify-center py-16 md:py-20 relative"
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)' }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 md:mb-16 text-center bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text text-transparent"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          TECHNICAL SKILLS
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* SKT Logo - Enlarged version */}
          <div className="flex justify-center lg:justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64">
              {/* Outer rotating rings with particle effects */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 opacity-30"
                  style={{
                    borderColor: `rgba(${192 - i * 30}, ${192 - i * 20}, ${220 - i * 40}, ${0.4 + i * 0.2})`,
                    inset: `${i * 18}px`,
                    boxShadow: `0 0 ${12 + i * 6}px rgba(${192 - i * 30}, ${192 - i * 20}, ${220 - i * 40}, 0.3)`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 20 - i * 5,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    scale: {
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  }}
                />
              ))}

              {/* Particle effects */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-3 h-3 rounded-full bg-gray-400 opacity-60"
                  style={{
                    top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 35}%`,
                    left: `${20 + Math.cos(i * 45 * Math.PI / 180) * 35}%`,
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}

              {/* Central badge with SKT initials */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  scale: 1.1,
                }}
              >
                <div
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative"
                  style={{ 
                    boxShadow: '0 0 40px rgba(192, 192, 192, 0.4)',
                    border: '2px solid rgba(192, 192, 192, 0.3)',
                  }}
                >
                  {/* Inner glow effect */}
                  <div 
                    className="absolute inset-2 rounded-full opacity-30"
                    style={{
                      background: 'radial-gradient(circle, rgba(192,192,192,0.8) 0%, rgba(192,192,192,0) 70%)',
                    }}
                  />
                  
                  <span
                    className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-clip-text text-transparent z-10 relative"
                    style={{ 
                      fontFamily: 'Orbitron, sans-serif',
                      textShadow: '0 0 10px rgba(192, 192, 192, 0.5)',
                    }}
                  >
                    SKT
                  </span>
                </div>
              </motion.div>

              {/* Tooltip on hover */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[rgba(26,26,26,0.8)] border border-[rgba(192,192,192,0.3)] rounded-lg px-3 py-1 text-xs text-gray-300 whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                Sujal Kishore Talreja
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg md:rounded-xl p-4 md:p-6"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(192, 192, 192, 0.3)',
                  }}
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${skill.color} 0%, #606060 100%)`,
                      }}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3
                      className="text-base md:text-lg font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      {skill.name}
                    </h3>
                  </div>

                  <div className="relative h-2 md:h-3 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color} 0%, #a0a0a0 100%)`,
                      }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>

                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">Proficiency</span>
                    <motion.span
                      className="text-xs font-bold text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};