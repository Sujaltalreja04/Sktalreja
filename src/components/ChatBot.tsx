import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: 'assistant', content: 'Hello! I\'m Eranix AI, your guide to this portfolio. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Create context about the portfolio
      const portfolioContext = `
        You are Eranix AI, an intelligent assistant for Sujal Talreja's portfolio website.
        Your role is to help visitors learn about Sujal and his work.
        
        Key Information About Sujal:
        - AI/ML Engineer and Full Stack Developer
        - Specializes in Deep Learning, Computer Vision, and AI-powered applications
        - Has worked on projects like:
          * AI Based Deepfake Detection System (Python, TensorFlow, OpenCV, Streamlit)
          * QuickCourt - AI-based sports booking platform (React, TypeScript, Firebase, Llama)
          * Evolvex AI - AI-based career suggestion platform (Streamlit, Llama, Gemini)
          * Cybreon - AI-powered robotic brain software (Python, AI, Robotics)
          * Weblancer Tech - Full stack freelance platform (React.js, Next.js, Three.js)
        - Achievements:
          * Ranked Top 5 in Odoo Hackathon 2025
          * Ranked Top 15 at Hack KRMU 4.0
          * 2nd Rank in Blog Competition on deepfake detection
          * AI+ Prompt Engineer Level 1™ certified
        - Certifications:
          * Google Analytics Certified
          * Microsoft PowerBi Certified
          * Analytics Vidhya Generative AI Certified
          * Google Analytics IQ Certified
        - Skills: Python, AI, Machine Learning, Deep Learning, Computer Vision, React, TypeScript, etc.
        
        Answer questions about Sujal's projects, skills, achievements, and experience.
        Be helpful, concise, and professional.
        If asked about information not provided, politely explain your knowledge is limited to the portfolio content.
      `;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: portfolioContext },
            ...newMessages.map(msg => ({ role: msg.role, content: msg.content }))
          ],
          temperature: 0.7,
          max_tokens: 512,
          top_p: 1,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.choices[0].message.content };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-[rgba(192,192,192,0.3)] backdrop-blur-md shadow-lg z-50 flex items-center justify-center cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MessageCircle className="text-gray-300" size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 h-96 rounded-xl bg-[rgba(26,26,26,0.9)] border border-[rgba(192,192,192,0.3)] backdrop-blur-md shadow-2xl z-50 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
          >
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <h3 className="text-gray-100 font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Eranix AI
                </h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-gray-100'
                        : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-[rgba(192,192,192,0.2)]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Sujal's work..."
                  className="flex-1 bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-gradient-to-br from-gray-600 to-gray-800 border border-[rgba(192,192,192,0.3)] rounded-lg p-2 text-gray-300 hover:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;