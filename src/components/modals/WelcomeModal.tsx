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
          colors: ['#22C55E', '#16A34A', '#15803D']
        });

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#22C55E', '#16A34A', '#15803D']
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
          className="relative w-full max-w-lg p-6 bg-black rounded-xl shadow-xl border border-green-800"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-900"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Welcome to Thraive! 🎉</h2>
            <p className="text-gray-400 mb-6">
              You're now connected and ready to start your journey towards a better you.
              Let's get you set up with your personalized dashboard.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-left p-3 rounded-lg bg-primary/20 border border-green-800">
                <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-white">Set Your Goals</h3>
                  <p className="text-sm text-gray-400">Define your personal, health, and financial objectives</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left p-3 rounded-lg bg-primary/20 border border-green-800">
                <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-white">Complete Tasks</h3>
                  <p className="text-sm text-gray-400">Follow AI-guided tasks to achieve your goals</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left p-3 rounded-lg bg-primary/20 border border-green-800">
                <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-white">Earn Rewards</h3>
                  <p className="text-sm text-gray-400">Get THRAIVE tokens for your achievements</p>
                </div>
              </div>
            </div>

            <button
              onClick={onGetStarted}
              className="mt-8 px-6 py-3 bg-primary hover:bg-primary/90 text-black rounded-lg transition-colors font-semibold"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 