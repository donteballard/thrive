import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function getWalletAddress(request: Request | NextRequest): Promise<string | null> {
  // In production, get the actual wallet address from cookies
  const cookieStore = cookies();
  const walletAddress = cookieStore.get('wallet_address')?.value;
  
  if (!walletAddress) {
    return null;
  }

  return walletAddress;
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

// Helper function to format wallet address for display
export function formatWalletAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
} 