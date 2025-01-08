'use client';

import { motion } from 'framer-motion';
import { RoadmapTimeline } from '@/components/roadmap/RoadmapTimeline';

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 dark:text-white">
            Building the Future of{' '}
            <span className="text-primary dark:text-primary">Self-Improvement</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our development roadmap outlines our journey to create the most comprehensive platform for personal growth and achievement.
          </p>
        </motion.div>

        <RoadmapTimeline variant="landing" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Want to contribute or suggest features?
          </p>
          <a
            href="https://github.com/yourusername/thrive"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-[#02e02b] transition-colors"
          >
            Join Our Community
          </a>
        </motion.div>
      </div>
    </section>
  );
} 