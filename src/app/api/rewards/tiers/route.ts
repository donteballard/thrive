import { NextResponse } from 'next/server';
import { RewardsService } from '@/lib/services/rewards';
import { getWalletAddress } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const walletAddress = await getWalletAddress(request);
    if (!walletAddress) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const tiers = await RewardsService.getStakingTiers();
    return NextResponse.json(tiers);
  } catch (error) {
    console.error('[REWARDS_TIERS]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 