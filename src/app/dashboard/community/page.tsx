'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Target, Filter } from 'lucide-react';
import { ChallengeCard } from '@/components/community/ChallengeCard';
import { CommunityFeed } from '@/components/community/CommunityFeed';

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  duration: string;
  reward: number;
  category: 'health' | 'finance' | 'personal' | 'social';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  startDate: string;
  progress?: number;
}

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

// Mock challenges data
const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: '30-Day Meditation Challenge',
    description: 'Practice mindfulness daily and track your progress',
    participants: 156,
    duration: '30 days',
    reward: 500,
    category: 'health',
    difficulty: 'beginner',
    startDate: '2024-02-01',
    progress: 40
  },
  {
    id: '2',
    title: 'Savings Sprint',
    description: 'Save 20% of your income for the next 3 months',
    participants: 89,
    duration: '90 days',
    reward: 1000,
    category: 'finance',
    difficulty: 'intermediate',
    startDate: '2024-02-15'
  },
  {
    id: '3',
    title: 'Social Impact Initiative',
    description: 'Complete 5 community service activities',
    participants: 45,
    duration: '60 days',
    reward: 750,
    category: 'social',
    difficulty: 'advanced',
    startDate: '2024-02-10',
    progress: 60
  }
];

// Mock feed data
const mockFeedItems: FeedItem[] = [
  {
    id: '1',
    type: 'achievement',
    user: {
      name: 'Alex Thompson',
      avatar: '',
      walletAddress: '8xht9m1fmx8KCMrqzNgYS9FxVuqRJUr4wXqDhKPvF3Gy'
    },
    content: {
      title: 'Early Bird Champion',
      description: 'Completed all daily tasks before 9 AM for 7 consecutive days!',
      reward: 100
    },
    engagement: {
      likes: 24,
      comments: 5
    },
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'challenge',
    user: {
      name: 'Sarah Chen',
      avatar: '',
      walletAddress: '6yKHERk8rsbmJxvMCPVX3VgYzuH21yEjrfBUhbYuhqdf'
    },
    content: {
      title: 'Joined Meditation Challenge',
      description: 'Starting my journey to better mindfulness. Who else is in?',
      image: '/images/meditation.jpg'
    },
    engagement: {
      likes: 18,
      comments: 8
    },
    timestamp: '4 hours ago'
  }
];

// Stats data
const communityStats = {
  activeUsers: 1234,
  totalChallenges: 45,
  completedGoals: 8765,
  totalRewards: 125000
} as const;

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'challenges'>('feed');
  const [challengeFilter, setChallengeFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [feedFilter, setFeedFilter] = useState<'all' | 'achievements' | 'challenges'>('all');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-xl font-bold dark:text-white">{communityStats.activeUsers}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Challenges</p>
              <p className="text-xl font-bold dark:text-white">{communityStats.totalChallenges}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed Goals</p>
              <p className="text-xl font-bold dark:text-white">{communityStats.completedGoals}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Rewards</p>
              <p className="text-xl font-bold dark:text-white">{communityStats.totalRewards} THRAIVE</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('feed')}
            className={`pb-2 text-sm font-medium transition-colors relative ${
              activeTab === 'feed'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Community Feed
            {activeTab === 'feed' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`pb-2 text-sm font-medium transition-colors relative ${
              activeTab === 'challenges'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Challenges
            {activeTab === 'challenges' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
              />
            )}
          </button>
        </div>

        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'feed' ? (
          <CommunityFeed
            items={mockFeedItems}
            onLike={(id) => console.log('Like:', id)}
            onComment={(id) => console.log('Comment:', id)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onJoin={() => console.log('Join challenge:', challenge.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 