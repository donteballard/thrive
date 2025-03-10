'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, Brain, Target, Zap, ChevronRight, MessageCircle, Send, Loader2 } from 'lucide-react';

interface Recommendation {
  id: number;
  type: 'task' | 'insight' | 'suggestion' | 'alert';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'health' | 'finance' | 'personal' | 'productivity';
  action?: {
    label: string;
    href: string;
  };
  createdAt: string;
  status: 'active' | 'completed' | 'dismissed';
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const mockRecommendations: Recommendation[] = [
  {
    id: 1,
    type: 'task',
    title: 'Complete Morning Meditation',
    description: 'Based on your sleep pattern, a 10-minute meditation would help improve your focus today.',
    priority: 'high',
    category: 'health',
    action: {
      label: 'Start Meditation',
      href: '/dashboard/activities/meditation'
    },
    createdAt: new Date().toISOString(),
    status: 'active'
  },
  {
    id: 2,
    type: 'insight',
    title: 'Productivity Peak Detected',
    description: 'Your productivity is highest between 9 AM and 11 AM. Consider scheduling important tasks during this window.',
    priority: 'medium',
    category: 'productivity',
    createdAt: new Date().toISOString(),
    status: 'active'
  },
  {
    id: 3,
    type: 'suggestion',
    title: 'Investment Opportunity',
    description: 'Based on your savings goal, consider allocating 10% of your THRAIVE tokens to the staking pool.',
    priority: 'medium',
    category: 'finance',
    action: {
      label: 'View Staking Options',
      href: '/dashboard/rewards'
    },
    createdAt: new Date().toISOString(),
    status: 'active'
  },
  {
    id: 4,
    type: 'alert',
    title: 'Goal Milestone Approaching',
    description: "You're 2 tasks away from completing your weekly fitness goal. Keep going!",
    priority: 'high',
    category: 'health',
    action: {
      label: 'View Goal Progress',
      href: '/dashboard/goals'
    },
    createdAt: new Date().toISOString(),
    status: 'active'
  }
];

export function AiCoach() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const categories = ['all', 'health', 'finance', 'personal', 'productivity'];

  // Initialize welcome message when chat is opened
  useEffect(() => {
    if (showChat && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: `👋 Hi! I'm your AI Coach. I'm here to help you achieve your goals and maintain a healthy lifestyle.\n\nYou can ask me about:\n• Exercise and workout plans\n• Nutrition and diet advice\n• Mental wellness tips\n• Goal setting and tracking\n• Daily habits and routines\n\nHow can I assist you today?`,
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
    }
  }, [showChat]);

  const filteredRecommendations = selectedCategory === 'all'
    ? mockRecommendations
    : mockRecommendations.filter(rec => rec.category === selectedCategory);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a mock response. In production, this will be replaced with actual AI responses.',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, response]);
    } catch (err) {
      setError('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-black rounded-xl shadow-sm overflow-hidden border border-green-800">
      {/* Header */}
      <div 
        className="p-4 border-b border-green-800 cursor-pointer hover:bg-green-900 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-white">AI Coach</h2>
              <p className="text-sm text-gray-400">Personalized recommendations</p>
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-2 hover:bg-green-900 rounded-lg transition-colors"
          >
            <ChevronRight className={`w-5 h-5 text-white transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {!showChat ? (
            <>
              {/* Category Filter */}
              <div className="p-4 border-b border-green-800">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors
                        ${selectedCategory === category
                          ? 'bg-primary text-black'
                          : 'bg-primary/20 text-white hover:bg-primary hover:text-black'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="p-4 space-y-4">
                {filteredRecommendations.map((recommendation) => (
                  <motion.div
                    key={recommendation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border ${
                      recommendation.priority === 'high'
                        ? 'border-red-900 bg-red-900/20'
                        : recommendation.priority === 'medium'
                        ? 'border-yellow-900 bg-yellow-900/20'
                        : 'border-green-800 bg-gray-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-white mb-1">{recommendation.title}</h3>
                        <p className="text-sm text-gray-400">{recommendation.description}</p>
                        {recommendation.action && (
                          <a
                            href={recommendation.action.href}
                            className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-primary hover:text-primary/60"
                          >
                            {recommendation.action.label}
                            <ChevronRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <div className={`p-2 rounded-lg ${
                        recommendation.type === 'task' ? 'bg-primary/20' :
                        recommendation.type === 'insight' ? 'bg-primary/20' :
                        recommendation.type === 'suggestion' ? 'bg-primary/20' :
                        'bg-primary/20'
                      }`}>
                        {recommendation.type === 'task' ? (
                          <Target className="w-5 h-5 text-primary" />
                        ) : recommendation.type === 'insight' ? (
                          <Brain className="w-5 h-5 text-primary" />
                        ) : recommendation.type === 'suggestion' ? (
                          <MessageCircle className="w-5 h-5 text-primary" />
                        ) : (
                          <Zap className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            /* Chat Interface */
            <div className="h-[400px] flex flex-col">
              <div ref={messagesContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-black'
                        : 'bg-green-900 text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className="text-black text-xs mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-black rounded-lg p-3">
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    </div>
                  </div>
                )}
                {error && (
                  <div className="text-center text-red-400 text-sm">
                    {error}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-green-800">
                <div className="flex gap-2">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask your AI coach..."
                    className="flex-1 resize-none px-3 py-2 rounded-lg bg-green-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={1}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="p-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Toggle Chat Button */}
          <div className="p-4 border-t border-green-800">
            <button
              onClick={() => setShowChat(!showChat)}
              className="w-full px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors"
            >
              {showChat ? 'View Recommendations' : 'Chat with AI Coach'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
} 