'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { ClientWalletButton } from '@/components/wallet/ClientWalletButton';
import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-end px-4 py-3">
            <Suspense fallback={<div className="h-[36px] w-[120px] bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />}>
              <ClientWalletButton />
            </Suspense>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8 dark:text-gray-100">{children}</main>
      </div>
    </div>
  );
} 