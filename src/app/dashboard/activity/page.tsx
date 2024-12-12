'use client';

import { useState } from 'react';
import { Calendar, CheckCircle2, Clock, BarChart2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for activities
const mockActivities = [
  {
    id: 1,
    type: 'task',
    title: 'Morning Meditation',
    description: 'Complete 10-minute guided meditation',
    status: 'completed',
    points: 50,
    timestamp: '08:00 AM',
    category: 'Wellness'
  },
  {
    id: 2,
    type: 'goal_progress',
    title: 'Fitness Goal Progress',
    description: 'Completed 5000 steps',
    status: 'in_progress',
    progress: 65,
    points: 30,
    timestamp: '10:30 AM',
    category: 'Health'
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Early Bird',
    description: 'Completed 3 tasks before 9 AM',
    points: 100,
    timestamp: '09:00 AM',
    category: 'Productivity'
  },
  {
    id: 4,
    type: 'task',
    title: 'Read Personal Development Book',
    description: 'Read for 30 minutes',
    status: 'pending',
    points: 40,
    timestamp: '02:00 PM',
    category: 'Learning'
  },
];

// Mock data for daily stats
const dailyStats = {
  tasksCompleted: 8,
  pointsEarned: 320,
  currentStreak: 5,
  activeMinutes: 145
};

export default function ActivityPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Wellness', 'Health', 'Productivity', 'Learning'];

  const filteredActivities = selectedCategory === 'All'
    ? mockActivities
    : mockActivities.filter(activity => activity.category === selectedCategory);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Daily Overview */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Today's Activity</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</p>
                <p className="text-xl font-bold dark:text-white">{dailyStats.tasksCompleted}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Points Earned</p>
                <p className="text-xl font-bold dark:text-white">{dailyStats.pointsEarned}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
                <p className="text-xl font-bold dark:text-white">{dailyStats.currentStreak} days</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Minutes</p>
                <p className="text-xl font-bold dark:text-white">{dailyStats.activeMinutes}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                ${selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'task' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  activity.type === 'goal_progress' ? 'bg-green-100 dark:bg-green-900/30' :
                  'bg-purple-100 dark:bg-purple-900/30'
                }`}>
                  {activity.type === 'task' ? (
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : activity.type === 'goal_progress' ? (
                    <BarChart2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">{activity.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-500">{activity.timestamp}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">•</span>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">+{activity.points} points</span>
                  </div>
                </div>
              </div>
              {activity.type === 'goal_progress' && (
                <div className="w-24">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 dark:bg-green-500 rounded-full"
                      style={{ width: `${activity.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-center mt-1 text-gray-600 dark:text-gray-400">
                    {activity.progress}%
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 