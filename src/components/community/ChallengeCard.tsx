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
      health: 'text-primary bg-primary/40',
      finance: 'text-primary bg-primary/30',
      personal: 'text-primary bg-primary/20',
      social: 'text-primary bg-primary/10'
    };
    return colors[category as keyof typeof colors];
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'text-primary',
      intermediate: 'text-yellow-500',
      advanced: 'text-red-500'
    };
    return colors[difficulty as keyof typeof colors];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black rounded-xl shadow-sm border border-green-800 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getCategoryColor(challenge.category)}`}>
              {challenge.category}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-white">{challenge.title}</h3>
            <p className="mt-1 text-sm text-gray-400">{challenge.description}</p>
          </div>
          <span className={`text-sm font-medium capitalize ${getDifficultyColor(challenge.difficulty)}`}>
            {challenge.difficulty}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm text-gray-400">
              {challenge.participants} participants
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm text-gray-400">
              {challenge.duration}
            </span>
          </div>
        </div>

        {challenge.progress !== undefined && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-400">Progress</span>
              <span className="font-medium text-primary">{challenge.progress}%</span>
            </div>
            <div className="h-2 bg-black rounded-full overflow-hidden border border-green-800">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white">
              {challenge.reward} THRAIVE
            </span>
          </div>
          {onJoin && (
            <button
              onClick={onJoin}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium"
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