'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { Goal, GoalProgressUpdate, GoalStatus } from '@/types/goals';

interface GoalProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: GoalProgressUpdate) => void;
  goal: Pick<Goal, 'title' | 'progress' | 'milestones' | 'status'>;
}

export function GoalProgressModal({
  isOpen,
  onClose,
  onUpdate,
  goal
}: GoalProgressModalProps) {
  const [progress, setProgress] = useState(goal.progress);
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [status, setStatus] = useState<GoalStatus>(goal.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      progress,
      completedMilestones,
      status,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5 dark:text-gray-400" />
        </button>

        <h2 className="text-xl font-bold mb-4 dark:text-white">Update Progress</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{goal.title}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Progress Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Progress: {progress}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as GoalStatus)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Milestones */}
          {goal.milestones.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Milestones
              </label>
              <div className="space-y-2">
                {goal.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <input
                      type="checkbox"
                      checked={completedMilestones.includes(milestone)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCompletedMilestones([...completedMilestones, milestone]);
                        } else {
                          setCompletedMilestones(completedMilestones.filter(m => m !== milestone));
                        }
                      }}
                      className="w-4 h-4 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{milestone}</span>
                    {completedMilestones.includes(milestone) && (
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Update Progress
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 