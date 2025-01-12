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
        className="relative w-full max-w-md p-6 bg-black rounded-xl shadow-xl border border-green-800"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:bg-primary/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-white">Update Progress</h2>
        <p className="text-gray-400 mb-6">{goal.title}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Progress Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Progress: {progress}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer border border-green-800"
              style={{
                backgroundImage: `linear-gradient(to right, rgb(34 197 94) ${progress}%, transparent ${progress}%)`
              }}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as GoalStatus)}
              className="w-full px-4 py-2 border border-green-800 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Milestones */}
          {goal.milestones.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Milestones
              </label>
              <div className="space-y-2">
                {goal.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg bg-primary/20 border border-green-800"
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
                      className="w-4 h-4 text-primary border-green-800 rounded focus:ring-primary bg-black"
                    />
                    <span className="flex-1 text-sm text-gray-300">{milestone}</span>
                    {completedMilestones.includes(milestone) && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
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
              className="px-4 py-2 text-gray-300 hover:bg-primary/20 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-black rounded-lg font-semibold transition-colors"
            >
              Update Progress
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 