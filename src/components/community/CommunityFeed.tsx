'use client';

import { motion } from 'framer-motion';
import { Trophy, Target, Star, Zap, ThumbsUp, MessageCircle } from 'lucide-react';

interface FeedItem {
  id: string;
  type: 'achievement' | 'goal' | 'challenge' | 'milestone';
  user: {
    name: string;
    avatar: string;
    walletAddress: string;
  };
  content: {
    title: string;
    description: string;
    reward?: number;
    image?: string;
  };
  engagement: {
    likes: number;
    comments: number;
  };
  timestamp: string;
}

interface CommunityFeedProps {
  items: FeedItem[];
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
}

export function CommunityFeed({ items, onLike, onComment }: CommunityFeedProps) {
  const getTypeIcon = (type: FeedItem['type']) => {
    const icons = {
      achievement: Trophy,
      goal: Target,
      challenge: Star,
      milestone: Zap
    };
    const Icon = icons[type];
    return <Icon className="w-5 h-5" />;
  };

  const getTypeColor = (type: FeedItem['type']) => {
    const colors = {
      achievement: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30',
      goal: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
      challenge: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30',
      milestone: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
    };
    return colors[type];
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  {item.user.avatar ? (
                    <img
                      src={item.user.avatar}
                      alt={item.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                      {item.user.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {item.user.name}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {item.user.walletAddress}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                {getTypeIcon(item.type)}
              </div>
            </div>

            {/* Content */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold dark:text-white">{item.content.title}</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">{item.content.description}</p>
              {item.content.image && (
                <img
                  src={item.content.image}
                  alt={item.content.title}
                  className="mt-4 rounded-lg w-full object-cover"
                />
              )}
              {item.content.reward && (
                <div className="mt-4 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    +{item.content.reward} THRAIVE
                  </span>
                </div>
              )}
            </div>

            {/* Engagement */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={() => onLike?.(item.id)}
                className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{item.engagement.likes}</span>
              </button>
              <button
                onClick={() => onComment?.(item.id)}
                className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{item.engagement.comments}</span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 