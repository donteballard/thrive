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
          <h1 className="text-2xl font-bold mb-2 text-white">Development Roadmap</h1>
          <p className="text-gray-400">
            Track our progress and help shape the future of Thraive
          </p>
        </div>
        <button
          onClick={() => setShowFeedbackForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium"
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
                  ? 'bg-primary text-black'
                  : 'bg-black border border-green-800 text-gray-400 hover:bg-primary/20'
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
        <h2 className="text-xl font-semibold mb-6 text-white">Community Suggestions</h2>
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
              className="p-4 bg-black rounded-xl shadow-sm border border-green-800"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-white">{suggestion.title}</h3>
                  <p className="text-sm text-gray-400">
                    {suggestion.description}
                  </p>
                </div>
                <button className="px-4 py-1 text-sm bg-black border border-green-800 rounded-full hover:bg-primary/20 transition-colors text-gray-400">
                  {suggestion.votes} votes
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  suggestion.status === 'planned'
                    ? 'bg-primary/20 text-primary'
                    : suggestion.status === 'under-review'
                    ? 'bg-yellow-500/20 text-yellow-500'
                    : 'bg-purple-500/20 text-purple-500'
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
            className="w-full max-w-md bg-black rounded-xl shadow-xl p-6 border border-green-800"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Suggest a Feature</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Feature Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-black border border-green-800 text-white focus:ring-primary focus:border-primary"
                  placeholder="Enter feature title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg bg-black border border-green-800 text-white focus:ring-primary focus:border-primary"
                  rows={4}
                  placeholder="Describe your feature suggestion"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Category
                </label>
                <select className="w-full px-4 py-2 rounded-lg bg-black border border-green-800 text-white focus:ring-primary focus:border-primary">
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
                  className="px-4 py-2 text-gray-400 hover:bg-primary/20 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium"
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