'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Share2, Globe, Users, Lock } from 'lucide-react';
import { Goal, GoalShareData, GoalVisibility } from '@/types/goals';

interface ShareGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (data: GoalShareData) => void;
  goal: Pick<Goal, 'title' | 'description' | 'progress' | 'category'>;
}

export function ShareGoalModal({
  isOpen,
  onClose,
  onShare,
  goal
}: ShareGoalModalProps) {
  const [visibility, setVisibility] = useState<GoalVisibility>('private');
  const [message, setMessage] = useState('');
  const [allowComments, setAllowComments] = useState(true);
  const [allowDuplication, setAllowDuplication] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShare({
      visibility,
      message,
      allowComments,
      allowDuplication,
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

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold dark:text-white">Share Goal</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{goal.title}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Visibility Options */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Who can see this goal?
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setVisibility('public')}
                className={`flex items-center gap-3 w-full p-3 rounded-lg border ${
                  visibility === 'public'
                    ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Globe className={`w-5 h-5 ${
                  visibility === 'public'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`} />
                <div className="text-left">
                  <div className={`font-medium ${
                    visibility === 'public'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-900 dark:text-white'
                  }`}>Public</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Anyone can view this goal</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setVisibility('friends')}
                className={`flex items-center gap-3 w-full p-3 rounded-lg border ${
                  visibility === 'friends'
                    ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Users className={`w-5 h-5 ${
                  visibility === 'friends'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`} />
                <div className="text-left">
                  <div className={`font-medium ${
                    visibility === 'friends'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-900 dark:text-white'
                  }`}>Friends</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Only your friends can view this goal</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setVisibility('private')}
                className={`flex items-center gap-3 w-full p-3 rounded-lg border ${
                  visibility === 'private'
                    ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Lock className={`w-5 h-5 ${
                  visibility === 'private'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`} />
                <div className="text-left">
                  <div className={`font-medium ${
                    visibility === 'private'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-900 dark:text-white'
                  }`}>Private</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Only you can view this goal</div>
                </div>
              </button>
            </div>
          </div>

          {/* Message */}
          {visibility !== 'private' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Add a message (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts about this goal..."
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          )}

          {/* Permissions */}
          {visibility !== 'private' && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Permissions
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="allowComments"
                  checked={allowComments}
                  onChange={(e) => setAllowComments(e.target.checked)}
                  className="w-4 h-4 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="allowComments" className="text-sm text-gray-700 dark:text-gray-300">
                  Allow comments
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="allowDuplication"
                  checked={allowDuplication}
                  onChange={(e) => setAllowDuplication(e.target.checked)}
                  className="w-4 h-4 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="allowDuplication" className="text-sm text-gray-700 dark:text-gray-300">
                  Allow others to duplicate this goal
                </label>
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
              Share Goal
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 