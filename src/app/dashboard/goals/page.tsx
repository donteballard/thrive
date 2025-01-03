'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, ChevronDown, Trash2, Edit2, CheckCircle2, Bell, BellOff, X, Share2, Loader2, Heart, BookOpen, DollarSign, Briefcase, Activity, User, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GoalFormModal } from '@/components/modals/GoalFormModal';
import { DeleteConfirmationModal } from '@/components/modals/DeleteConfirmationModal';
import { GoalProgressModal } from '@/components/modals/GoalProgressModal';
import { ShareGoalModal } from '@/components/modals/ShareGoalModal';
import { useGoalReminders } from '@/components/goals/GoalReminders';
import { useGoals } from '@/hooks/useGoals';
import { Goal, GoalFormData, GoalProgressUpdate, GoalShareData, GoalCategory, GoalStatus, GoalFilters } from '@/types/goals';

export default function GoalsPage() {
  const {
    goals,
    stats,
    isLoading,
    error,
    filters,
    setFilters,
    createGoal,
    updateGoal,
    deleteGoal,
    updateGoalProgress,
    shareGoal,
  } = useGoals();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('goalNotificationsEnabled') !== 'false';
    }
    return true;
  });
  const [selectedCategory, setSelectedCategory] = useState<GoalCategory | 'All'>('All');
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<GoalStatus | 'All'>('All');

  const categories: { name: GoalCategory; icon: React.ReactNode }[] = [
    { name: 'Wellness', icon: <Heart className="w-4 h-4" /> },
    { name: 'Learning', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Finance', icon: <DollarSign className="w-4 h-4" /> },
    { name: 'Career', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Fitness', icon: <Activity className="w-4 h-4" /> },
    { name: 'Personal', icon: <User className="w-4 h-4" /> },
  ];

  // Initialize goal reminders
  useGoalReminders(notificationsEnabled ? goals : []);

  // Update filters when category changes
  useEffect(() => {
    setFilters((prev: GoalFilters) => ({
      ...prev,
      category: selectedCategory === 'All' ? undefined : selectedCategory,
    }));
  }, [selectedCategory, setFilters]);

  // Update filters when status changes
  useEffect(() => {
    setFilters((prev: GoalFilters) => ({
      ...prev,
      status: selectedStatus === 'All' ? undefined : selectedStatus,
    }));
  }, [selectedStatus, setFilters]);

  const handleCreateGoal = async (data: GoalFormData) => {
    try {
      await createGoal(data);
      setShowCreateModal(false);
    } catch (err) {
      // Error is handled by the hook
      console.error('Failed to create goal:', err);
    }
  };

  const handleEditGoal = async (data: GoalFormData) => {
    if (!selectedGoal) return;
    try {
      await updateGoal(selectedGoal.id, data);
      setShowEditModal(false);
      setSelectedGoal(null);
    } catch (err) {
      console.error('Failed to update goal:', err);
    }
  };

  const handleDeleteGoal = async () => {
    if (!selectedGoal) return;
    try {
      await deleteGoal(selectedGoal.id);
      setShowDeleteModal(false);
      setSelectedGoal(null);
    } catch (err) {
      console.error('Failed to delete goal:', err);
    }
  };

  const handleProgressUpdate = async (goalId: number | undefined, data: GoalProgressUpdate) => {
    if (!goalId) return;
    try {
      await updateGoalProgress(goalId, data);
      setShowProgressModal(false);
      setSelectedGoal(null);
    } catch (err) {
      console.error('Failed to update goal progress:', err);
    }
  };

  const handleShareGoal = async (goalId: number | undefined, data: GoalShareData) => {
    if (!goalId) return;
    try {
      await shareGoal(goalId, data);
      setShowShareModal(false);
      setSelectedGoal(null);
    } catch (err) {
      console.error('Failed to share goal:', err);
    }
  };

  const handleActionClick = (e: React.MouseEvent, goal: Goal) => {
    e.stopPropagation();
    setSelectedGoal(goal);
  };

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      if ('Notification' in window) {
        try {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            setNotificationsEnabled(true);
            localStorage.setItem('goalNotificationsEnabled', 'true');
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      }
    } else {
      setNotificationsEnabled(false);
      localStorage.setItem('goalNotificationsEnabled', 'false');
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <div className="text-red-500 dark:text-red-400 text-lg font-medium">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Create Goal Modal */}
      <GoalFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateGoal}
        mode="create"
      />

      {/* Edit Goal Modal */}
      <GoalFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedGoal(null);
        }}
        onSubmit={handleEditGoal}
        initialData={selectedGoal}
        mode="edit"
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedGoal(null);
        }}
        onConfirm={handleDeleteGoal}
        title={selectedGoal?.title || ''}
      />

      {/* Progress Update Modal */}
      <GoalProgressModal
        isOpen={showProgressModal}
        onClose={() => {
          setShowProgressModal(false);
          setSelectedGoal(null);
        }}
        onUpdate={(data) => handleProgressUpdate(selectedGoal?.id, data)}
        goal={selectedGoal || { title: '', progress: 0, milestones: [], status: 'Not Started' }}
      />

      {/* Share Goal Modal */}
      <ShareGoalModal
        isOpen={showShareModal}
        onClose={() => {
          setShowShareModal(false);
          setSelectedGoal(null);
        }}
        onShare={(data) => handleShareGoal(selectedGoal?.id, data)}
        goal={selectedGoal || { 
          title: '', 
          description: '', 
          progress: 0, 
          category: 'Personal' 
        }}
      />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Goals</h1>
          <p className="text-muted-foreground">Track and manage your personal goals</p>
          {stats && (
            <div className="flex gap-4 mt-2 text-sm">
              <span className="text-muted-foreground">
                Total: {stats.total}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400">
                Completed: {stats.completed}
              </span>
              <span className="text-primary">
                In Progress: {stats.inProgress}
              </span>
              <span className="text-muted-foreground">
                Not Started: {stats.notStarted}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="relative"
              onClick={() => setShowNotificationSettings(!showNotificationSettings)}
            >
              {notificationsEnabled ? (
                <Bell className="w-4 h-4 text-primary" />
              ) : (
                <BellOff className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </div>

          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
              <ChevronDown className="w-4 h-4" />
            </Button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border z-50">
                <div className="p-2">
                  <h3 className="text-sm font-medium mb-2">Category</h3>
                  {categories.map(({ name, icon }) => (
                    <button
                      key={name}
                      onClick={() => {
                        setSelectedCategory(name);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm ${
                        selectedCategory === name
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent'
                      }`}
                    >
                      {icon}
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
                <div className="border-t border-border p-2">
                  <h3 className="text-sm font-medium mb-2">Status</h3>
                  {['All', 'Not Started', 'In Progress', 'Completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status as GoalStatus | 'All');
                        setShowFilterMenu(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm ${
                        selectedStatus === status
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={() => setShowCreateModal(true)}
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Goal
          </Button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
            selectedCategory === 'All'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          All
        </button>
        {categories.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => setSelectedCategory(name)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedCategory === name
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {icon}
            {name}
          </button>
        ))}
      </div>

      {/* Goals Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-card rounded-xl p-4 shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  goal.category === 'Wellness' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                  goal.category === 'Learning' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                  goal.category === 'Finance' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                  goal.category === 'Career' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                  goal.category === 'Fitness' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                  'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
                }`}>
                  {categories.find(c => c.name === goal.category)?.icon}
                </div>
                <div>
                  <h3 className="font-medium">{goal.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{goal.description}</p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowActionMenu(showActionMenu === goal.id ? null : goal.id);
                }}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>

              {showActionMenu === goal.id && (
                <div className="absolute right-0 top-8 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border z-50">
                  <div className="py-1">
                    <button
                      onClick={(e) => {
                        handleActionClick(e, goal);
                        setShowProgressModal(true);
                        setShowActionMenu(null);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-accent"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Update Progress
                    </button>
                    <button
                      onClick={(e) => {
                        handleActionClick(e, goal);
                        setShowEditModal(true);
                        setShowActionMenu(null);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-accent"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleActionClick(e, goal);
                        setShowShareModal(true);
                        setShowActionMenu(null);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-accent"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    <button
                      onClick={(e) => {
                        handleActionClick(e, goal);
                        setShowDeleteModal(true);
                        setShowActionMenu(null);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-accent"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">{goal.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className={`px-2 py-1 rounded-full text-xs ${
                goal.status === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                goal.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
              }`}>
                {goal.status}
              </span>
              <span className="text-muted-foreground">
                Due {new Date(goal.dueDate).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 