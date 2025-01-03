'use client';

import { motion } from 'framer-motion';
import { Users, Trophy, Calendar, ArrowRight } from 'lucide-react';

interface ChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    participants: number;
    duration: string;
    reward: number;
    category: 'health' | 'finance' | 'personal' | 'social';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    startDate: string;
    progress?: number;
  };
  onJoin?: () => void;
}

export function ChallengeCard({ challenge, onJoin }: ChallengeCardProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      health: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
      finance: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
      personal: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30',
      social: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30'
    };
    return colors[category as keyof typeof colors];
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'text-green-600 dark:text-green-400',
      intermediate: 'text-yellow-600 dark:text-yellow-400',
      advanced: 'text-red-600 dark:text-red-400'
    };
    return colors[difficulty as keyof typeof colors];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getCategoryColor(challenge.category)}`}>
              {challenge.category}
            </span>
            <h3 className="mt-2 text-lg font-semibold dark:text-white">{challenge.title}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{challenge.description}</p>
          </div>
          <span className={`text-sm font-medium capitalize ${getDifficultyColor(challenge.difficulty)}`}>
            {challenge.difficulty}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {challenge.participants} participants
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {challenge.duration}
            </span>
          </div>
        </div>

        {challenge.progress !== undefined && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">{challenge.progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {challenge.reward} THRAIVE
            </span>
          </div>
          {onJoin && (
            <button
              onClick={onJoin}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Join Challenge
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
} 