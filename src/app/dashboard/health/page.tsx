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
        <h1 className="text-2xl font-bold dark:text-white">Health Tracking</h1>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b dark:border-gray-700">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === 'overview'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Overview
            {activeTab === 'overview' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('devices')}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === 'devices'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Connected Devices
            {activeTab === 'devices' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === 'history'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            History
            {activeTab === 'history' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
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
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Health Insights</h2>
              <div className="grid gap-4">
                {healthInsights.map((insight) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl ${
                      insight.type === 'positive'
                        ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-900/50'
                        : insight.type === 'warning'
                        ? 'bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-900/50'
                        : 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-900/50'
                    }`}
                  >
                    <h3 className="font-semibold mb-1 dark:text-white">{insight.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{insight.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'devices' && (
          <div className="grid gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-2 dark:text-white">Connected Devices</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No devices connected yet. Click below to add a device.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Connect Device
              </button>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="grid gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-2 dark:text-white">Activity History</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your activity history will appear here once you start tracking.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 