import { NextResponse } from 'next/server';
import { RewardsService } from '@/lib/services/rewards';
import { getWalletAddress } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const walletAddress = await getWalletAddress(request);
    if (!walletAddress) {
      return new NextResponse('Unauthorized - Please connect your wallet', { status: 401 });
    }

    // Get or create user with wallet address
    let user = await db.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      user = await db.user.create({
        data: { 
          walletAddress,
          username: walletAddress, // Use full wallet address as username
        },
      });
    }

    const userStaking = await RewardsService.getUserStaking(user.id);
    return NextResponse.json(userStaking);
  } catch (error) {
    console.error('[USER_STAKING]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 