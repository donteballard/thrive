'use client';

import { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {}

export function Logo({ className, ...props }: LogoProps) {
  const letters = "THRAIVE".split("");
  
  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      <div className="flex">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
            style={{
              backgroundImage: "linear-gradient(to right, rgb(34 197 94), rgb(34 197 94 / 0.8))",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
              textShadow: [
                "0 0 20px rgba(34,197,94,0.5)",
                "0 0 30px rgba(34,197,94,0.8)",
                "0 0 20px rgba(34,197,94,0.5)"
              ]
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 0.15,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
} 