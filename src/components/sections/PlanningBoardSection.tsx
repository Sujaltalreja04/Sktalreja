import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, ThumbsUp, MessageCircle, User, Send } from 'lucide-react';
import io from 'socket.io-client';

interface ProjectIdea {
  id: string;
  title: string;
  description: string;
  author: string;
  votes: number;
  comments: Comment[];
  createdAt: Date;
  tags: string[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
}

export const PlanningBoardSection = () => {
  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);
  const [newIdea, setNewIdea] = useState({ title: '', description: '', tags: '' });
  const [selectedIdea, setSelectedIdea] = useState<ProjectIdea | null>(null);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('Anonymous');
  const socketRef = useRef<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize WebSocket connection
  useEffect(() => {
    // Connect to WebSocket server
    socketRef.current = io('http://localhost:3001'); // Connect to our local server
    
    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
    });
    
    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
    });
    
    // Listen for updates to the ideas list
    socketRef.current.on('ideasUpdated', (updatedIdeas: ProjectIdea[]) => {
      setIdeas(updatedIdeas);
    });
    
    // Listen for new ideas
    socketRef.current.on('ideaAdded', (newIdea: ProjectIdea) => {
      setIdeas(prev => [newIdea, ...prev]);
    });
    
    // Listen for vote updates
    socketRef.current.on('ideaVoted', (ideaId: string, votes: number) => {
      setIdeas(prev => 
        prev.map(idea => 
          idea.id === ideaId 
            ? { ...idea, votes } 
            : idea
        )
      );
    });
    
    // Listen for new comments
    socketRef.current.on('commentAdded', (ideaId: string, comment: Comment) => {
      setIdeas(prev => 
        prev.map(idea => 
          idea.id === ideaId 
            ? { ...idea, comments: [...idea.comments, comment] } 
            : idea
        )
      );
    });
    
    // Request initial ideas
    socketRef.current.emit('getIdeas');
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleAddIdea = () => {
    if (!newIdea.title.trim() || !newIdea.description.trim()) return;
    
    const idea: ProjectIdea = {
      id: Date.now().toString(),
      title: newIdea.title,
      description: newIdea.description,
      author: userName,
      votes: 0,
      comments: [],
      createdAt: new Date(),
      tags: newIdea.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };
    
    // Send new idea via WebSocket
    socketRef.current?.emit('addIdea', idea);
    setNewIdea({ title: '', description: '', tags: '' });
  };

  const handleVote = (id: string) => {
    // Send vote via WebSocket
    socketRef.current?.emit('voteIdea', id);
  };

  const handleAddComment = () => {
    if (!selectedIdea || !newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: userName,
      content: newComment,
      createdAt: new Date()
    };
    
    // Send comment via WebSocket
    socketRef.current?.emit('addComment', selectedIdea.id, comment);
    setNewComment('');
  };

  return (
    <section id="planning" className="py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
            Collaborative Project Planning
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Share your project ideas and collaborate with others. Vote on concepts you find interesting 
            and help shape the future of innovative development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Idea Submission */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Plus className="mr-2" />
                Submit New Idea
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={newIdea.title}
                    onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
                    className="w-full bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="Enter project title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                  <textarea
                    value={newIdea.description}
                    onChange={(e) => setNewIdea({...newIdea, description: e.target.value})}
                    rows={4}
                    className="w-full bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="Describe your project idea..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newIdea.tags}
                    onChange={(e) => setNewIdea({...newIdea, tags: e.target.value})}
                    className="w-full bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="e.g., AI, Web, Mobile"
                  />
                </div>
                
                <button
                  onClick={handleAddIdea}
                  className="w-full bg-gradient-to-r from-gray-700 to-gray-900 border border-[rgba(192,192,192,0.3)] rounded-lg py-2 text-gray-300 font-semibold transition-all hover:from-gray-600 hover:to-gray-800 flex items-center justify-center"
                >
                  <Plus className="mr-2" size={18} />
                  Submit Idea
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-xl p-6 mt-6"
            >
              <h3 className="text-xl font-bold mb-4">How It Works</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-gray-500 mt-2 mr-3 flex-shrink-0"></div>
                  <span>Submit your project ideas to the board</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-gray-500 mt-2 mr-3 flex-shrink-0"></div>
                  <span>Vote on ideas you find interesting</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-gray-500 mt-2 mr-3 flex-shrink-0"></div>
                  <span>Comment to provide feedback or suggestions</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-gray-500 mt-2 mr-3 flex-shrink-0"></div>
                  <span>Collaborate in real-time with other visitors</span>
                </li>
              </ul>
            </motion.div>
          </div>
          
          {/* Middle Column - Ideas List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Project Ideas</h3>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm text-gray-400">
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {ideas.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No ideas yet. Be the first to submit one!
                  </div>
                ) : (
                  ideas.map((idea) => (
                    <motion.div
                      key={idea.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      className={`border border-[rgba(192,192,192,0.2)] rounded-lg p-4 cursor-pointer transition-all ${
                        selectedIdea?.id === idea.id 
                          ? 'bg-[rgba(192,192,192,0.1)] border-[rgba(192,192,192,0.4)]' 
                          : 'hover:bg-[rgba(192,192,192,0.05)]'
                      }`}
                      onClick={() => setSelectedIdea(idea)}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-bold text-gray-200">{idea.title}</h4>
                        <div className="flex items-center bg-[rgba(192,192,192,0.1)] rounded-full px-3 py-1">
                          <ThumbsUp className="mr-1" size={14} />
                          <span className="text-sm">{idea.votes}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                        {idea.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {idea.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-[rgba(192,192,192,0.1)] text-gray-400 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <User className="mr-1" size={12} />
                          {idea.author}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <MessageCircle className="mr-1" size={12} />
                          {idea.comments.length} comments
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
            
            {/* Right Column - Idea Details and Comments */}
            {selectedIdea && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-xl p-6 mt-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{selectedIdea.title}</h3>
                  <button 
                    onClick={() => setSelectedIdea(null)}
                    className="text-gray-500 hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="mr-1" size={14} />
                  {selectedIdea.author} • {selectedIdea.createdAt.toLocaleDateString()}
                </div>
                
                <p className="text-gray-300 mb-4">{selectedIdea.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedIdea.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-[rgba(192,192,192,0.1)] text-gray-400 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => handleVote(selectedIdea.id)}
                    className="flex items-center bg-[rgba(192,192,192,0.1)] hover:bg-[rgba(192,192,192,0.2)] border border-[rgba(192,192,192,0.2)] rounded-lg px-4 py-2 transition-colors"
                  >
                    <ThumbsUp className="mr-2" size={16} />
                    Upvote ({selectedIdea.votes})
                  </button>
                </div>
                
                <div className="border-t border-[rgba(192,192,192,0.2)] pt-6">
                  <h4 className="font-bold mb-4 flex items-center">
                    <MessageCircle className="mr-2" size={18} />
                    Comments ({selectedIdea.comments.length})
                  </h4>
                  
                  <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                    {selectedIdea.comments.length === 0 ? (
                      <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
                    ) : (
                      selectedIdea.comments.map((comment) => (
                        <div key={comment.id} className="bg-[rgba(192,192,192,0.05)] rounded-lg p-3">
                          <div className="flex justify-between">
                            <div className="font-medium text-gray-300">{comment.author}</div>
                            <div className="text-xs text-gray-500">
                              {comment.createdAt.toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">{comment.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                    <button
                      onClick={handleAddComment}
                      className="bg-gradient-to-r from-gray-700 to-gray-900 border border-[rgba(192,192,192,0.3)] rounded-lg px-4 py-2 text-gray-300 font-semibold transition-all hover:from-gray-600 hover:to-gray-800 flex items-center"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};