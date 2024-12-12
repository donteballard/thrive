'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Heart,
  Moon,
  Footprints,
  Brain,
  TrendingUp,
  Users,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { AiCoach } from '@/components/dashboard/AiCoach';
import { DailyCheckInModal } from '@/components/modals/DailyCheckInModal';

// Mock health data
const healthMetrics = {
  heartRate: { current: 72, trend: 'stable', unit: 'bpm' },
  sleepHours: { current: 7.5, trend: 'up', unit: 'hours' },
  steps: { current: 8432, trend: 'up', unit: 'steps' },
  mindfulness: { current: 15, trend: 'up', unit: 'minutes' }
};

// Mock community data
const communityHighlights = [
  {
    id: 1,
    type: 'challenge',
    title: '30-Day Meditation',
    participants: 156,
    progress: 40
  },
  {
    id: 2,
    type: 'milestone',
    title: 'Group Goal Achieved',
    description: 'Community reached 1M total steps!'
  },
  {
    id: 3,
    type: 'leaderboard',
    title: 'Top Performer',
    user: 'Alex T.',
    achievement: 'Most consistent daily goals'
  }
];

// Mock weekly progress
const weeklyProgress = {
  tasksCompleted: 28,
  goalsAdvanced: 5,
  achievementsUnlocked: 3,
  streakDays: 5,
  totalPoints: 1250
};

export default function DashboardPage() {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);

  useEffect(() => {
    const lastCheckIn = localStorage.getItem('lastCheckIn');
    const today = new Date().toDateString();

    if (lastCheckIn !== today) {
      setShowCheckIn(true);
    }
  }, []);

  const handleDailyCheckIn = () => {
    setHasCheckedIn(true);
    // TODO: Implement check-in logic and rewards
  };

  const handleCheckInComplete = () => {
    const today = new Date().toDateString();
    localStorage.setItem('lastCheckIn', today);
    setShowCheckIn(false);
    // TODO: Update user's streak and rewards in the database
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Daily Check-in Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-blue-100">Track your progress and earn rewards daily</p>
          </div>
          <button
            onClick={handleDailyCheckIn}
            disabled={hasCheckedIn}
            className={`px-6 py-3 rounded-lg transition-colors ${
              hasCheckedIn
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
          >
            {hasCheckedIn ? 'Checked In ✓' : 'Daily Check-in'}
          </button>
        </div>
      </motion.div>

      {/* AI Coach Section */}
      <div className="mb-6">
        <AiCoach />
      </div>

      {/* Health Metrics Grid */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Health Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Heart Rate</p>
                <p className="text-xl font-bold dark:text-white">
                  {healthMetrics.heartRate.current} {healthMetrics.heartRate.unit}
                </p>
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
                <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sleep</p>
                <p className="text-xl font-bold dark:text-white">
                  {healthMetrics.sleepHours.current} {healthMetrics.sleepHours.unit}
                </p>
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
                <Footprints className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Steps</p>
                <p className="text-xl font-bold dark:text-white">
                  {healthMetrics.steps.current.toLocaleString()} {healthMetrics.steps.unit}
                </p>
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
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Mindfulness</p>
                <p className="text-xl font-bold dark:text-white">
                  {healthMetrics.mindfulness.current} {healthMetrics.mindfulness.unit}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Weekly Progress</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</p>
                  <p className="font-semibold dark:text-white">{weeklyProgress.tasksCompleted}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Goals Advanced</p>
                  <p className="font-semibold dark:text-white">{weeklyProgress.goalsAdvanced}</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Streak Days</p>
                  <p className="font-semibold dark:text-white">{weeklyProgress.streakDays} days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Points</p>
                  <p className="font-semibold dark:text-white">{weeklyProgress.totalPoints}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Highlights */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold dark:text-white">Community</h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {communityHighlights.map((highlight) => (
              <div
                key={highlight.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">{highlight.title}</h3>
                  {highlight.type === 'challenge' && (
                    <div className="mt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 dark:bg-blue-400 rounded-full"
                            style={{ width: `${highlight.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {highlight.progress}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {highlight.participants} participants
                      </p>
                    </div>
                  )}
                  {highlight.type === 'milestone' && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {highlight.description}
                    </p>
                  )}
                  {highlight.type === 'leaderboard' && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {highlight.user} - {highlight.achievement}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DailyCheckInModal
        isOpen={showCheckIn}
        onClose={() => setShowCheckIn(false)}
        onComplete={handleCheckInComplete}
      />
    </div>
  );
} 