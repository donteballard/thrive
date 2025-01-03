import { useState, useEffect } from 'react';
import { Achievement, LeaderboardEntry, TimelineEvent, AchievementStats, AchievementFilters } from '@/types/achievements';
import { achievementService } from '@/services/achievementService';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<AchievementStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<AchievementFilters>({
    category: 'All',
    showEarned: true,
    showUnearned: true,
  });

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const data = await achievementService.getAchievements();
      setAchievements(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch achievements');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await achievementService.getAchievementStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch achievement stats:', err);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const data = await achievementService.getLeaderboard();
      setLeaderboard(data);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  const fetchTimeline = async () => {
    try {
      const data = await achievementService.getTimeline();
      setTimeline(data);
    } catch (err) {
      console.error('Failed to fetch timeline:', err);
    }
  };

  const claimAchievement = async (achievementId: number) => {
    try {
      const updatedAchievement = await achievementService.claimAchievement(achievementId);
      setAchievements(prev => 
        prev.map(achievement => 
          achievement.id === achievementId ? updatedAchievement : achievement
        )
      );
      await fetchStats(); // Refresh stats after claiming
      return true;
    } catch (err) {
      console.error('Failed to claim achievement:', err);
      return false;
    }
  };

  const shareAchievement = async (achievementId: number, platform: string) => {
    try {
      await achievementService.shareAchievement(achievementId, platform);
      return true;
    } catch (err) {
      console.error('Failed to share achievement:', err);
      return false;
    }
  };

  const updateFilters = (newFilters: Partial<AchievementFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = filters.category === 'All' || achievement.category === filters.category;
    const matchesEarnedFilter = 
      (achievement.earned && filters.showEarned) || 
      (!achievement.earned && filters.showUnearned);
    return matchesCategory && matchesEarnedFilter;
  });

  useEffect(() => {
    fetchAchievements();
    fetchStats();
    fetchLeaderboard();
    fetchTimeline();
  }, []);

  return {
    achievements: filteredAchievements,
    stats,
    leaderboard,
    timeline,
    loading,
    error,
    filters,
    updateFilters,
    claimAchievement,
    shareAchievement,
    refreshData: {
      achievements: fetchAchievements,
      stats: fetchStats,
      leaderboard: fetchLeaderboard,
      timeline: fetchTimeline,
    },
  };
}; 