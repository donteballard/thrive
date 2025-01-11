'use client';

import { Logo } from '@/components/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center">
        <div className="mb-8">
          <Logo />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 text-primary">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Page not found
        </p>
        <a 
          href="/"
          className="px-6 py-2 bg-primary hover:bg-primary/90 text-black rounded-md transition-colors font-semibold"
        >
          Go Home
        </a>
      </div>
    </div>
  );
} 