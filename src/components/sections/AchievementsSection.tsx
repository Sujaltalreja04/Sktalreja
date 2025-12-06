import { motion, useTransform, useViewportScroll } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useResponsive } from '../../hooks/useResponsive';
import { Trophy, Zap, Award, Users, FileText, BookOpen } from 'lucide-react';
import { useState } from 'react';

const achievements = [
  {
    id: 1,
    title: "2nd Rank in Blog Competition",
    description: "Blog on identifying deepfake images secured 2nd rank university-wide",
    icon: BookOpen,
    date: "2024",
    category: "Competition",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQGUqoBUTGH4nQ/profile-treasury-image-shrink_800_800/B4DZdpwZ39HMAY-/0/1749825986879?e=1762405200&v=beta&t=OY3hgTOtBmLTzcz_MS1XMGFmSdLM_Y9bCEUsq32Hz58",
    highlight: "top-2"
  },
  {
    id: 2,
    title: "Ranked Top 5 in 24 hour Long Odoo Hackathon 2025",
    description: "Made Quick Court - an AI-based sports booking platform which placed my team into top 5 from 250 teams",
    icon: Trophy,
    date: "2025",
    category: "Hackathon",
    highlight: "top-5",
    image: "https://raw.githubusercontent.com/Sujaltalreja04/QuickCourt---A-Local-Sports-Booking-team-217-odoo-hackathon-2025/refs/heads/main/567128918_804690552402142_4521860376049865453_n.jpg"
  },
  {
    id: 3,
    title: "Ranked In top 15 At Krmu 4.0 Hackathon",
    description: "Achieved top 15 ranking in Krmu 4.0 Hackathon among hundreds of participants",
    icon: Trophy,
    date: "2024",
    category: "Hackathon",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQGfef8fJhGhVQ/profile-treasury-image-shrink_800_800/B4DZVDCg8YHkAY-/0/1740586488318?e=1762689600&v=beta&t=av9byV0P4vmyaSCQPTtLRyktedD5ry_mY8nqmB4ktZg",
    highlight: "top-15"
  },
  {
    id: 4,
    title: "AI+ Prompt Engineer Level 1™",
    description: "I was awarded the AI+ Prompt Engineer Level 1™ certification by AI Certs™ after excelling in a surprise test conducted during a workshop. I secured a top 5 rank, scoring 98 out of 100, and successfully met all the certification requirements",
    icon: Award,
    date: "2024",
    category: "Certification",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQEo5j_IGtdUAA/profile-treasury-image-shrink_800_800/B4DZYO4xcpHwAc-/0/1744006486573?e=1762693200&v=beta&t=EAqNkxrIiT4EY1TlsCouxTPhpXf5K82ZQhTR9i_wv0s",
    highlight: "top-5"
  }
];

const hackathons = [
  {
    id: 1,
    name: "Odoo Hackathon 2025",
    project: "Quick Court - AI-based Full Stack Web App",
    position: "Top 5",
    participants: "250 teams",
    icon: Zap,
    date: "2025",
    location: "Gandhinagar, Gujarat",
    highlight: true,
    image: "https://raw.githubusercontent.com/Sujaltalreja04/QuickCourt---A-Local-Sports-Booking-team-217-odoo-hackathon-2025/refs/heads/main/567128918_804690552402142_4521860376049865453_n.jpg",
    description: "A 24-hour large hackathon participated in Gandhinagar where I got into finals of round 2, ranked in top 5. I made Quick Court, an AI-based sports booking platform with AI-based chatbot and payment integration using Razorpay.",
    tags: ["Full Stack", "Llama", "MySQL", "Python", "SEO"]
  },
  {
    id: 2,
    name: "Top 15 At Hack KRMU 4.0",
    project: "Achieved top 15 ranking in KRMU 4.0 Hackathon among hundreds of participants",
    position: "Top 15",
    participants: "Hundreds of participants",
    icon: Zap,
    date: "2024",
    location: "Gurgram, Delhi",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQGfef8fJhGhVQ/profile-treasury-image-shrink_800_800/B4DZVDCg8YHkAY-/0/1740586488318?e=1762689600&v=beta&t=av9byV0P4vmyaSCQPTtLRyktedD5ry_mY8nqmB4ktZg"
  }
];

