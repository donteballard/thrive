import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

// Validate Solana wallet address format
function isValidSolanaAddress(address: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
}

export async function POST(request: Request) {
  try {
    const { walletAddress } = await request.json();
    
    if (!walletAddress || typeof walletAddress !== 'string' || !isValidSolanaAddress(walletAddress)) {
      return new NextResponse('Invalid wallet address format', { status: 400 });
    }

    // Set the wallet address cookie
    cookies().set('wallet_address', walletAddress, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    // Get or create user with wallet address
    let user = await db.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      user = await db.user.create({
        data: { 
          walletAddress: walletAddress,
          username: walletAddress, // Use full wallet address as username
        },
      });
    }

    return NextResponse.json({ message: 'Wallet address set successfully', user });
  } catch (error) {
    console.error('[WALLET_AUTH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 