'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  imageSize?: number;
}

export function Logo({ className = '', imageSize = 32 }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo.jpg"
        alt="Thraive Logo"
        width={imageSize}
        height={imageSize}
        className="rounded-md"
        quality={100}
      />
      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        Thraive
      </span>
    </Link>
  );
} 