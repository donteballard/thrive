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
          console.error('Invalid wallet address format:', walletAddress);
          toast.error('Invalid wallet address format');
          return;
        }

        try {
          console.log('Connecting wallet:', walletAddress);
          
          // Set the wallet address in a cookie and create user
          const response = await fetch('/api/auth/wallet', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletAddress }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Wallet connection failed:', errorText);
            throw new Error(errorText || 'Failed to set wallet address');
          }

          const data = await response.json();
          console.log('Wallet connection successful:', data);

          // Show success message
          toast.success('Wallet connected successfully');
          
          // Redirect to dashboard after a short delay to ensure cookie is set
          router.push('/dashboard');
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