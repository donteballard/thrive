'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

export function WelcomeModal({ isOpen, onClose, onGetStarted }: WelcomeModalProps) {
  // Handle background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // Create a controlled confetti burst
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
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5 dark:text-gray-400" />
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Welcome to Thraive! 🎉</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You're now connected and ready to start your journey towards a better you.
              Let's get you set up with your personalized dashboard.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-left p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">Set Your Goals</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Define your personal, health, and financial objectives</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left p-3 rounded-lg bg-green-50 dark:bg-green-900/30">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">Complete Tasks</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Follow AI-guided tasks to achieve your goals</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">Earn Rewards</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get THRAIVE tokens for your achievements</p>
                </div>
              </div>
            </div>

            <button
              onClick={onGetStarted}
              className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 