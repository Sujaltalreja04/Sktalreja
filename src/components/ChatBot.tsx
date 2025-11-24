import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle, Sparkles } from 'lucide-react';

// Suggested questions for users
const SUGGESTED_QUESTIONS = [
  "What are Sujal's main AI projects?",
  "Tell me about InfraSentinel",
  "What skills does Sujal have?",
  "Show me Sujal's achievements",
  "How can I contact Sujal?",
  "What is Evolvex AI?",
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: 'assistant', content: 'Hello! I\'m Eranix AI, your guide to this portfolio. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // Simulate streaming effect for AI responses
  const simulateStreaming = async (text: string) => {
    setIsTyping(true);
    setStreamingMessage('');

    const words = text.split(' ');
    let currentText = '';

    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      setStreamingMessage(currentText);

      // Random delay between 30-80ms for realistic typing
      await new Promise(resolve => setTimeout(resolve, Math.random() * 50 + 30));
    }

    setIsTyping(false);
    return currentText;
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = { role: 'user', content: textToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);
    setShowSuggestions(false);

    // Mark question as used
    if (messageText) {
      setUsedQuestions(prev => [...prev, messageText]);
    }

    try {
      // Create enhanced context about the portfolio
      const portfolioContext = `
        You are Eranix AI, an intelligent assistant for Sujal Talreja's portfolio website.
        Your role is to help visitors learn about Sujal and his work.
        
        Key Information About Sujal:
        - AI/ML Engineer and Full Stack Developer currently working at Zeex AI
        - Specializes in Deep Learning, Computer Vision, Generative AI, and AI-powered applications
        
        CURRENT ACTIVE PROJECTS:
        - InfraSentinel: AI-Based Infrastructure, Roads & Dams Monitoring System (25% complete)
          * Using YOLOv10, PyTorch, OpenCV, FastAPI, Next.js, PostgreSQL, AWS
          * Features: Drone vision, crack detection, predictive maintenance
          * Research phase focusing on infrastructure safety
        
        - Evolvex AI: AI-Based Career Suggestion Platform (60% complete, moving to production)
          * Using Streamlit, Llama, Gemini, XGBoost, MongoDB
          * Career guidance and skill recommendations
        
        CURRENT LEARNING:
        - Cutting-Edge Generative AI (45% progress)
          * Advanced LLMs, RAG systems, AI agents
          * GPT-4, Claude, Gemini, LangChain, Vector Databases
        
        COMPLETED PROJECTS:
        - AI Based Deepfake Detection System (Python, TensorFlow, EfficientNet, OpenCV, Streamlit)
        - QuickCourt - AI-based sports booking platform (React, TypeScript, Firebase, Llama)
        - Cybreon - AI-powered robotic brain software (Python, AI, Robotics)
        - Weblancer Tech - Full stack freelance platform (React.js, Next.js, Three.js)
        - Macro Mind AI - Economy prediction system
        
        ACHIEVEMENTS:
        - Ranked Top 5 in Odoo Hackathon 2025
        - Ranked Top 15 at Hack KRMU 4.0
        - 2nd Rank in Blog Competition on deepfake detection
        - AI+ Prompt Engineer Level 1™ certified
        
        CERTIFICATIONS:
        - Google Analytics Certified
        - Microsoft PowerBI Certified
        - Analytics Vidhya Generative AI Certified
        
        SKILLS: Python, AI, Machine Learning, Deep Learning, Computer Vision, NLP, React, TypeScript, Next.js, Three.js, Node.js, MongoDB, PostgreSQL, AWS, etc.
        
        Answer questions helpfully and concisely. Be enthusiastic about Sujal's work.
        If asked about projects, focus on InfraSentinel and Evolvex as current priorities.
        Mention the development roadmap section for real-time project updates.
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
      const aiResponse = data.choices[0].message.content;

      // Simulate streaming
      const streamedText = await simulateStreaming(aiResponse);

      const aiMessage = { role: 'assistant', content: streamedText };
      setMessages(prev => [...prev, aiMessage]);
      setStreamingMessage('');
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
      setStreamingMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Get available suggestions (not used yet)
  const availableSuggestions = SUGGESTED_QUESTIONS.filter(q => !usedQuestions.includes(q)).slice(0, 3);

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
        {/* Pulsing indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] rounded-xl bg-[rgba(26,26,26,0.95)] border border-[rgba(192,192,192,0.3)] backdrop-blur-md shadow-2xl z-50 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-3 h-3 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h3 className="text-gray-100 font-bold flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <Sparkles size={16} className="text-yellow-400" />
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

            {/* Messages */}
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
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${message.role === 'user'
                        ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-gray-100'
                        : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-200'
                      }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}

              {/* Streaming message */}
              {isTyping && streamingMessage && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="max-w-[85%] bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200">
                    {streamingMessage}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-1 h-4 bg-gray-400 ml-1"
                    />
                  </div>
                </motion.div>
              )}

              {/* Typing indicator */}
              {isLoading && !isTyping && (
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

            {/* Suggested Questions */}
            {showSuggestions && availableSuggestions.length > 0 && messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {availableSuggestions.map((question, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs bg-[rgba(192,192,192,0.1)] hover:bg-[rgba(192,192,192,0.2)] border border-[rgba(192,192,192,0.2)] rounded-full px-3 py-1.5 text-gray-300 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading}
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
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
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-gradient-to-br from-gray-600 to-gray-800 border border-[rgba(192,192,192,0.3)] rounded-lg p-2 text-gray-300 hover:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;