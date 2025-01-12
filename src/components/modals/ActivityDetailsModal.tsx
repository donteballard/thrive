import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Tag, Award, CheckCircle2, BarChart2, Zap } from 'lucide-react';

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

interface Activity {
  id: number;
  type: 'task' | 'goal_progress' | 'achievement';
  title: string;
  description: string;
  status?: 'completed' | 'in_progress' | 'pending';
  progress?: number;
  points: number;
  category: string;
  duration?: number;
  createdAt: string;
}

interface ActivityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity?: Activity | null;
  onSubmit: (data: Partial<Activity>) => void;
  mode: 'create' | 'view';
}

export function ActivityDetailsModal({
  isOpen,
  onClose,
  activity,
  onSubmit,
  mode
}: ActivityDetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<Partial<Activity>>(
    activity || {
      type: 'task',
      title: '',
      description: '',
      status: 'pending',
      points: 0,
      category: 'General',
      duration: 0
    }
  );

  const handleClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  // Calculate points breakdown
  const getPointsBreakdown = () => {
    if (!formData.type) return null;
    
    const breakdown = [];
    switch (formData.type) {
      case 'task':
        breakdown.push({ label: 'Base Points', points: POINT_RULES.task.base });
        if (formData.status === 'completed') {
          breakdown.push({ label: 'Completion Bonus', points: POINT_RULES.task.completed });
        }
        if (formData.duration) {
          const durationPoints = Math.floor(formData.duration * POINT_RULES.task.duration_multiplier);
          breakdown.push({ label: 'Duration Bonus', points: durationPoints });
        }
        break;
      case 'goal_progress':
        breakdown.push({ label: 'Base Points', points: POINT_RULES.goal_progress.base });
        if (formData.progress) {
          const progressPoints = Math.floor(formData.progress * POINT_RULES.goal_progress.progress_multiplier);
          breakdown.push({ label: 'Progress Bonus', points: progressPoints });
        }
        break;
      case 'achievement':
        breakdown.push({ label: 'Achievement Points', points: POINT_RULES.achievement.base });
        break;
    }
    return breakdown;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={handleClick}>
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg p-6 bg-black rounded-xl shadow-xl border border-green-800"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:bg-primary/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-white">
          {mode === 'create' ? 'Add Activity' : 'Activity Details'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Activity Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Activity['type'] })}
              disabled={mode === 'view'}
              className="w-full px-4 py-2 border border-green-800 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="task" className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 inline-block mr-2" />Task
              </option>
              <option value="goal_progress">
                <BarChart2 className="w-4 h-4 inline-block mr-2" />Goal Progress
              </option>
              <option value="achievement">
                <Zap className="w-4 h-4 inline-block mr-2" />Achievement
              </option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={mode === 'view'}
              className="w-full px-4 py-2 border border-green-800 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={mode === 'view'}
              className="w-full px-4 py-2 border border-green-800 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none max-h-[100px]"
              rows={3}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              disabled={mode === 'view'}
              className="w-full px-4 py-2 border border-green-800 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="General">General</option>
              <option value="Wellness">Wellness</option>
              <option value="Health">Health</option>
              <option value="Productivity">Productivity</option>
              <option value="Learning">Learning</option>
            </select>
          </div>

          {/* Status (for tasks) */}
          {formData.type === 'task' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Activity['status'] })}
                disabled={mode === 'view'}
                className="w-full px-4 py-2 border border-green-800 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}

          {/* Progress (for goal progress) */}
          {formData.type === 'goal_progress' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Progress (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                disabled={mode === 'view'}
                className="w-full px-4 py-2 border border-green-800 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          {/* Points Display */}
          {mode === 'view' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Points Earned
              </label>
              <p className="text-lg font-semibold text-primary">
                {formData.points} points
              </p>
            </div>
          )}

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              min="0"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              disabled={mode === 'view'}
              className="w-full px-4 py-2 border border-green-800 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Points Breakdown */}
          {mode === 'view' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Points Breakdown
              </label>
              <div className="space-y-2">
                {getPointsBreakdown()?.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="font-medium text-primary">+{item.points}</span>
                  </div>
                ))}
                <div className="border-t border-green-800 pt-2 mt-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-white">Total Points</span>
                    <span className="text-primary">
                      +{formData.points}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {mode === 'create' && (
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-300 hover:bg-primary/20 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-black rounded-lg font-semibold"
              >
                Add Activity
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
} 