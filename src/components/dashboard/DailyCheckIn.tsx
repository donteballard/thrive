'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smile,
  Meh,
  Frown,
  Sun,
  Moon,
  Battery,
  Zap,
  Trophy,
  Check
} from 'lucide-react';

interface CheckInData {
  mood: 'great' | 'okay' | 'bad' | null;
  energy: 'high' | 'medium' | 'low' | null;
  sleep: 'good' | 'fair' | 'poor' | null;
  completed: boolean;
}

const DAILY_REWARDS = {
  checkIn: 10,
  streak: 5,
  total: 0 // Will be calculated
};

interface DailyCheckInProps {
  onComplete: (rewards: typeof DAILY_REWARDS) => void;
}

export function DailyCheckIn({ onComplete }: DailyCheckInProps) {
  const [step, setStep] = useState(1);
  const [checkInData, setCheckInData] = useState<CheckInData>({
    mood: null,
    energy: null,
    sleep: null,
    completed: false
  });

  const handleMoodSelect = (mood: CheckInData['mood']) => {
    setCheckInData(prev => ({ ...prev, mood }));
    setStep(2);
  };

  const handleEnergySelect = (energy: CheckInData['energy']) => {
    setCheckInData(prev => ({ ...prev, energy }));
    setStep(3);
  };

  const handleSleepSelect = (sleep: CheckInData['sleep']) => {
    setCheckInData(prev => ({ ...prev, sleep }));
    handleComplete();
  };

  const handleComplete = () => {
    setCheckInData(prev => ({ ...prev, completed: true }));
    // Calculate total rewards
    DAILY_REWARDS.total = DAILY_REWARDS.checkIn + DAILY_REWARDS.streak;
    onComplete(DAILY_REWARDS);
  };

  return (
    <div className="bg-black rounded-xl shadow-sm overflow-hidden">
      {/* Progress Steps */}
      <div className="p-4 border-b border-green-800">
        <div className="flex justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className="flex items-center"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= stepNumber
                  ? 'bg-primary text-black'
                  : 'bg-black border border-green-800 text-gray-400'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-full h-1 ${
                  step > stepNumber
                    ? 'bg-primary'
                    : 'bg-green-800'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-white">How are you feeling today?</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { mood: 'great', icon: Smile, label: 'Great', color: 'text-green-400' },
                  { mood: 'okay', icon: Meh, label: 'Okay', color: 'text-yellow-400' },
                  { mood: 'bad', icon: Frown, label: 'Bad', color: 'text-red-400' }
                ].map((option) => (
                  <button
                    key={option.mood}
                    onClick={() => handleMoodSelect(option.mood as CheckInData['mood'])}
                    className={`p-4 rounded-lg border-2 border-transparent hover:border-primary transition-colors ${
                      checkInData.mood === option.mood ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    <option.icon className={`w-12 h-12 mx-auto mb-2 ${option.color}`} />
                    <span className="block text-sm font-medium text-white">{option.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-white">How's your energy level?</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { level: 'high', icon: Zap, label: 'High', color: 'text-yellow-400' },
                  { level: 'medium', icon: Battery, label: 'Medium', color: 'text-primary' },
                  { level: 'low', icon: Battery, label: 'Low', color: 'text-red-400' }
                ].map((option) => (
                  <button
                    key={option.level}
                    onClick={() => handleEnergySelect(option.level as CheckInData['energy'])}
                    className={`p-4 rounded-lg border-2 border-transparent hover:border-primary transition-colors ${
                      checkInData.energy === option.level ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    <option.icon className={`w-12 h-12 mx-auto mb-2 ${option.color}`} />
                    <span className="block text-sm font-medium text-white">{option.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-white">How did you sleep?</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { quality: 'good', icon: Moon, label: 'Good', color: 'text-green-400' },
                  { quality: 'fair', icon: Moon, label: 'Fair', color: 'text-yellow-400' },
                  { quality: 'poor', icon: Moon, label: 'Poor', color: 'text-red-400' }
                ].map((option) => (
                  <button
                    key={option.quality}
                    onClick={() => handleSleepSelect(option.quality as CheckInData['sleep'])}
                    className={`p-4 rounded-lg border-2 border-transparent hover:border-primary transition-colors ${
                      checkInData.sleep === option.quality ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    <option.icon className={`w-12 h-12 mx-auto mb-2 ${option.color}`} />
                    <span className="block text-sm font-medium text-white">{option.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 