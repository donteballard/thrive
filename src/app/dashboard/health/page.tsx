'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { HealthMetrics } from '@/components/dashboard/HealthMetrics';

const healthInsights = [
  {
    id: 1,
    title: 'Sleep Quality',
    description: "Great job! Your sleep quality has improved by 15% this week.",
    type: 'positive'
  },
  {
    id: 2,
    title: 'Activity Goal',
    description: "You're close to reaching your daily step goal. Just 1,568 steps to go!",
    type: 'progress'
  },
  {
    id: 3,
    title: 'Stress Level',
    description: "Consider taking a short meditation break. Your stress levels are higher than usual.",
    type: 'warning'
  },
  {
    id: 4,
    title: 'Hydration',
    description: "Well done! You've met your daily water intake goal.",
    type: 'positive'
  }
];

export default function HealthPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'devices' | 'history'>('overview');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Health Tracking</h1>
        <button className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-400 hover:text-primary" />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-green-800">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === 'overview'
                ? 'text-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
            {activeTab === 'overview' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('devices')}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === 'devices'
                ? 'text-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Connected Devices
            {activeTab === 'devices' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === 'history'
                ? 'text-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            History
            {activeTab === 'history' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Health Metrics Component */}
            <HealthMetrics />

            {/* Health Insights */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Health Insights</h2>
              <div className="grid gap-4">
                {healthInsights.map((insight) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl bg-black border ${
                      insight.type === 'positive'
                        ? 'border-green-800 bg-primary/10'
                        : insight.type === 'warning'
                        ? 'border-yellow-800 bg-yellow-900/10'
                        : 'border-green-800 bg-primary/5'
                    }`}
                  >
                    <h3 className="font-semibold mb-1 text-white">{insight.title}</h3>
                    <p className="text-sm text-gray-400">{insight.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'devices' && (
          <div className="grid gap-4">
            <div className="p-4 bg-black border border-green-800 rounded-xl">
              <h3 className="font-semibold mb-2 text-white">Connected Devices</h3>
              <p className="text-sm text-gray-400">
                No devices connected yet. Click below to add a device.
              </p>
              <button className="mt-4 px-4 py-2 bg-primary hover:bg-primary/90 text-black rounded-lg transition-colors">
                Connect Device
              </button>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="grid gap-4">
            <div className="p-4 bg-black border border-green-800 rounded-xl">
              <h3 className="font-semibold mb-2 text-white">Activity History</h3>
              <p className="text-sm text-gray-400">
                Your activity history will appear here once you start tracking.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 