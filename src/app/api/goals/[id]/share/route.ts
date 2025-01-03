import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { GoalShareData } from '@/types/goals';
import { getWalletAddress } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const walletAddress = await getWalletAddress(request);
    if (!walletAddress) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get user by wallet address
    const user = await db.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const body = await request.json();
    const { visibility, message, allowComments, allowDuplication } = body as GoalShareData;

    const goal = await db.goal.findUnique({
      where: {
        id: parseInt(params.id),
        userId: user.id,
      },
    });

    if (!goal) {
      return new NextResponse('Not found', { status: 404 });
    }

    // Create a shared goal post
    const sharedGoal = await db.sharedGoal.create({
      data: {
        goalId: goal.id,
        userId: user.id,
        visibility,
        message,
        allowComments,
        allowDuplication,
      },
    });

    // Create activity feed item
    await db.activityFeed.create({
      data: {
        userId: user.id,
        type: 'goal_shared',
        data: {
          goalId: goal.id,
          goalTitle: goal.title,
          sharedGoalId: sharedGoal.id,
          visibility,
        },
      },
    });

    // If sharing publicly, award points
    if (visibility === 'public') {
      await db.userStats.upsert({
        where: { userId: user.id },
        update: {
          goalsShared: { increment: 1 },
          totalPoints: { increment: 10 }, // Points for sharing a goal
        },
        create: {
          userId: user.id,
          goalsShared: 1,
          totalPoints: 10,
        },
      });
    }

    // Update goal visibility settings
    const updatedGoal = await db.goal.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        visibility,
        allowComments,
        allowDuplication,
      },
    });

    return NextResponse.json({
      goal: updatedGoal,
      sharedGoal,
    });
  } catch (error) {
    console.error('[GOAL_SHARE_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 