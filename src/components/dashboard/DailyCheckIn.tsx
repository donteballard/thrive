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
  goals: string[];
  completed: boolean;
}

const DAILY_REWARDS = {
  checkIn: 10,
  streak: 5,
  goals: 20,
  total: 0 // Will be calculated
};

export function DailyCheckIn() {
  const [step, setStep] = useState(1);
  const [checkInData, setCheckInData] = useState<CheckInData>({
    mood: null,
    energy: null,
    sleep: null,
    goals: [],
    completed: false
  });
  const [showReward, setShowReward] = useState(false);

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
    setStep(4);
  };

  const handleComplete = () => {
    setCheckInData(prev => ({ ...prev, completed: true }));
    // Calculate total rewards
    DAILY_REWARDS.total = DAILY_REWARDS.checkIn + DAILY_REWARDS.streak + DAILY_REWARDS.goals;
    setShowReward(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      {/* Progress Steps */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className="flex items-center"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= stepNumber
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`w-full h-1 ${
                  step > stepNumber
                    ? 'bg-blue-600'
                    : 'bg-gray-100 dark:bg-gray-700'
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
              <h2 className="text-xl font-semibold dark:text-white">How are you feeling today?</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { mood: 'great', icon: Smile, label: 'Great', color: 'text-green-600 dark:text-green-400' },
                  { mood: 'okay', icon: Meh, label: 'Okay', color: 'text-yellow-600 dark:text-yellow-400' },
                  { mood: 'bad', icon: Frown, label: 'Bad', color: 'text-red-600 dark:text-red-400' }
                ].map((option) => (
                  <button
                    key={option.mood}
                    onClick={() => handleMoodSelect(option.mood as CheckInData['mood'])}
                    className={`p-4 rounded-lg border-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 transition-colors ${
                      checkInData.mood === option.mood ? 'border-blue-600 dark:border-blue-400' : ''
                    }`}
                  >
                    <option.icon className={`w-12 h-12 mx-auto mb-2 ${option.color}`} />
                    <span className="block text-sm font-medium dark:text-white">{option.label}</span>
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
              <h2 className="text-xl font-semibold dark:text-white">How's your energy level?</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { level: 'high', icon: Zap, label: 'High', color: 'text-yellow-600 dark:text-yellow-400' },
                  { level: 'medium', icon: Battery, label: 'Medium', color: 'text-blue-600 dark:text-blue-400' },
                  { level: 'low', icon: Battery, label: 'Low', color: 'text-red-600 dark:text-red-400' }
                ].map((option) => (
                  <button
                    key={option.level}
                    onClick={() => handleEnergySelect(option.level as CheckInData['energy'])}
                    className={`p-4 rounded-lg border-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 transition-colors ${
                      checkInData.energy === option.level ? 'border-blue-600 dark:border-blue-400' : ''
                    }`}
                  >
                    <option.icon className={`w-12 h-12 mx-auto mb-2 ${option.color}`} />
                    <span className="block text-sm font-medium dark:text-white">{option.label}</span>
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
              <h2 className="text-xl font-semibold dark:text-white">How did you sleep?</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { quality: 'good', icon: Moon, label: 'Good', color: 'text-green-600 dark:text-green-400' },
                  { quality: 'fair', icon: Moon, label: 'Fair', color: 'text-yellow-600 dark:text-yellow-400' },
                  { quality: 'poor', icon: Moon, label: 'Poor', color: 'text-red-600 dark:text-red-400' }
                ].map((option) => (
                  <button
                    key={option.quality}
                    onClick={() => handleSleepSelect(option.quality as CheckInData['sleep'])}
                    className={`p-4 rounded-lg border-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 transition-colors ${
                      checkInData.sleep === option.quality ? 'border-blue-600 dark:border-blue-400' : ''
                    }`}
                  >
                    <option.icon className={`w-12 h-12 mx-auto mb-2 ${option.color}`} />
                    <span className="block text-sm font-medium dark:text-white">{option.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold dark:text-white">Set Your Daily Goals</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="Add a goal for today..."
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {checkInData.goals.map((goal, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <span className="text-gray-900 dark:text-white">{goal}</span>
                      <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleComplete}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Complete Check-in
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reward Modal */}
        <AnimatePresence>
          {showReward && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-sm w-full mx-4"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white">Check-in Complete!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    You've earned rewards for checking in today
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Daily Check-in</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">+{DAILY_REWARDS.checkIn} THRIVE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Streak Bonus</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">+{DAILY_REWARDS.streak} THRIVE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Goals Set</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">+{DAILY_REWARDS.goals} THRIVE</span>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-blue-600 dark:text-blue-400">+{DAILY_REWARDS.total} THRIVE</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowReward(false)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Awesome!
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 