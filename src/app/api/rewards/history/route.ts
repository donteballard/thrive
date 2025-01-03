import { NextResponse } from 'next/server';
import { RewardsService } from '@/lib/services/rewards';
import { getWalletAddress } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const walletAddress = await getWalletAddress(req);
    if (!walletAddress) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get or create user with wallet address
    let user = await db.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      user = await db.user.create({
        data: { walletAddress },
      });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    const type = searchParams.get('type') || undefined;
    const status = searchParams.get('status') || undefined;
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;

    const filters = {
      type,
      status,
      startDate,
      endDate
    };

    const history = await RewardsService.getRewardsHistory(user.id, page, limit, filters);
    return NextResponse.json(history);
  } catch (error) {
    console.error('[REWARDS_HISTORY]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 