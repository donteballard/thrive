import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// For development, we'll use a mock wallet address
const MOCK_WALLET_ADDRESS = "11111111111111111111111111111111";

export async function getWalletAddress(request: Request | NextRequest): Promise<string> {
  // For development, always return the mock wallet address
  return MOCK_WALLET_ADDRESS;
}

export async function setWalletAddress(walletAddress: string) {
  cookies().set('wallet_address', walletAddress, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
}

export async function clearWalletAddress() {
  cookies().delete('wallet_address');
} 