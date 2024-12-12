'use client';

import { WalletContextProvider } from './WalletContextProvider';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <WalletContextProvider>{children}</WalletContextProvider>;
} 