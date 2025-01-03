import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { GoalProgressUpdate } from '@/types/goals';
import { getWalletAddress } from '@/lib/auth';
import { Prisma } from '@prisma/client';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const walletAddress = await getWalletAddress(request);
    if (!walletAddress) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const body = await request.json();
    const { progress, completedMilestones, status } = body as GoalProgressUpdate;

    const goal = await db.goal.findUnique({
      where: {
        id: parseInt(params.id),
        userId: user.id,
      },
    });

    if (!goal) {
      return new NextResponse('Not found', { status: 404 });
    }

    const updatedGoal = await db.goal.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        progress,
        status,
        milestones: completedMilestones,
        updatedAt: new Date(),
      },
    });

    // If goal is completed, create an achievement
    if (status === 'Completed' && goal.status !== 'Completed') {
      await db.achievement.create({
        data: {
          userId: user.id,
          type: 'goal_completion',
          title: `Completed: ${goal.title}`,
          description: `Successfully completed the goal: ${goal.title}`,
          points: 100,
          category: goal.category,
          rarity: 'Common',
          tokenReward: 100,
          icon: 'Trophy',
          requirements: [],
          earned: true,
          earnedDate: new Date(),
          data: {
            goalId: goal.id,
            category: goal.category,
            completedAt: new Date(),
          }
        },
      });

      await db.userStats.upsert({
        where: { userId: user.id },
        update: {
          goalsCompleted: { increment: 1 },
          totalPoints: { increment: 100 },
        },
        create: {
          userId: user.id,
          goalsCompleted: 1,
          totalPoints: 100,
        },
      });
    }

    return NextResponse.json(updatedGoal);
  } catch (error) {
    console.error('[GOAL_PROGRESS_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 