'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FallingLeaves } from '../animations/FallingLeaves';

export function TreeOfLife() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2;
      
      // Calculate positions
      const buttonPosition = 950; // Increased Y position significantly
      const treeHeight = 11 * 18;
      const startY = buttonPosition + treeHeight;
      
      drawTree(ctx, canvas.width / 2, startY, 90, 11);
    };

    // Draw tree recursively
    function drawTree(
      ctx: CanvasRenderingContext2D,
      startX: number,
      startY: number,
      angle: number,
      depth: number
    ) {
      if (depth === 0) return;

      const length = depth * 18;
      const endX = startX + length * Math.cos((angle * Math.PI) / 180);
      const endY = startY - length * Math.sin((angle * Math.PI) / 180); // Subtract to grow upward

      // Draw branch with more transparent color
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = `hsla(142, 98%, ${20 + (11 - depth) * 5}%, 0.4)`;
      ctx.lineWidth = depth * 1.5;
      ctx.stroke();

      // Draw left and right branches
      const branchAngle = 25 - (11 - depth);
      drawTree(ctx, endX, endY, angle - branchAngle, depth - 1);
      drawTree(ctx, endX, endY, angle + branchAngle, depth - 1);
    }

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Content Overlay */}
      <div className="relative z-20 pt-64 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-7xl font-bold mb-8 text-white drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
            whileInView={{
              textShadow: [
                "0 0 20px rgba(34,197,94,0.5)",
                "0 0 30px rgba(34,197,94,0.8)",
                "0 0 20px rgba(34,197,94,0.5)"
              ]
            }}
          >
            Grow Your Potential
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
            whileInView={{
              textShadow: [
                "0 0 20px rgba(34,197,94,0.5)",
                "0 0 30px rgba(34,197,94,0.8)",
                "0 0 20px rgba(34,197,94,0.5)"
              ]
            }}
          >
            Transform your life through AI-powered guidance and blockchain rewards. Watch your progress grow like branches on the tree of life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center gap-4 mb-32"
          >
            <button 
              onClick={() => {
                const roadmapSection = document.getElementById('roadmap');
                if (roadmapSection) {
                  roadmapSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="h-[44px] min-w-[140px] px-6 bg-primary hover:bg-primary/90 text-black rounded-md transition-colors font-semibold"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>

      {/* Tree Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          className="opacity-70"
        />
        {/* Particle Effects Layer */}
        <FallingLeaves section="features" />
      </div>
    </div>
  );
} 