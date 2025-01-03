import { Achievement, LeaderboardEntry, TimelineEvent, AchievementStats } from '@/types/achievements';

class AchievementService {
  private baseUrl = '/api/achievements';

  async getAchievements(): Promise<Achievement[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error('Failed to fetch achievements');
    return response.json();
  }

  async getAchievementStats(): Promise<AchievementStats> {
    const response = await fetch(`${this.baseUrl}/stats`);
    if (!response.ok) throw new Error('Failed to fetch achievement stats');
    return response.json();
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const response = await fetch(`${this.baseUrl}/leaderboard`);
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    return response.json();
  }

  async getTimeline(): Promise<TimelineEvent[]> {
    const response = await fetch(`${this.baseUrl}/timeline`);
    if (!response.ok) throw new Error('Failed to fetch timeline');
    return response.json();
  }

  async claimAchievement(achievementId: number): Promise<Achievement> {
    const response = await fetch(`${this.baseUrl}/${achievementId}/claim`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to claim achievement');
    return response.json();
  }

  async shareAchievement(achievementId: number, platform: string): Promise<{ success: boolean }> {
    const response = await fetch(`${this.baseUrl}/${achievementId}/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ platform }),
    });
    if (!response.ok) throw new Error('Failed to share achievement');
    return response.json();
  }
}

export const achievementService = new AchievementService(); 