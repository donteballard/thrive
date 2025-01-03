'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Zap, Award, Crown, Medal, Users, History, CheckCircle2, Clock } from 'lucide-react';
import { useAchievements } from '@/hooks/useAchievements';
import { ShareAchievementModal } from '@/components/modals/ShareAchievementModal';
import { 
  Achievement, 
  AchievementRarity, 
  AchievementCategory, 
  TimelineEvent 
} from '@/types/achievements';

// Mock data for testing until backend is ready
const mockAchievements: Achievement[] = [
  {
    id: 1,
    title: 'Early Bird',
    description: 'Complete 5 tasks before 9 AM',
    icon: Star,
    progress: 100,
    earned: true,
    earnedDate: '2024-01-15',
    rarity: 'Common' as AchievementRarity,
    tokenReward: 50,
    category: 'Productivity' as AchievementCategory,
    requirements: ['Complete 5 tasks before 9 AM', 'Tasks must be completed between 5 AM and 9 AM']
  },
  {
    id: 2,
    title: 'Goal Setter',
    description: 'Create and complete 3 goals',
    icon: Target,
    progress: 66,
    earned: false,
    rarity: 'Rare' as AchievementRarity,
    tokenReward: 100,
    category: 'Goals' as AchievementCategory,
    requirements: ['Create at least 3 goals', 'Goals must have clear success criteria']
  },
  {
    id: 3,
    title: 'Streak Master',
    description: 'Maintain a 7-day streak',
    icon: Zap,
    progress: 100,
    earned: true,
    earnedDate: '2024-01-10',
    rarity: 'Epic' as AchievementRarity,
    tokenReward: 200,
    category: 'Consistency' as AchievementCategory,
    requirements: ['Log in daily for 7 consecutive days', 'Complete at least one task each day']
  }
];

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
  }
];

const mockTimeline: TimelineEvent[] = [
  { 
    id: 1, 
    achievement: 'Early Bird', 
    date: '2024-01-15', 
    reward: 50,
    icon: Star,
    rarity: 'Common' as AchievementRarity
  },
  { 
    id: 2, 
    achievement: 'Streak Master', 
    date: '2024-01-10', 
    reward: 200,
    icon: Zap,
    rarity: 'Epic' as AchievementRarity
  }
];

const mockStats = {
  totalEarned: 2,
  totalAchievements: 3,
  totalTokens: 250
};

const categories = ['All', 'Productivity', 'Goals', 'Consistency', 'Social'];

export default function AchievementsPage() {
  // Instead of using the hook directly, we'll use mock data for now
  const [achievements] = useState(mockAchievements);
  const [stats] = useState(mockStats);
  const [leaderboard] = useState(mockLeaderboard);
  const [timeline] = useState(mockTimeline);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: 'All',
    showEarned: true,
    showUnearned: true,
  });

  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setShowShareModal(true);
  };

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = filters.category === 'All' || achievement.category === filters.category;
    const matchesEarnedFilter = 
      (achievement.earned && filters.showEarned) || 
      (!achievement.earned && filters.showUnearned);
    return matchesCategory && matchesEarnedFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Trophy className="w-12 h-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Failed to Load Achievements</h2>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Rest of the component remains the same, but use filteredAchievements instead of achievements */}
      <ShareAchievementModal
        isOpen={showShareModal}
        onClose={() => {
          setShowShareModal(false);
          setSelectedAchievement(null);
        }}
        achievement={selectedAchievement}
      />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Achievements</h1>
        <p className="text-muted-foreground">Track your progress and earn rewards</p>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-background rounded-xl shadow-sm border border-border"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
                <Trophy className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Achievements Earned</p>
                <h3 className="text-2xl font-bold">
                  {stats.totalEarned}/{stats.totalAchievements}
                </h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-background rounded-xl shadow-sm border border-border"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
                <Medal className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <h3 className="text-2xl font-bold">
                  {Math.round((stats.totalEarned / stats.totalAchievements) * 100)}%
                </h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-background rounded-xl shadow-sm border border-border"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
                <Award className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tokens Earned</p>
                <h3 className="text-2xl font-bold">{stats.totalTokens}</h3>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="border-b border-border">
        <nav className="flex gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => updateFilters({ category })}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                filters.category === category
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-background rounded-lg border border-border p-1">
          <button
            onClick={() => updateFilters({ showEarned: true, showUnearned: false })}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
              filters.showEarned && !filters.showUnearned
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm">Earned</span>
          </button>
          <button
            onClick={() => updateFilters({ showEarned: false, showUnearned: true })}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
              !filters.showEarned && filters.showUnearned
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm">In Progress</span>
          </button>
          <button
            onClick={() => updateFilters({ showEarned: true, showUnearned: true })}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
              filters.showEarned && filters.showUnearned
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <span className="text-sm">All</span>
          </button>
        </div>
      </div>

      {/* Achievement Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAchievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`group relative bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow ${
              achievement.earned ? 'bg-primary/5' : ''
            }`}
            onClick={() => handleAchievementClick(achievement)}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${
                achievement.rarity === 'Common' ? 'bg-blue-500/10 dark:bg-blue-500/20' :
                achievement.rarity === 'Rare' ? 'bg-blue-500/10 dark:bg-blue-500/20' :
                'bg-blue-500/10 dark:bg-blue-500/20'
              }`}>
                <achievement.icon className={`w-6 h-6 ${
                  achievement.rarity === 'Common' ? 'text-blue-500' :
                  achievement.rarity === 'Rare' ? 'text-blue-500' :
                  'text-blue-500'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    achievement.rarity === 'Common' ? 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-500' :
                    achievement.rarity === 'Rare' ? 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-500' :
                    'bg-blue-500/10 dark:bg-blue-500/20 text-blue-500'
                  }`}>
                    {achievement.rarity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{achievement.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-500">
                      +{achievement.tokenReward} THRAIVE
                    </span>
                  </div>
                  {achievement.earned && (
                    <span className="text-xs text-muted-foreground">
                      Earned {new Date(achievement.earnedDate!).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
        <div className="bg-background rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="p-4 space-y-4">
            {leaderboard.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{user.avatar}</span>
                  <div>
                    <p className="font-medium">{user.address.slice(0, 4)}...{user.address.slice(-4)}</p>
                    <p className="text-sm text-muted-foreground">{user.achievements} achievements</p>
                  </div>
                </div>
                <p className="font-semibold text-blue-500">{user.points} pts</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {timeline.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-4 p-4 bg-background rounded-xl shadow-sm border border-border hover:bg-accent/50 transition-colors"
            >
              <div className="p-2 rounded-lg bg-blue-500/10 dark:bg-blue-500/20">
                <event.icon className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{event.achievement}</h3>
                  <span className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-blue-500 mt-1">+{event.reward} THRAIVE</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 