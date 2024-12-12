'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Share2, X, Users, Clock, Award } from 'lucide-react';

interface AchievementDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: {
    title: string;
    description: string;
    icon: any;
    rarity: string;
    tokenReward: number;
    progress?: number;
    earnedDate?: string;
    totalEarned?: number;
    requirements?: string[];
  } | null;
}

export function AchievementDetailsModal({
  isOpen,
  onClose,
  achievement
}: AchievementDetailsModalProps) {
  if (!isOpen || !achievement) return null;

  const shareAchievement = async () => {
    try {
      await navigator.share({
        title: `Thrive Achievement - ${achievement.title}`,
        text: `Check out this achievement in Thrive: ${achievement.title}! 🎮`,
        url: window.location.href
      });
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative w-full max-w-lg p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5 dark:text-gray-400" />
          </button>

          <div className="flex items-start gap-4 mb-6">
            <div className={`p-3 rounded-lg ${
              achievement.rarity === 'Legendary' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
              achievement.rarity === 'Epic' ? 'bg-purple-100 dark:bg-purple-900/30' :
              achievement.rarity === 'Rare' ? 'bg-blue-100 dark:bg-blue-900/30' :
              'bg-gray-100 dark:bg-gray-700'
            }`}>
              <achievement.icon className={`w-8 h-8 ${
                achievement.rarity === 'Legendary' ? 'text-yellow-600 dark:text-yellow-400' :
                achievement.rarity === 'Epic' ? 'text-purple-600 dark:text-purple-400' :
                achievement.rarity === 'Rare' ? 'text-blue-600 dark:text-blue-400' :
                'text-gray-600 dark:text-gray-400'
              }`} />
            </div>
            <div>
              <h2 className="text-xl font-bold dark:text-white">{achievement.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-sm font-medium ${
                  achievement.rarity === 'Legendary' ? 'text-yellow-600 dark:text-yellow-400' :
                  achievement.rarity === 'Epic' ? 'text-purple-600 dark:text-purple-400' :
                  achievement.rarity === 'Rare' ? 'text-blue-600 dark:text-blue-400' :
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {achievement.rarity}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
                <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm font-medium">+{achievement.tokenReward}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
            </div>

            {achievement.requirements && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {achievement.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Award className="w-4 h-4 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {achievement.totalEarned !== undefined && (
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Total Earned</span>
                  </div>
                  <p className="text-lg font-medium dark:text-white">{achievement.totalEarned}</p>
                </div>
              )}

              {achievement.earnedDate && (
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Earned On</span>
                  </div>
                  <p className="text-lg font-medium dark:text-white">
                    {new Date(achievement.earnedDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {achievement.progress !== undefined && achievement.progress < 100 && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="font-medium dark:text-white">{achievement.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={shareAchievement}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 