'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, MessageSquarePlus } from 'lucide-react';
import { RoadmapTimeline } from '@/components/roadmap/RoadmapTimeline';

export default function RoadmapPage() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'core' | 'community' | 'ai' | 'blockchain'>('all');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2 dark:text-white">Development Roadmap</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track our progress and help shape the future of Thraive
          </p>
        </div>
        <button
          onClick={() => setShowFeedbackForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <MessageSquarePlus className="w-5 h-5" />
          Suggest Feature
        </button>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {[
            { value: 'all', label: 'All Features' },
            { value: 'core', label: 'Core Platform' },
            { value: 'community', label: 'Community' },
            { value: 'ai', label: 'AI Features' },
            { value: 'blockchain', label: 'Blockchain' }
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value as typeof filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === item.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Roadmap Timeline */}
      <RoadmapTimeline variant="dashboard" />

      {/* Feature Voting Section */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6 dark:text-white">Community Suggestions</h2>
        <div className="grid gap-4">
          {[
            {
              id: 1,
              title: 'Group Challenges',
              description: 'Allow users to create and participate in group challenges',
              votes: 156,
              status: 'under-review'
            },
            {
              id: 2,
              title: 'Mobile App',
              description: 'Native mobile application for iOS and Android',
              votes: 243,
              status: 'planned'
            },
            {
              id: 3,
              title: 'Achievement NFTs',
              description: 'Mint achievements as unique NFTs',
              votes: 89,
              status: 'considering'
            }
          ].map((suggestion) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium dark:text-white">{suggestion.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {suggestion.description}
                  </p>
                </div>
                <button className="px-4 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  {suggestion.votes} votes
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  suggestion.status === 'planned'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : suggestion.status === 'under-review'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                }`}>
                  {suggestion.status.replace('-', ' ')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Request Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Suggest a Feature</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Feature Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter feature title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={4}
                  placeholder="Describe your feature suggestion"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="core">Core Platform</option>
                  <option value="community">Community</option>
                  <option value="ai">AI Features</option>
                  <option value="blockchain">Blockchain</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowFeedbackForm(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Suggestion
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
} 