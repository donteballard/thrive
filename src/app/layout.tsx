import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClientProviders } from '@/components/providers/ClientProviders'
import { Toaster } from 'sonner'
import { WalletHandler } from '@/components/wallet/WalletHandler'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Thraive - AI-Powered Life Optimization',
  description: 'Get paid to become your best self with AI-powered guidance and blockchain rewards.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.jpg', sizes: '192x192', type: 'image/jpeg' }
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
      </head>
      <body className={inter.className}>
        <ClientProviders>
          <WalletHandler />
          <Toaster />
          {children}
        </ClientProviders>
      </body>
    </html>
  )
} 