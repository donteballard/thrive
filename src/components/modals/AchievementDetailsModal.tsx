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
        title: `Thraive Achievement - ${achievement.title}`,
        text: `Check out this achievement in Thraive: ${achievement.title}! 🎮`,
        url: window.location.href
      });
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative w-full max-w-lg p-6 bg-background rounded-xl shadow-xl border border-border"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="flex items-start gap-4 mb-6">
            <div className={`p-3 rounded-lg ${
              achievement.rarity === 'Common' ? 'bg-primary/10' :
              achievement.rarity === 'Rare' ? 'bg-primary/10' :
              'bg-primary/10'
            }`}>
              <achievement.icon className={`w-8 h-8 text-primary`} />
            </div>
            <div>
              <h2 className="text-xl font-bold">{achievement.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium text-primary">
                  {achievement.rarity}
                </span>
                <span className="text-sm text-muted-foreground">•</span>
                <div className="flex items-center gap-1 text-primary">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm font-medium">+{achievement.tokenReward}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{achievement.description}</p>
            </div>

            {achievement.requirements && (
              <div>
                <h3 className="text-sm font-medium mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {achievement.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Award className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {achievement.totalEarned !== undefined && (
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Total Earned</span>
                  </div>
                  <p className="text-lg font-medium">{achievement.totalEarned}</p>
                </div>
              )}

              {achievement.earnedDate && (
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Earned On</span>
                  </div>
                  <p className="text-lg font-medium">
                    {new Date(achievement.earnedDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {achievement.progress !== undefined && achievement.progress < 100 && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{achievement.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={shareAchievement}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors"
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