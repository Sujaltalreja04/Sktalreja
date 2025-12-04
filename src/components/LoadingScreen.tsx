import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const bootMessages = [
  { text: '> Initializing Eranix AI Core...', delay: 0 },
  { text: '> Loading Neural Networks...', delay: 400 },
  { text: '> Booting Voice Recognition System...', delay: 800 },
  { text: '> Rendering 3D Assets...', delay: 1200 },
  { text: '> Compiling Portfolio Components...', delay: 1600 },
  { text: '> System Ready', delay: 2000 }
];

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showVoiceWave, setShowVoiceWave] = useState(false);

  useEffect(() => {
    // Smooth progress animation
    const duration = 2500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      if (percentage < 100) {
        requestAnimationFrame(animate);
      } else {
        // Show voice wave before completing
        setShowVoiceWave(true);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 600);
        }, 800);
      }
    };

    animate();

    // Show boot messages progressively
    bootMessages.forEach((msg, index) => {
      setTimeout(() => {
        setVisibleMessages(index + 1);
      }, msg.delay);
    });
  }, [onComplete]);

  // Generate random binary numbers for matrix effect
  const BinaryRain = () => (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-400 text-xs font-mono"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
          }}
          animate={{
            y: ['0vh', '120vh'],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 2,
          }}
        >
          {Array.from({ length: 15 }).map(() => (Math.random() > 0.5 ? '1' : '0')).join('')}
        </motion.div>
      ))}
    </div>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 bg-[#0a0a0a] z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* Binary code rain background */}
          <BinaryRain />

          {/* Scanline effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
          />

          {/* Main content */}
          <div className="relative z-10 w-full max-w-3xl px-6">
            {/* Terminal window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-sm bg-black/40 border border-gray-700/50 rounded-lg p-8 shadow-2xl"
              style={{
                boxShadow: '0 0 50px rgba(100, 100, 100, 0.1), inset 0 0 30px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-gray-500 text-sm ml-4 font-mono">
                  system@sujal-portfolio ~ $
                </span>
              </div>

              {/* Boot messages */}
              <div className="space-y-3 mb-6 min-h-[180px]">
                {bootMessages.slice(0, visibleMessages).map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`font-mono text-sm ${index === bootMessages.length - 1
                        ? 'text-green-400'
                        : 'text-gray-400'
                      }`}
                  >
                    {msg.text}
                    {index < bootMessages.length - 1 && progress > (index + 1) * 16.67 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="ml-3 text-green-400"
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                {visibleMessages === bootMessages.length && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-gray-400 font-mono"
                  >
                    _
                  </motion.span>
                )}
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-gray-500">
                  <span>Loading...</span>
                  <span>{Math.floor(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/30">
                  <motion.div
                    className="h-full bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {/* Progress bar glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </motion.div>
                </div>
              </div>

              {/* Voice wave animation when complete */}
              {showVoiceWave && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 flex flex-col items-center"
                >
                  {/* Voice wave bars */}
                  <div className="flex items-center gap-1.5 h-16 mb-4">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 bg-gradient-to-t from-gray-600 to-gray-400 rounded-full"
                        animate={{
                          height: [
                            '20%',
                            `${30 + Math.random() * 70}%`,
                            '20%',
                          ],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: 2,
                          delay: i * 0.05,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>

                  {/* Welcome message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <p className="text-gray-400 text-sm font-mono mb-2">🎙️ Voice Recognition Active</p>
                    <h2
                      className="text-3xl font-black bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 bg-clip-text text-transparent"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      WELCOME, I'M SUJAL T
                    </h2>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* Corner accent lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5 }}
              className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-gray-600"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-gray-600"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};