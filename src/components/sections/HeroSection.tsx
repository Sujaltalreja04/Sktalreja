import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { RotatingLogo } from '../3d/RotatingLogo';
import { ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <RotatingLogo />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 sm:px-6 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Profile photo added here */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-cyan-400"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute inset-0 rounded-full border border-cyan-300"
                animate={{
                  scale: [1.1, 1.3, 1.1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <img 
                src="https://i.ibb.co/r27s32Hg/1760248288377-3.png" 
                alt="Sujal Talreja" 
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-300 shadow-2xl z-10"
              />
            </div>
          </div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-3 md:mb-4 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SUJAL
          </motion.h1>

          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-400 mb-4 md:mb-6 leading-tight"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            KISHORE KUMAR TALREJA
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Crafting digital experiences where innovation meets elegance
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  const targetPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.3)] rounded-xl text-gray-300 font-semibold transition-all text-sm sm:text-base"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(192, 192, 192, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW WORK
            </motion.button>

            <motion.button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.3)] rounded-xl text-gray-300 font-semibold transition-all text-sm sm:text-base"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(192, 192, 192, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              CONTACT ME
            </motion.button>

            <motion.button
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://drive.google.com/uc?export=download&id=1vLYprjUtDPkr64ynt7bl3xSL2k0r-wEg';
                link.download = 'Sujal_Talreja_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.3)] rounded-xl text-gray-300 font-semibold transition-all text-sm sm:text-base"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(192, 192, 192, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              DOWNLOAD RESUME
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={scrollToNext}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-gray-400"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.2 }}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
        </motion.button>
      </div>
    </section>
  );
};