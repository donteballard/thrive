import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    // Get top users by achievement points
    const topUsers = await db.user.findMany({
      take: 10, // Limit to top 10
      include: {
        achievements: true,
      },
      orderBy: {
        stats: {
          totalPoints: 'desc',
        },
      },
    });

    const leaderboard = topUsers.map(user => {
      const earnedAchievements = user.achievements.filter(a => a.earned);
      return {
        id: user.id,
        address: user.walletAddress,
        achievements: earnedAchievements.length,
        points: earnedAchievements.reduce((sum, achievement) => sum + achievement.points, 0),
        avatar: user.avatar || '👤', // Default avatar if none set
      };
    });

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('[ACHIEVEMENTS_LEADERBOARD_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 