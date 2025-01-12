'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { Goal, GoalFormData, GoalCategory } from '@/types/goals';

interface GoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GoalFormData) => void;
  initialData?: Goal | null;
  mode: 'create' | 'edit';
}

export function GoalFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode
}: GoalFormModalProps) {
  const [formData, setFormData] = useState<GoalFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'Personal',
    dueDate: initialData?.dueDate || new Date().toISOString().split('T')[0],
    milestones: initialData?.milestones || [],
    visibility: initialData?.visibility || 'private',
    allowComments: initialData?.allowComments ?? true,
    allowDuplication: initialData?.allowDuplication ?? true,
  });

  const [newMilestone, setNewMilestone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addMilestone = () => {
    if (newMilestone.trim()) {
      setFormData(prev => ({
        ...prev,
        milestones: [...prev.milestones, newMilestone.trim()]
      }));
      setNewMilestone('');
    }
  };

  const removeMilestone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg p-6 bg-black rounded-xl shadow-xl border border-green-800"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:bg-primary/20"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-white">
          {mode === 'create' ? 'Create New Goal' : 'Edit Goal'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, category: e.target.value as GoalCategory })}
              className="w-full px-4 py-2 border border-green-800 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="Wellness">Wellness</option>
              <option value="Learning">Learning</option>
              <option value="Finance">Finance</option>
              <option value="Career">Career</option>
              <option value="Fitness">Fitness</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Due Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-2 border border-green-800 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
                min={new Date().toISOString().split('T')[0]}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Milestones */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Milestones
            </label>
            <div className="space-y-2">
              {formData.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg bg-primary/20 border border-green-800"
                >
                  <span className="flex-1 text-sm text-gray-300">{milestone}</span>
                  <button
                    type="button"
                    onClick={() => removeMilestone(index)}
                    className="p-1 text-black hover:bg-green-900/20 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMilestone}
                  onChange={(e) => setNewMilestone(e.target.value)}
                  placeholder="Add a milestone..."
                  className="flex-1 px-4 py-2 border border-green-800 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addMilestone();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addMilestone}
                  className="px-4 py-2 bg-primary/20 text-white rounded-lg hover:bg-primary/30 border border-green-800"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:bg-primary/20 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-black rounded-lg font-semibold"
            >
              {mode === 'create' ? 'Create Goal' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 