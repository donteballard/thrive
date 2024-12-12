'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface AchievementUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: {
    title: string;
    description: string;
    rarity: string;
    tokenReward: number;
  };
}

export function AchievementUnlockModal({
  isOpen,
  onClose,
  achievement
}: AchievementUnlockModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Create a more controlled confetti burst
      const duration = 1500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#3B82F6', '#60A5FA', '#93C5FD']
        });

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#3B82F6', '#60A5FA', '#93C5FD']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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

          <div className="text-center">
            <div className="mb-4">
              <span className="text-4xl">🏆</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 dark:text-white">Achievement Unlocked!</h2>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              {achievement.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {achievement.description}
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Rarity:
                </span>
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  {achievement.rarity}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Reward:
                </span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {achievement.tokenReward} THRIVE
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Awesome!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 