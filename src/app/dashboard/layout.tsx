'use client';

import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { ClientWalletButton } from '@/components/wallet/ClientWalletButton';
import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!connected) {
      router.push('/');
    }
  }, [connected, router]);

  if (!connected) {
    return null; // Prevent flash of content while redirecting
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-black border-b border-green-800">
          <div className="flex items-center justify-end px-4 py-3">
            <Suspense fallback={<div className="h-[36px] w-[120px] bg-green-800 rounded-md animate-pulse" />}>
              <ClientWalletButton />
            </Suspense>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8 text-gray-100">{children}</main>
      </div>
    </div>
  );
} 