const certifications = [
  {
    id: 1,
    name: "Google Analytics Certified",
    issuer: "Google",
    date: "2024",
    icon: FileText,
    credential: "7ab84ae7-fe60-4374-9261-81c34b8fdd84",
    image: "https://i.ibb.co/dwXkM4dC/Screenshot-2025-11-02-180237.png",
    link: "https://skillshop.credential.net/7ab84ae7-fe60-4374-9261-81c34b8fdd84#acc.JDVrgKxd"
  },
  {
    id: 2,
    name: "Microsoft PowerBi Certified",
    issuer: "Microsoft",
    date: "2024",
    icon: FileText,
    credential: "PowerBi-2024",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQE75_yhTWXz9w/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1711371258825?e=1762693200&v=beta&t=aG-RudOIvLVjUV-YuzjHilP6Fe8KTGbGSAqmX-SjsIU",
    link: "https://media.licdn.com/dms/image/v2/D4D2DAQE75_yhTWXz9w/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1711371258825?e=1762693200&v=beta&t=aG-RudOIvLVjUV-YuzjHilP6Fe8KTGbGSAqmX-SjsIU"
  },
  {
    id: 3,
    name: "Analytics Vidhya Generative AI Certified",
    issuer: "Analytics Vidhya",
    date: "2024",
    icon: FileText,
    credential: "GenAI-2024",
    image: "https://i.ibb.co/JVP5hZ9/1760248288377-3.png",
    link: "https://ibb.co/JVP5hZ9"
  },
  {
    id: 4,
    name: "Google Analytics IQ Certified",
    issuer: "Google",
    date: "2024",
    icon: FileText,
    credential: "GA-IQ-2024",
    image: "https://i.ibb.co/JT4sZDm/Screenshot-2025-11-02-181344.png",
    link: "https://skillshop.exceedlms.com/student/award/NBQZ5d1M8fcvakfMJwkm2cXR"
  }
];

