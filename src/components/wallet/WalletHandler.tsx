'use client';

import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function WalletHandler() {
  const { publicKey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    const handleWalletConnection = async () => {
      if (publicKey) {
        const walletAddress = publicKey.toString();
        
        // Validate wallet address format
        if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(walletAddress)) {
          console.error('Invalid wallet address format');
          toast.error('Invalid wallet address format');
          return;
        }

        try {
          // Set the wallet address in a cookie and create user
          const response = await fetch('/api/auth/wallet', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletAddress }),
          });

          if (!response.ok) {
            throw new Error('Failed to set wallet address');
          }

          const data = await response.json();
          console.log('Wallet connected:', data.user);
          
          // Redirect to dashboard after successful connection
          router.push('/dashboard');
          toast.success('Wallet connected successfully');
        } catch (error) {
          console.error('Wallet connection error:', error);
          toast.error('Failed to connect wallet. Please try again.');
        }
      }
    };

    handleWalletConnection();
  }, [publicKey, router]);

  return null;
} 