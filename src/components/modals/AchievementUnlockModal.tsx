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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md p-6 bg-background rounded-xl shadow-xl border border-border"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="text-center">
            <div className="mb-4">
              <span className="text-4xl">🏆</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Achievement Unlocked!</h2>
            <h3 className="text-xl font-semibold mb-4 text-primary">
              {achievement.title}
            </h3>
            <p className="text-muted-foreground mb-4">
              {achievement.description}
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Rarity:
                </span>
                <span className="text-sm font-semibold text-primary">
                  {achievement.rarity}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Reward:
                </span>
                <span className="text-sm font-semibold text-primary">
                  {achievement.tokenReward} THRAIVE
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Awesome!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 