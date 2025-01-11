'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

const WalletMultiButton = dynamic(
  async () => {
    const { WalletMultiButton: Button } = await import('@solana/wallet-adapter-react-ui');
    return Button;
  },
  { ssr: false }
);

export function ClientWalletButton() {
  const { connected } = useWallet();
  return <WalletMultiButton>{!connected && 'Launch App'}</WalletMultiButton>;
} 