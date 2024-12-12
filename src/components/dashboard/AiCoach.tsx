'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Brain, Target, Zap, ChevronRight, MessageCircle } from 'lucide-react';

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
    }
  },
  {
    id: 2,
    type: 'insight',
    title: 'Productivity Peak Detected',
    description: 'Your productivity is highest between 9 AM and 11 AM. Consider scheduling important tasks during this window.',
    priority: 'medium',
    category: 'productivity'
  },
  {
    id: 3,
    type: 'suggestion',
    title: 'Investment Opportunity',
    description: 'Based on your savings goal, consider allocating 10% of your THRIVE tokens to the staking pool.',
    priority: 'medium',
    category: 'finance',
    action: {
      label: 'View Staking Options',
      href: '/dashboard/rewards'
    }
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
    }
  }
];

export function AiCoach() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'health', 'finance', 'personal', 'productivity'];

  const filteredRecommendations = selectedCategory === 'all'
    ? mockRecommendations
    : mockRecommendations.filter(rec => rec.category === selectedCategory);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="font-semibold dark:text-white">AI Coach</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Personalized recommendations</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRight className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
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
          {/* Category Filter */}
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors
                    ${selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
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
                    ? 'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20'
                    : recommendation.priority === 'medium'
                    ? 'border-yellow-200 dark:border-yellow-900/50 bg-yellow-50 dark:bg-yellow-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium dark:text-white mb-1">{recommendation.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{recommendation.description}</p>
                    {recommendation.action && (
                      <a
                        href={recommendation.action.href}
                        className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        {recommendation.action.label}
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <div className={`p-2 rounded-lg ${
                    recommendation.type === 'task' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    recommendation.type === 'insight' ? 'bg-purple-100 dark:bg-purple-900/30' :
                    recommendation.type === 'suggestion' ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-orange-100 dark:bg-orange-900/30'
                  }`}>
                    {recommendation.type === 'task' ? (
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    ) : recommendation.type === 'insight' ? (
                      <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    ) : recommendation.type === 'suggestion' ? (
                      <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chat with AI Coach */}
          <div className="p-4 border-t dark:border-gray-700">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600">
              Chat with AI Coach
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
} 