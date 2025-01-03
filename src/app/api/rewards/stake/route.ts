import { NextResponse } from 'next/server';
import { RewardsService } from '@/lib/services/rewards';
import { getWalletAddress } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req: Request) {
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

    const body = await req.json();
    const result = await RewardsService.stakeTokens(user.id, body);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[STAKE_TOKENS]', error);
    return new NextResponse(error.message || 'Internal error', { 
      status: error.message ? 400 : 500 
    });
  }
} 