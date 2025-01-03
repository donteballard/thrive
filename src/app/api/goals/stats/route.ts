import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { GoalStats } from '@/types/goals';
import { getWalletAddress } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const walletAddress = await getWalletAddress(request);
    
    // Get or create user with mock wallet address
    let user = await db.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      user = await db.user.create({
        data: { walletAddress },
      });
    }

    // Get all goals for the user
    const goals = await db.goal.findMany({
      where: {
        userId: user.id,
      },
    });

    // Calculate stats
    const stats: GoalStats = {
      total: goals.length,
      completed: goals.filter(goal => goal.status === 'Completed').length,
      inProgress: goals.filter(goal => goal.status === 'In Progress').length,
      notStarted: goals.filter(goal => goal.status === 'Not Started').length,
      overdue: goals.filter(goal => {
        const dueDate = new Date(goal.dueDate);
        return goal.status !== 'Completed' && dueDate < new Date();
      }).length,
      categoryBreakdown: goals.reduce((acc, goal) => {
        acc[goal.category] = (acc[goal.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };

    // Get user's goal-related achievements
    const achievements = await db.achievement.findMany({
      where: {
        userId: user.id,
        type: 'goal_completion',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    // Get user's goal streaks
    const userStats = await db.userStats.findUnique({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({
      ...stats,
      recentAchievements: achievements,
      streaks: {
        current: userStats?.currentStreak || 0,
        longest: userStats?.longestStreak || 0,
      },
    });
  } catch (error) {
    console.error('[GOALS_STATS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 