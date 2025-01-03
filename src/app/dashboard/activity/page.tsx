'use client';

import { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Clock, BarChart2, Zap, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { ActivityDetailsModal } from '@/components/modals/ActivityDetailsModal';

interface Activity {
  id: number;
  type: 'task' | 'goal_progress' | 'achievement';
  title: string;
  description: string;
  status?: 'completed' | 'in_progress' | 'pending';
  progress?: number;
  points: number;
  createdAt: string;
  category: string;
  duration?: number;
}

interface DailyStats {
  tasksCompleted: number;
  pointsEarned: number;
  currentStreak: number;
  activeMinutes: number;
}

interface DateFilter {
  startDate: string;
  endDate: string;
}

// Mock data
const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'task',
    title: 'Morning Meditation',
    description: 'Complete 10-minute guided meditation',
    status: 'completed',
    points: 50,
    createdAt: new Date('2024-12-16T08:00:00').toISOString(),
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
    createdAt: new Date('2024-12-16T10:00:00').toISOString(),
    category: 'Health'
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Early Bird',
    description: 'Completed 3 tasks before 9 AM',
    points: 100,
    createdAt: new Date('2024-12-16T09:00:00').toISOString(),
    category: 'Productivity'
  },
  {
    id: 4,
    type: 'task',
    title: 'Read Personal Development Book',
    description: 'Read for 30 minutes',
    status: 'pending',
    points: 40,
    createdAt: new Date('2024-12-16T11:00:00').toISOString(),
    category: 'Learning'
  }
];

const mockStats: DailyStats = {
  tasksCompleted: 8,
  pointsEarned: 320,
  currentStreak: 5,
  activeMinutes: 145
};

// Point calculation rules
const POINT_RULES = {
  task: {
    base: 10,
    completed: 20,
    duration_multiplier: 0.5 // points per minute
  },
  goal_progress: {
    base: 15,
    progress_multiplier: 0.5 // points per % progress
  },
  achievement: {
    base: 50
  }
};

const calculatePoints = (activity: Partial<Activity>): number => {
  let points = 0;
  
  switch (activity.type) {
    case 'task':
      points += POINT_RULES.task.base;
      if (activity.status === 'completed') {
        points += POINT_RULES.task.completed;
      }
      if (activity.duration) {
        points += Math.floor(activity.duration * POINT_RULES.task.duration_multiplier);
      }
      break;
      
    case 'goal_progress':
      points += POINT_RULES.goal_progress.base;
      if (activity.progress) {
        points += Math.floor(activity.progress * POINT_RULES.goal_progress.progress_multiplier);
      }
      break;
      
    case 'achievement':
      points += POINT_RULES.achievement.base;
      break;
      
    default:
      points = 0;
  }
  
  return points;
};

export default function ActivityPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [stats, setStats] = useState<DailyStats | null>(mockStats);
  const [isLoading, setIsLoading] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'view'>('create');
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    startDate: '2024-12-16',
    endDate: '2024-12-16'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categories = ['All', 'Wellness', 'Health', 'Productivity', 'Learning'];

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setModalMode('view');
    setShowActivityModal(true);
  };

  const handleAddActivity = () => {
    setSelectedActivity(null);
    setModalMode('create');
    setShowActivityModal(true);
  };

  const handleActivitySubmit = (data: Partial<Activity>) => {
    // Calculate points automatically based on activity data
    const points = calculatePoints(data);
    
    // This will be replaced with an API call later
    const newActivity = {
      id: activities.length + 1,
      ...data,
      points,
      createdAt: new Date().toISOString()
    } as Activity;
    
    setActivities([newActivity, ...activities]);
  };

  const filteredAndPaginatedActivities = activities
    .filter(activity => {
      const activityDate = activity.createdAt.split('T')[0]; // Get just the date part
      const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
      const matchesDateRange = activityDate >= dateFilter.startDate && activityDate <= dateFilter.endDate;
      
      return matchesCategory && matchesDateRange;
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const filteredActivities = activities.filter(activity => {
    const activityDate = activity.createdAt.split('T')[0]; // Get just the date part
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
    const matchesDateRange = activityDate >= dateFilter.startDate && activityDate <= dateFilter.endDate;
    
    return matchesCategory && matchesDateRange;
  });

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ActivityDetailsModal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        activity={selectedActivity}
        onSubmit={handleActivitySubmit}
        mode={modalMode}
      />

      {/* Header with Add Activity Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Today's Activity</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your daily progress</p>
        </div>
        <button
          onClick={handleAddActivity}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Activity</span>
        </button>
      </div>

      {/* Daily Overview */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats && (
            <>
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
                    <p className="text-xl font-bold dark:text-white">{stats.tasksCompleted}</p>
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
                    <p className="text-xl font-bold dark:text-white">{stats.pointsEarned}</p>
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
                    <p className="text-xl font-bold dark:text-white">{stats.currentStreak} days</p>
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
                    <p className="text-xl font-bold dark:text-white">{stats.activeMinutes}</p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Date Filter */}
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={dateFilter.startDate}
              onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={dateFilter.endDate}
              onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                selectedCategory === category
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {filteredAndPaginatedActivities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleActivityClick(activity)}
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
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">•</span>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">+{activity.points} points</span>
                  </div>
                </div>
              </div>
              {activity.type === 'goal_progress' && activity.progress !== undefined && (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
} 