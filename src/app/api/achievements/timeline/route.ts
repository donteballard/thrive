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
        achievements: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Filter earned achievements and map to timeline format
    const timeline = user.achievements
      .filter(achievement => achievement.earned && achievement.updatedAt)
      .map(achievement => ({
        id: achievement.id,
        achievement: achievement.title,
        date: achievement.updatedAt.toISOString(),
        reward: achievement.tokenReward,
        icon: achievement.icon,
        rarity: achievement.rarity,
      }));

    return NextResponse.json(timeline);
  } catch (error) {
    console.error('[ACHIEVEMENTS_TIMELINE_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 