export const AchievementsSection = () => {
  const [ref, isInView] = useInView();
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const { scrollY } = useViewportScroll();
  const { isSmallScreen } = useResponsive();

  // Parallax effect for background elements
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -100]);

  const toggleFlip = (id: number) => {
    setFlippedCards(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

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

  // Badge data for achievements
  const badgeData = [
    { id: 1, name: "AI Innovator", icon: "🤖", color: "from-blue-500 to-cyan-500", description: "Created Cybreon - AI-powered robotic brain software" },
    { id: 2, name: "Hackathon Star", icon: "🏆", color: "from-yellow-500 to-amber-500", description: "Top 5 at Odoo Hackathon 2025 with QuickCourt" },
    { id: 3, name: "Prompt Engineer", icon: "🧠", color: "from-purple-500 to-pink-500", description: "AI+ Prompt Engineer Level 1™ certified" },
    { id: 4, name: "Full Stack Dev", icon: "💻", color: "from-green-500 to-emerald-500", description: "Built 12+ freelance web applications" },
    { id: 5, name: "Data Scientist", icon: "📊", color: "from-indigo-500 to-purple-500", description: "Expert in data analysis and visualization" },
    { id: 6, name: "Tech Leader", icon: "🚀", color: "from-gray-500 to-gray-300", description: "Led team of 3 junior engineers at Zeex AI" },
  ];

  return (
    <section
      id="achievements"
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
        >
          <motion.div variants={itemVariants}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text text-transparent"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              ACHIEVEMENTS & CERTIFICATIONS
            </h2>
          </motion.div>

          {/* Custom Achievement Badges Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-100 flex items-center gap-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <Award className="text-yellow-400" size={28} />
              Achievement Badges
              <div className="h-px flex-1 bg-gradient-to-r from-yellow-400/30 to-transparent"></div>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
              {badgeData.map((badge) => (
                <motion.div
                  key={badge.id}
                  className="relative flex flex-col items-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {badge.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  </div>
                  <span className="mt-2 text-xs text-gray-300 text-center">{badge.name}</span>
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 w-32 text-center">
                    {badge.description}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-400 max-w-2xl mx-auto">
                These badges represent key skills and accomplishments throughout my career. Hover over each badge to see details.
              </p>
            </div>
          </motion.div>

          <div className="space-y-12">
            {/* Achievements Section */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-100 flex items-center gap-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <Trophy className="text-yellow-400" size={28} />
                Achievements
                <div className="h-px flex-1 bg-gradient-to-r from-yellow-400/30 to-transparent"></div>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  const isFlipped = flippedCards.includes(achievement.id);

                  return (
                    <div
                      key={achievement.id}
                      className="relative h-72"
                      style={{ perspective: '1000px' }}
                    >
                      <motion.div
                        className="relative w-full h-full transition-transform duration-700 preserve-3d"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Front of card (Trophy details) */}
                        <motion.div
                          className="absolute inset-0 backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.3)] rounded-2xl p-6 backface-hidden cursor-pointer"
                          style={{
                            backfaceVisibility: 'hidden',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                          }}
                          onClick={() => toggleFlip(achievement.id)}
                          whileHover={{
                            scale: isSmallScreen ? 1 : 1.03,
                            boxShadow: '0 0 30px rgba(192, 192, 192, 0.4)',
                            y: -5
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex flex-wrap justify-between items-start mb-3">
                            <div className="flex items-center gap-3 mb-2">
                              <Icon className="text-gray-400" size={20} />
                              <h4 className="text-xl font-bold text-gray-100">{achievement.title}</h4>
                            </div>
                            <span className="text-sm bg-[rgba(192,192,192,0.2)] px-3 py-1.5 rounded-full text-gray-300">
                              {achievement.date}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-3">{achievement.category}</p>
                          <p className="text-gray-200 text-base mb-4 font-medium">{achievement.description}</p>
                          {achievement.highlight && (
                            <div className="mt-4">
                              <span className={`inline-block text-sm px-3 py-1.5 rounded-full font-semibold ${achievement.highlight === 'top-2'
                                ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-400/30'
                                : achievement.highlight === 'top-5'
                                  ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-400/30'
                                  : 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-400/30'
                                }`}>
                                {achievement.highlight === 'top-2' ? '2nd Place' :
                                  achievement.highlight === 'top-5' ? 'Top 5' : 'Top 15'}
                              </span>
                            </div>
                          )}
                          <div className="absolute bottom-4 right-4 text-gray-500 text-xs">
                            Click to flip
                          </div>
                        </motion.div>

                        {/* Back of card (Thumbnail) */}
                        <div
                          className="absolute inset-0 backdrop-blur-md bg-[rgba(26,26,26,0.9)] border border-[rgba(192,192,192,0.3)] rounded-2xl p-6 backface-hidden cursor-pointer"
                          style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                          }}
                          onClick={() => toggleFlip(achievement.id)}
                        >
                          {achievement.image ? (
                            <>
                              <h4 className="text-xl font-bold text-gray-100 mb-4">{achievement.title}</h4>
                              <div className="h-40 rounded-lg overflow-hidden">
                                <img
                                  src={achievement.image}
                                  alt={achievement.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="absolute bottom-4 right-4 text-gray-500 text-xs">
                                Click to flip back
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                              <Icon size={40} className="mb-4" />
                              <p>No image available</p>
                              <div className="absolute bottom-4 right-4 text-gray-500 text-xs">
                                Click to flip back
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Hackathons Section */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-100 flex items-center gap-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <Zap className="text-yellow-400" size={28} />
                Hackathons
                <div className="h-px flex-1 bg-gradient-to-r from-yellow-400/30 to-transparent"></div>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {hackathons.map((hackathon) => {
                  const Icon = hackathon.icon;

                  // Check if this is the Odoo hackathon that should have flip functionality
                  if (hackathon.id === 1) {
                    const isFlipped = flippedCards.includes(hackathon.id);

                    return (
                      <div
                        key={hackathon.id}
                        className="relative h-88"
                        style={{ perspective: '1000px' }}
                      >
                        <motion.div
                          className="relative w-full h-full transition-transform duration-700 preserve-3d"
                          animate={{ rotateY: isFlipped ? 180 : 0 }}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          {/* Front of card (Basic hackathon info) */}
                          <motion.div
                            className="absolute inset-0 backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.3)] rounded-2xl p-6 backface-hidden cursor-pointer"
                            style={{
                              backfaceVisibility: 'hidden',
                              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                            }}
                            onClick={() => toggleFlip(hackathon.id)}
                            whileHover={{
                              scale: isSmallScreen ? 1 : 1.03,
                              boxShadow: '0 0 30px rgba(192, 192, 192, 0.4)',
                              y: -5
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex flex-wrap justify-between items-start mb-3">
                              <h4 className="text-xl font-bold text-gray-100">{hackathon.name}</h4>
                              <span className="text-sm bg-[rgba(192,192,192,0.2)] px-3 py-1.5 rounded-full text-gray-300">
                                {hackathon.date}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-3 flex items-center gap-1">
                              <Icon className="text-gray-500" size={16} />
                              {hackathon.location}
                            </p>
                            <p className="text-gray-200 text-base mb-4 font-medium">{hackathon.project}</p>
                            {hackathon.image && (
                              <div className="mb-4 rounded-lg overflow-hidden">
                                <img
                                  src={hackathon.image}
                                  alt={hackathon.name}
                                  className="w-full h-32 object-cover"
                                />
                              </div>
                            )}
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[rgba(192,192,192,0.2)]">
                              <p className="text-gray-400 text-sm flex items-center gap-1">
                                <Users className="text-gray-500" size={16} />
                                {hackathon.participants}
                              </p>
                              <span className={`text-sm px-3 py-1.5 rounded-full font-semibold ${hackathon.position.includes('Top') || hackathon.position.includes('1st') || hackathon.position.includes('2nd')
                                ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-400/30'
                                : 'bg-[rgba(192,192,192,0.1)] text-gray-300'
                                }`}>
                                {hackathon.position}
                              </span>
                            </div>
                            <div className="absolute bottom-4 right-4 text-gray-500 text-xs">
                              Click to flip
                            </div>
                          </motion.div>

                          {/* Back of card (Detailed hackathon info) */}
                          <div
                            className="absolute inset-0 backdrop-blur-md bg-[rgba(26,26,26,0.9)] border border-[rgba(192,192,192,0.3)] rounded-2xl p-6 backface-hidden cursor-pointer overflow-y-auto"
                            style={{
                              backfaceVisibility: 'hidden',
                              transform: 'rotateY(180deg)',
                              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                            }}
                            onClick={() => toggleFlip(hackathon.id)}
                          >
                            <h4 className="text-xl font-bold text-gray-100 mb-2">{hackathon.name}</h4>
                            <p className="text-gray-400 text-sm mb-4">{hackathon.description}</p>

                            <div className="mb-4">
                              <h5 className="text-lg font-semibold text-gray-200 mb-2">Tech Stack</h5>
                              <div className="flex flex-wrap gap-2">
                                {hackathon.tags && hackathon.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="text-xs backdrop-blur-md bg-[rgba(192,192,192,0.1)] border border-[rgba(192,192,192,0.2)] px-3 py-1.5 rounded-full text-gray-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[rgba(192,192,192,0.2)]">
                              <p className="text-gray-400 text-sm flex items-center gap-1">
                                <Users className="text-gray-500" size={16} />
                                {hackathon.participants}
                              </p>
                              <span className={`text-sm px-3 py-1.5 rounded-full font-semibold ${hackathon.position.includes('Top') || hackathon.position.includes('1st') || hackathon.position.includes('2nd')
                                ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-400/30'
                                : 'bg-[rgba(192,192,192,0.1)] text-gray-300'
                                }`}>
                                {hackathon.position}
                              </span>
                            </div>

                            <div className="absolute bottom-4 right-4 text-gray-500 text-xs">
                              Click to flip back
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    );
                  } else {
                    // Regular hackathon card (no flip functionality)
                    return (
                      <motion.div
                        key={hackathon.id}
                        className={`backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.3)] rounded-2xl p-6 ${hackathon.highlight ? 'ring-2 ring-yellow-400/30' : ''}`}
                        whileHover={{
                          scale: isSmallScreen ? 1 : 1.03,
                          boxShadow: '0 0 30px rgba(192, 192, 192, 0.4)',
                          y: -5
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex flex-wrap justify-between items-start mb-3">
                          <h4 className="text-xl font-bold text-gray-100">{hackathon.name}</h4>
                          <span className="text-sm bg-[rgba(192,192,192,0.2)] px-3 py-1.5 rounded-full text-gray-300">
                            {hackathon.date}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3 flex items-center gap-1">
                          <Icon className="text-gray-500" size={16} />
                          {hackathon.location}
                        </p>
                        <p className="text-gray-200 text-base mb-4 font-medium">{hackathon.project}</p>
                        {hackathon.image && (
                          <div className="mb-4 rounded-lg overflow-hidden">
                            <img
                              src={hackathon.image}
                              alt={hackathon.name}
                              className="w-full h-32 object-cover"
                            />
                          </div>
                        )}
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-[rgba(192,192,192,0.2)]">
                          <p className="text-gray-400 text-sm flex items-center gap-1">
                            <Users className="text-gray-500" size={16} />
                            {hackathon.participants}
                          </p>
                          <span className={`text-sm px-3 py-1.5 rounded-full font-semibold ${hackathon.position.includes('Top') || hackathon.position.includes('1st') || hackathon.position.includes('2nd')
                            ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-400/30'
                            : 'bg-[rgba(192,192,192,0.1)] text-gray-300'
                            }`}>
                            {hackathon.position}
                          </span>
                        </div>
                      </motion.div>
                    );
                  }
                })}
              </div>
            </motion.div>

            {/* Certifications Section */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-200 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <FileText className="text-gray-400" />
                Certifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert) => {
                  return (
                    <motion.div
                      key={cert.id}
                      className="backdrop-blur-md bg-[rgba(26,26,26,0.5)] border border-[rgba(192,192,192,0.2)] rounded-xl p-5"
                      whileHover={{
                        scale: isSmallScreen ? 1 : 1.02,
                        boxShadow: '0 0 25px rgba(192, 192, 192, 0.3)',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-gray-200">{cert.name}</h4>
                        <span className="text-sm bg-[rgba(192,192,192,0.1)] px-2 py-1 rounded text-gray-400">
                          {cert.date}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>
                      <p className="text-gray-300 text-sm mb-3">Credential ID: {cert.credential}</p>
                      {cert.image && (
                        <div className="mb-3 rounded-lg overflow-hidden">
                          <img
                            src={cert.image}
                            alt={cert.name}
                            className="w-full h-32 object-cover"
                          />
                        </div>
                      )}
                      {cert.link && (
                        <motion.button
                          className="w-full backdrop-blur-md bg-[rgba(192,192,192,0.1)] border border-[rgba(192,192,192,0.3)] rounded-lg px-3 py-2 text-gray-300 font-semibold flex items-center justify-center gap-2 text-sm"
                          whileHover={{
                            scale: 1.05,
                            boxShadow: '0 0 20px rgba(192, 192, 192, 0.4)',
                          }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => window.open(cert.link, '_blank', 'noopener,noreferrer')}
                        >
                          <FileText className="w-4 h-4" />
                          VIEW CERTIFICATE
                        </motion.button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* GitHub Contributions Section */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-100 flex items-center gap-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <svg className="w-7 h-7 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Contributions
                <div className="h-px flex-1 bg-gradient-to-r from-gray-400/30 to-transparent"></div>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
        {
          year: "2023",
          image: "https://raw.githubusercontent.com/Sujaltalreja04/Sujaltalreja04/refs/heads/main/Screenshot%202025-12-06%20154216.png",
          description: "Building the foundation"
        },
        {
          year: "2024",
          image: "https://raw.githubusercontent.com/Sujaltalreja04/Sujaltalreja04/refs/heads/main/Screenshot%202025-12-06%20154204.png",
          description: "Consistent growth & learning"
        },
        {
          year: "2025",
          image: "https://raw.githubusercontent.com/Sujaltalreja04/Sujaltalreja04/refs/heads/main/Screenshot%202025-12-06%20154148.png",
          description: "Pushing boundaries"
        }
      ].map((contribution) => (
        <motion.div
          key={contribution.year}
          className="backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.3)] rounded-2xl p-6 overflow-hidden"
          whileHover={{
            scale: isSmallScreen ? 1 : 1.03,
            boxShadow: '0 0 30px rgba(192, 192, 192, 0.4)',
            y: -5
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-2xl font-bold bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              {contribution.year}
            </h4>
            <span className="text-sm bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-400/30 px-3 py-1.5 rounded-full font-semibold">
              Active
            </span>
          </div>

          <p className="text-gray-400 text-sm mb-4">{contribution.description}</p>

          <div className="rounded-lg overflow-hidden bg-[rgba(0,0,0,0.3)] p-3">
            <img
              src={contribution.image}
              alt={`GitHub contributions ${contribution.year}`}
              className="w-full h-auto object-contain rounded"
              loading="lazy"
            />
          </div>

          <motion.a
            href="https://github.com/Sujaltalreja04"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full backdrop-blur-md bg-[rgba(192,192,192,0.1)] border border-[rgba(192,192,192,0.3)] rounded-lg px-4 py-2.5 text-gray-300 font-semibold flex items-center justify-center gap-2 text-sm"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 20px rgba(192, 192, 192, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            VIEW ON GITHUB
          </motion.a>
        </motion.div>
      ))}
    </div>

    <div className="mt-6 text-center">
      <p className="text-gray-400 max-w-3xl mx-auto">
        My GitHub contribution graph showcases consistent dedication to coding and open-source development. Each green square represents commits, pull requests, and contributions to various projects.
      </p>
    </div>
  </motion.div>
      </div>
    </motion.div>
      </div>
    </section>
  );
};