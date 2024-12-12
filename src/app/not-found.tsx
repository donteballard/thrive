import { Logo } from '@/components/Logo';
import NotFoundClient from './not-found-client';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-center flex flex-col items-center">
        <div className="mb-8">
          <Logo imageSize={32} />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold mb-2 dark:text-white">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <NotFoundClient />
      </div>
    </div>
  );
} 