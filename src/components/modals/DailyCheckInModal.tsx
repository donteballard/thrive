'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DailyCheckIn } from '@/components/dashboard/DailyCheckIn';
import { Trophy } from 'lucide-react';

interface DailyCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function DailyCheckInModal({
  isOpen,
  onClose,
  onComplete
}: DailyCheckInModalProps) {
  const [showCheckIn, setShowCheckIn] = useState(isOpen);
  const [showReward, setShowReward] = useState(false);
  const [rewards, setRewards] = useState({ checkIn: 0, streak: 0, total: 0 });

  useEffect(() => {
    setShowCheckIn(isOpen);
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (showCheckIn) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showCheckIn, onClose]);

  const handleCheckInComplete = (dailyRewards: typeof rewards) => {
    setRewards(dailyRewards);
    setShowCheckIn(false);
    setShowReward(true);
  };

  const handleRewardClose = () => {
    setShowReward(false);
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {showCheckIn && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-black border border-green-800 rounded-xl shadow-xl overflow-hidden"
          >
            <DailyCheckIn onComplete={handleCheckInComplete} />
          </motion.div>
        </div>
      )}

      {showReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black border border-green-800 p-6 rounded-xl shadow-xl max-w-sm w-full mx-4"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Check-in Complete!</h3>
              <p className="text-gray-400 mb-4">
                You've earned rewards for checking in today
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Daily Check-in</span>
                  <span className="font-medium text-primary">+{rewards.checkIn} THRAIVE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Streak Bonus</span>
                  <span className="font-medium text-primary">+{rewards.streak} THRAIVE</span>
                </div>
                <div className="h-px bg-green-800 my-2" />
                <div className="flex justify-between font-medium">
                  <span className="text-white">Total</span>
                  <span className="text-primary">+{rewards.total} THRAIVE</span>
                </div>
              </div>
              <button
                onClick={handleRewardClose}
                className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-black rounded-lg transition-colors"
              >
                Awesome!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 