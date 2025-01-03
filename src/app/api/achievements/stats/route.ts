import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getWalletAddress } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const walletAddress = await getWalletAddress(request);
    if (!walletAddress) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { walletAddress },
      include: {
        achievements: true,
        stats: true,
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Calculate stats from achievements array
    const achievements = user.achievements;
    const earnedAchievements = achievements.filter(a => a.earned);
    
    const stats = {
      totalEarned: earnedAchievements.length,
      totalAchievements: achievements.length,
      totalTokens: earnedAchievements.reduce((sum, achievement) => sum + achievement.tokenReward, 0),
      currentStreak: user.stats?.currentStreak || 0,
      longestStreak: user.stats?.longestStreak || 0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('[ACHIEVEMENTS_STATS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 