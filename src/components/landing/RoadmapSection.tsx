'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const roadmapItems = [
  {
    title: "Phase 1: Roots",
    description: "Launch of core AI coaching features and token infrastructure",
    items: [
      "AI-powered personal development coach",
      "Solana wallet integration",
      "Initial token distribution",
      "Community building"
    ]
  },
  {
    title: "Phase 2: Growth",
    description: "Expansion of features and reward mechanisms",
    items: [
      "Advanced goal tracking",
      "Achievement NFTs",
      "Reward multipliers",
      "Mobile app beta"
    ]
  },
  {
    title: "Phase 3: Bloom",
    description: "Community features and marketplace",
    items: [
      "Peer coaching system",
      "Skill marketplace",
      "Community challenges",
      "DAO governance"
    ]
  }
];

export function RoadmapSection() {
  return (
    <div className="max-w-7xl mx-auto relative">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          textShadow: [
            "0 0 20px rgba(34,197,94,0.5)",
            "0 0 30px rgba(34,197,94,0.8)",
            "0 0 20px rgba(34,197,94,0.5)"
          ]
        }}
        transition={{
          opacity: { duration: 0.5 },
          y: { duration: 0.5 },
          textShadow: { duration: 3, repeat: Infinity }
        }}
        viewport={{ once: true }}
        className="text-8xl font-bold text-center mb-24 text-white drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
      >
        Growth Journey
      </motion.h2>

      <div className="relative">
        {/* Central Branch Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-primary/20 transform -translate-x-1/2" />

        {roadmapItems.map((phase, index) => (
          <motion.div
            key={phase.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative mb-32 last:mb-0 ${
              index % 2 === 0 ? 'pr-[50%] text-right' : 'pl-[50%] text-left'
            }`}
          >
            {/* Branch Line */}
            <div 
              className={`absolute top-1/2 ${
                index % 2 === 0 ? 'right-0 left-auto' : 'left-0 right-auto'
              } w-[calc(50%-16px)] h-0.5`}
              style={{ 
                transform: 'translateY(-50%)',
                background: index % 2 === 0 
                  ? 'linear-gradient(to left, rgba(34,197,94,0.5), rgba(34,197,94,0.2))'
                  : 'linear-gradient(to right, rgba(34,197,94,0.5), rgba(34,197,94,0.2))'
              }}
            />

            {/* Phase Content */}
            <div className={`relative ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
              {/* Node Point */}
              <div className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black border-2 border-primary rounded-full flex items-center justify-center ${
                index % 2 === 0 ? 'right-0 translate-x-4' : 'left-0 -translate-x-4'
              }`}>
                <Sparkles className="w-4 h-4 text-primary" />
              </div>

              {/* Content Card */}
              <div className={`bg-primary/10 backdrop-blur-sm p-6 rounded-xl border border-primary/20 hover:bg-primary/20 transition-colors ${
                index % 2 === 0 ? 'mr-12' : 'ml-12'
              }`}>
                <h3 className="text-2xl font-bold text-white mb-3">{phase.title}</h3>
                <p className="text-gray-200 mb-4">{phase.description}</p>
                <ul className={`space-y-2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  {phase.items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="text-gray-300"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Decorative Elements */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-px h-10 bg-gradient-to-b from-transparent to-primary/50" />
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-px h-10 bg-gradient-to-t from-transparent to-primary/50" />
      </div>
    </div>
  );
} 