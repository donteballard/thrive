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
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const showEarned = searchParams.get('showEarned');
    const showUnearned = searchParams.get('showUnearned');

    // Build the where clause based on filters
    const where = {
      userId: user.id,
      ...(category && category !== 'All' ? { category } : {}),
      ...(showEarned === 'true' && showUnearned === 'false' ? { earned: true } : {}),
      ...(showEarned === 'false' && showUnearned === 'true' ? { earned: false } : {}),
    };

    const achievements = await db.achievement.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(achievements);
  } catch (error) {
    console.error('[ACHIEVEMENTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 