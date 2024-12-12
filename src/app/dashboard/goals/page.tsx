'use client';

import { useState, useMemo } from 'react';
import { Plus, Search, Filter, MoreVertical, ChevronDown, Trash2, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoalFormModal } from '@/components/modals/GoalFormModal';
import { DeleteConfirmationModal } from '@/components/modals/DeleteConfirmationModal';

// Temporary mock data
const mockGoals = [
  {
    id: 1,
    title: 'Daily Meditation',
    category: 'Wellness',
    progress: 65,
    status: 'In Progress',
    dueDate: '2024-02-01',
    description: 'Meditate for 15 minutes every morning to improve focus and reduce stress.',
    milestones: [
      'Set up meditation space',
      'Start with 5 minutes daily',
      'Increase to 10 minutes',
      'Achieve 15 minutes consistently'
    ]
  },
  {
    id: 2,
    title: 'Learn TypeScript',
    category: 'Learning',
    progress: 30,
    status: 'In Progress',
    dueDate: '2024-03-15',
    description: 'Complete TypeScript course and build a project using TypeScript.',
    milestones: [
      'Complete basic TypeScript tutorial',
      'Practice with small projects',
      'Build portfolio project'
    ]
  },
  {
    id: 3,
    title: 'Save $5000',
    category: 'Finance',
    progress: 45,
    status: 'In Progress',
    dueDate: '2024-06-30',
    description: 'Save $5000 for emergency fund by reducing unnecessary expenses.',
    milestones: [
      'Create budget plan',
      'Save first $1000',
      'Reach $2500 milestone',
      'Achieve $5000 goal'
    ]
  },
];

const statusOptions = ['All', 'Not Started', 'In Progress', 'Completed'];

export default function GoalsPage() {
  const [goals, setGoals] = useState(mockGoals);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);

  // Calculate category counts
  const categories = useMemo(() => {
    const counts = goals.reduce((acc, goal) => {
      acc[goal.category] = (acc[goal.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { name: 'All', count: goals.length },
      { name: 'Wellness', count: counts['Wellness'] || 0 },
      { name: 'Learning', count: counts['Learning'] || 0 },
      { name: 'Finance', count: counts['Finance'] || 0 },
      { name: 'Career', count: counts['Career'] || 0 },
      { name: 'Fitness', count: counts['Fitness'] || 0 },
      { name: 'Personal', count: counts['Personal'] || 0 },
    ].filter(category => category.name === 'All' || category.count > 0);
  }, [goals]);

  // Filter goals based on search, category, and status
  const filteredGoals = useMemo(() => {
    return goals.filter(goal => {
      const matchesSearch = goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          goal.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || goal.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || goal.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus, goals]);

  const handleCreateGoal = (goalData: any) => {
    const newGoal = {
      ...goalData,
      id: Math.max(0, ...goals.map(g => g.id)) + 1,
      progress: 0,
      status: 'Not Started'
    };
    setGoals(prev => [...prev, newGoal]);
    setShowCreateModal(false);
  };

  const handleEditGoal = (goalData: any) => {
    setGoals(prev => prev.map(goal => 
      goal.id === selectedGoal.id ? { ...goal, ...goalData } : goal
    ));
    setShowEditModal(false);
    setSelectedGoal(null);
  };

  const handleDeleteGoal = () => {
    setGoals(prev => prev.filter(goal => goal.id !== selectedGoal.id));
    setShowDeleteModal(false);
    setSelectedGoal(null);
    setShowActionMenu(null);
  };

  const handleActionClick = (e: React.MouseEvent, goal: any) => {
    e.stopPropagation();
    setSelectedGoal(goal);
    setShowActionMenu(showActionMenu === goal.id ? null : goal.id);
  };

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

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedGoal(null);
        }}
        onConfirm={handleDeleteGoal}
        title={selectedGoal?.title || ''}
      />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Goals</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your personal goals</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Goal</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search goals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Filter className="w-5 h-5" />
            <span>Filter</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Filter Dropdown */}
          <AnimatePresence>
            {showFilterMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
              >
                <div className="px-3 py-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status);
                        setShowFilterMenu(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-lg ${
                        selectedStatus === status
                          ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedCategory === category.name
                ? 'bg-blue-600 dark:bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Goals Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGoals.map((goal) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold dark:text-white">{goal.title}</h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">{goal.category}</span>
              </div>
              <div className="relative">
                <button 
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  onClick={(e) => handleActionClick(e, goal)}
                >
                  <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>

                {/* Action Menu */}
                <AnimatePresence>
                  {showActionMenu === goal.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-36 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowEditModal(true);
                          setShowActionMenu(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteModal(true);
                          setShowActionMenu(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{goal.description}</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium dark:text-white">{goal.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Due Date</span>
                <span className="font-medium dark:text-white">{goal.dueDate}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 