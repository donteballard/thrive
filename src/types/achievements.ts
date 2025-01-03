export type AchievementRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type AchievementCategory = 'Productivity' | 'Goals' | 'Consistency' | 'Social';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: any; // This will be replaced with Lucide icon type
  progress: number;
  earned: boolean;
  earnedDate?: string;
  rarity: AchievementRarity;
  tokenReward: number;
  category: AchievementCategory;
  requirements: string[];
}

export interface LeaderboardEntry {
  id: number;
  address: string;
  achievements: number;
  points: number;
  avatar: string;
}

export interface TimelineEvent {
  id: number;
  achievement: string;
  date: string;
  reward: number;
  icon: any; // This will be replaced with Lucide icon type
  rarity: AchievementRarity;
}

export interface AchievementStats {
  totalEarned: number;
  totalAchievements: number;
  totalTokens: number;
}

export interface AchievementFilters {
  category: string;
  showEarned: boolean;
  showUnearned: boolean;
} 