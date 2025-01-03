import { NextResponse } from 'next/server';
import { RewardsService } from '@/lib/services/rewards';
import { getWalletAddress } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const walletAddress = await getWalletAddress(request);
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

    const result = await RewardsService.claimRewards(user.id);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[CLAIM_REWARDS]', error);
    return new NextResponse(error.message || 'Internal error', { 
      status: error.message ? 400 : 500 
    });
  }
} 