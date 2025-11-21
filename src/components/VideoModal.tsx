import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export const VideoModal = ({ isOpen, onClose, videoUrl, title }: VideoModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsPlaying(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsPlaying(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop with glassmorphism */}
          <motion.div
            className="absolute inset-0 backdrop-blur-xl bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-5xl mx-auto"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Modal Content with matching site UI/UX */}
            <div className="relative backdrop-blur-2xl bg-[rgba(26,26,26,0.95)] border-2 border-[rgba(192,192,192,0.3)] rounded-2xl overflow-hidden shadow-2xl">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/20 via-transparent to-gray-700/20 pointer-events-none" />
              
              {/* Header */}
              <div className="relative flex items-center justify-between p-4 md:p-6 border-b border-[rgba(192,192,192,0.2)]">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center"
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Play className="w-5 h-5 text-gray-300" />
                  </motion.div>
                  <h3
                    className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {title}
                  </h3>
                </div>

                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full backdrop-blur-md bg-[rgba(192,192,192,0.1)] border border-[rgba(192,192,192,0.3)] flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 90,
                    boxShadow: '0 0 20px rgba(192, 192, 192, 0.4)' 
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Video Container */}
              <div className="relative p-4 md:p-6">
                <motion.div
                  className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-[rgba(192,192,192,0.2)] shadow-inner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <p>Invalid video URL</p>
                    </div>
                  )}
                </motion.div>

                {/* Decorative elements matching site theme */}
                <div className="absolute top-8 left-8 w-20 h-20 bg-gradient-to-br from-gray-600/20 to-transparent rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-8 right-8 w-32 h-32 bg-gradient-to-tl from-gray-700/20 to-transparent rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* Footer with subtle branding */}
              <div className="relative px-4 md:px-6 pb-4 md:pb-6">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 animate-pulse" />
                  <span style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    EVOLVEX AI PROJECT DEMO
                  </span>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Glow effect around modal */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-600/10 via-gray-500/10 to-gray-700/10 blur-3xl rounded-2xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
