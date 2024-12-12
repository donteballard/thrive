'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Zap, Award, Crown, Medal, Users, History, CheckCircle2, Clock } from 'lucide-react';
import { AchievementUnlockModal } from '@/components/modals/AchievementUnlockModal';
import { AchievementDetailsModal } from '@/components/modals/AchievementDetailsModal';

// Mock achievement data
const mockAchievements = [
  {
    id: 1,
    title: 'Early Bird',
    description: 'Complete 5 tasks before 9 AM',
    icon: Star,
    progress: 100,
    earned: true,
    earnedDate: '2024-01-15',
    rarity: 'Common',
    tokenReward: 50,
    category: 'Productivity',
    requirements: ['Complete 5 tasks before 9 AM', 'Tasks must be completed between 5 AM and 9 AM', 'Tasks must be from your daily task list']
  },
  {
    id: 2,
    title: 'Goal Setter',
    description: 'Create and complete 3 goals',
    icon: Target,
    progress: 66,
    earned: false,
    rarity: 'Rare',
    tokenReward: 100,
    category: 'Goals',
    requirements: ['Create at least 3 goals', 'Goals must have clear success criteria', 'Goals must be completed within their set timeframe']
  },
  {
    id: 3,
    title: 'Streak Master',
    description: 'Maintain a 7-day streak',
    icon: Zap,
    progress: 100,
    earned: true,
    earnedDate: '2024-01-10',
    rarity: 'Epic',
    tokenReward: 200,
    category: 'Consistency',
    requirements: ['Log in daily for 7 consecutive days', 'Complete at least one task each day', 'Maintain task completion rate above 80%']
  },
  {
    id: 4,
    title: 'Champion',
    description: 'Complete all daily tasks for a month',
    icon: Crown,
    progress: 40,
    earned: false,
    rarity: 'Legendary',
    tokenReward: 500,
    category: 'Consistency',
    requirements: ['Complete 100% of daily tasks', 'Maintain streak for 30 days', 'No tasks should be rescheduled']
  },
];

const categories = ['All', 'Productivity', 'Goals', 'Consistency', 'Social'];

// Mock leaderboard data
const mockLeaderboard = [
  { 
    id: 1, 
    address: '8xht9m1fmx8KCMrqzNgYS9FxVuqRJUr4wXqDhKPvF3Gy', 
    achievements: 24, 
    points: 2800, 
    avatar: '🏆'
  },
  { 
    id: 2, 
    address: '6yKHERk8rsbmJxvMCPVX3VgYzuH21yEjrfBUhbYuhqdf', 
    achievements: 22, 
    points: 2600, 
    avatar: '🥈'
  },
  { 
    id: 3, 
    address: 'DEuG4JnzvMVxMFPoBVvf2GH38mn3ybunMxtfmVHXStLX', 
    achievements: 20, 
    points: 2400, 
    avatar: '🥉'
  },
  { 
    id: 4, 
    address: '2ZjTR1vHHJqxsuiQwCSUoHNm3UQqfYVXVqNhZ1QY7qPm', 
    achievements: 19, 
    points: 2200, 
    avatar: '🎯'
  },
  { 
    id: 5, 
    address: '4X4tFtEWJwVmPxGscvGN5DzGEDEEqNbVTALhRP5EpgVT', 
    achievements: 18, 
    points: 2000, 
    avatar: '🎮'
  },
];

