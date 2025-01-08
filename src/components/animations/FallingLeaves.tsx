'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Leaf {
  id: number;
  x: number;
  delay: number;
  duration: number;
  rotation: number;
  scale: number;
}

interface Props {
  section: 'features' | 'roadmap';
}

export function FallingLeaves({ section }: Props) {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    // Create initial leaves
    const initialLeaves = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: section === 'features' ? 4 + Math.random() * 2 : 8 + Math.random() * 4,
      rotation: Math.random() * 360,
      scale: section === 'features' ? 0.5 : 0.7 + Math.random() * 0.3,
    }));
    setLeaves(initialLeaves);

    // Add new leaves periodically
    const interval = setInterval(() => {
      const newLeaf = {
        id: Date.now(),
        x: Math.random() * 100,
        delay: 0,
        duration: section === 'features' ? 4 + Math.random() * 2 : 8 + Math.random() * 4,
        rotation: Math.random() * 360,
        scale: section === 'features' ? 0.5 : 0.7 + Math.random() * 0.3,
      };
      setLeaves(prevLeaves => [...prevLeaves.slice(-19), newLeaf]);
    }, 500);

    return () => clearInterval(interval);
  }, [section]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            initial={{
              opacity: 0,
              left: `${leaf.x}%`,
              top: '-5%',
              rotate: leaf.rotation,
              scale: leaf.scale,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              left: [`${leaf.x}%`, `${leaf.x + (Math.random() * 10 - 5)}%`],
              top: ['-5%', '105%'],
              rotate: [leaf.rotation, leaf.rotation + (Math.random() > 0.5 ? 360 : -360)],
              scale: leaf.scale,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: leaf.duration,
              delay: leaf.delay,
              ease: 'linear',
              times: [0, 0.1, 0.9, 1],
            }}
            style={{ position: 'absolute' }}
          >
            <Image
              src="/leaf.png"
              alt="Falling leaf"
              width={32}
              height={32}
              className={`w-8 h-8 opacity-40 ${section === 'roadmap' ? 'w-12 h-12' : 'w-8 h-8'}`}
              priority
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 