// Mock timeline data
const mockTimeline = [
  { 
    id: 1, 
    achievement: 'Early Bird', 
    date: '2024-01-15', 
    reward: 50,
    icon: Star,
    rarity: 'Common'
  },
  { 
    id: 2, 
    achievement: 'Streak Master', 
    date: '2024-01-10', 
    reward: 200,
    icon: Zap,
    rarity: 'Epic'
  },
  // Add more timeline entries...
];

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showEarned, setShowEarned] = useState(true);
  const [showUnearned, setShowUnearned] = useState(true);
  const [activeTab, setActiveTab] = useState<'achievements' | 'leaderboard' | 'history'>('achievements');
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredAchievements = mockAchievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'All' || achievement.category === selectedCategory;
    const matchesEarnedFilter = (achievement.earned && showEarned) || (!achievement.earned && showUnearned);
    return matchesCategory && matchesEarnedFilter;
  });

  const stats = {
    totalEarned: mockAchievements.filter(a => a.earned).length,
    totalAchievements: mockAchievements.length,
    totalTokens: mockAchievements.filter(a => a.earned).reduce((sum, a) => sum + a.tokenReward, 0),
  };

  // Simulate achievement unlock after 2 seconds for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      const unlockedAchievement = mockAchievements.find(a => !a.earned);
      if (unlockedAchievement) {
        setSelectedAchievement(unlockedAchievement);
        setShowUnlockModal(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAchievementClick = (achievement: any) => {
    setSelectedAchievement(achievement);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Achievement Unlock Modal */}
      <AchievementUnlockModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        achievement={selectedAchievement}
      />

      {/* Achievement Details Modal */}
      <AchievementDetailsModal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedAchievement(null);
        }}
        achievement={selectedAchievement}
      />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold dark:text-white">Achievements</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your progress and earn rewards</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Achievements Earned</p>
              <h3 className="text-2xl font-bold dark:text-white">
                {stats.totalEarned}/{stats.totalAchievements}
              </h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <Medal className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
              <h3 className="text-2xl font-bold dark:text-white">
                {Math.round((stats.totalEarned / stats.totalAchievements) * 100)}%
              </h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tokens Earned</p>
              <h3 className="text-2xl font-bold dark:text-white">{stats.totalTokens}</h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'achievements'
                ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Achievements
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'leaderboard'
                ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'history'
                ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            History
          </button>
        </nav>
      </div>

      {activeTab === 'achievements' && (
        <>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-600 dark:bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 ml-auto">
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
                <button
                  onClick={() => {
                    setShowEarned(true);
                    setShowUnearned(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
                    showEarned && !showUnearned
                      ? 'bg-blue-600 dark:bg-blue-500 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm">Earned</span>
                </button>
                <button
                  onClick={() => {
                    setShowEarned(false);
                    setShowUnearned(true);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
                    !showEarned && showUnearned
                      ? 'bg-blue-600 dark:bg-blue-500 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">In Progress</span>
                </button>
                <button
                  onClick={() => {
                    setShowEarned(true);
                    setShowUnearned(true);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
                    showEarned && showUnearned
                      ? 'bg-blue-600 dark:bg-blue-500 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-sm">All</span>
                </button>
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all"
                onClick={() => handleAchievementClick(achievement)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.earned 
                        ? 'bg-green-100 dark:bg-green-900/50' 
                        : 'bg-blue-100 dark:bg-blue-900/50'
                    }`}>
                      <achievement.icon className={`w-5 h-5 ${
                        achievement.earned 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-blue-600 dark:text-blue-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold dark:text-white">{achievement.title}</h3>
                      <span className={`text-sm ${
                        achievement.rarity === 'Common' ? 'text-gray-600 dark:text-gray-400' :
                        achievement.rarity === 'Rare' ? 'text-blue-600 dark:text-blue-400' :
                        achievement.rarity === 'Epic' ? 'text-purple-600 dark:text-purple-400' :
                        'text-yellow-600 dark:text-yellow-400'
                      }`}>
                        {achievement.rarity}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">{achievement.tokenReward}</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {achievement.description}
                </p>
                {!achievement.earned && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-medium dark:text-white">{achievement.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                      <div
                        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                {achievement.earned && achievement.earnedDate && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'leaderboard' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold dark:text-white mb-6">Top Achievers</h2>
            <div className="space-y-4">
              {mockLeaderboard.map((user, index) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center text-2xl">
                      {user.avatar}
                    </div>
                    <div>
                      <h3 className="font-medium dark:text-white">
                        {user.address.slice(0, 4)}...{user.address.slice(-4)}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user.achievements} achievements
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                    <Trophy className="w-4 h-4" />
                    <span className="font-medium">{user.points}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-8">
            <h2 className="text-lg font-semibold dark:text-white mb-8">Achievement History</h2>
            <div className="space-y-12">
              {mockTimeline.map((event, index) => {
                const Icon = event.icon;
                return (
                  <div key={event.id} className="relative pl-16">
                    {index !== mockTimeline.length - 1 && (
                      <div className="absolute left-[20px] top-14 bottom-[-48px] w-px bg-gray-200 dark:bg-gray-700" />
                    )}
                    <div className="relative">
                      <div className="absolute left-[-44px] top-1 p-2 bg-white dark:bg-gray-800">
                        <div className={`p-2.5 rounded-full ${
                          event.rarity === 'Common' ? 'bg-gray-100 dark:bg-gray-700' :
                          event.rarity === 'Rare' ? 'bg-blue-100 dark:bg-blue-900/50' :
                          event.rarity === 'Epic' ? 'bg-purple-100 dark:bg-purple-900/50' :
                          'bg-yellow-100 dark:bg-yellow-900/50'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            event.rarity === 'Common' ? 'text-gray-600 dark:text-gray-400' :
                            event.rarity === 'Rare' ? 'text-blue-600 dark:text-blue-400' :
                            event.rarity === 'Epic' ? 'text-purple-600 dark:text-purple-400' :
                            'text-yellow-600 dark:text-yellow-400'
                          }`} />
                        </div>
                      </div>
                      <div className="space-y-2 ml-4">
                        <h3 className="text-xl font-medium dark:text-white">{event.achievement}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                          <Trophy className="w-5 h-5" />
                          <span className="text-base font-medium">+{event.reward}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 