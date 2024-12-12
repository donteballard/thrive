'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Trophy, ArrowUp, Lock, Gift, History, Sparkles } from 'lucide-react';

// Mock data for rewards
const mockStakingTiers = [
  {
    name: 'Bronze',
    requiredTokens: 10000,
    benefits: ['5% bonus on rewards', 'Basic AI features', 'Community challenges'],
    color: 'from-amber-700 to-amber-500'
  },
  {
    name: 'Silver',
    requiredTokens: 50000,
    benefits: ['15% bonus on rewards', 'Advanced AI features', 'Premium challenges', 'Priority support'],
    color: 'from-gray-400 to-gray-300'
  },
  {
    name: 'Gold',
    requiredTokens: 200000,
    benefits: ['30% bonus on rewards', 'Exclusive AI features', 'Custom challenges', 'VIP support', 'Exclusive NFTs'],
    color: 'from-yellow-500 to-yellow-300'
  },
  {
    name: 'Platinum',
    requiredTokens: 500000,
    benefits: ['50% bonus on rewards', 'All platform features', 'Custom AI coaching', 'Dedicated support', 'Unique NFTs', 'Governance rights'],
    color: 'from-cyan-500 to-cyan-300'
  }
];

const mockRewardsHistory = [
  {
    id: 1,
    type: 'achievement',
    title: 'Early Bird Champion',
    amount: 100,
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: 2,
    type: 'streak',
    title: '7-Day Streak Bonus',
    amount: 250,
    date: '2024-01-14',
    status: 'completed'
  },
  {
    id: 3,
    type: 'staking',
    title: 'Staking Rewards',
    amount: 75,
    date: '2024-01-13',
    status: 'pending'
  },
  {
    id: 4,
    type: 'referral',
    title: 'Friend Referral Bonus',
    amount: 500,
    date: '2024-01-12',
    status: 'completed'
  }
];

// Mock user data
const mockUserData = {
  tokenBalance: 3750,
  stakedAmount: 10000,
  currentTier: 'Bronze',
  lifetimeEarnings: 12500
};

export default function RewardsPage() {
  const [selectedHistory, setSelectedHistory] = useState('all');
  const historyFilters = ['all', 'completed', 'pending'];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Token Overview */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Rewards & Staking</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Coins className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Token Balance</p>
                <p className="text-xl font-bold dark:text-white">{mockUserData.tokenBalance} THRIVE</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Staked Amount</p>
                <p className="text-xl font-bold dark:text-white">{mockUserData.stakedAmount} THRIVE</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Tier</p>
                <p className="text-xl font-bold dark:text-white">{mockUserData.currentTier}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <ArrowUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Lifetime Earnings</p>
                <p className="text-xl font-bold dark:text-white">{mockUserData.lifetimeEarnings} THRIVE</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Staking Tiers */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Staking Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockStakingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${tier.color} opacity-10 rounded-bl-full`} />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">{tier.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {tier.requiredTokens.toLocaleString()} THRIVE required
                </p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600">
                  Stake Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rewards History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Rewards History</h2>
          <div className="flex gap-2">
            {historyFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedHistory(filter)}
                className={`px-3 py-1 rounded-lg text-sm font-medium capitalize transition-colors ${
                  selectedHistory === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {mockRewardsHistory
            .filter(reward => selectedHistory === 'all' || reward.status === selectedHistory)
            .map((reward) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      reward.type === 'achievement' ? 'bg-purple-100 dark:bg-purple-900/30' :
                      reward.type === 'streak' ? 'bg-green-100 dark:bg-green-900/30' :
                      reward.type === 'staking' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      'bg-orange-100 dark:bg-orange-900/30'
                    }`}>
                      {reward.type === 'achievement' ? (
                        <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      ) : reward.type === 'streak' ? (
                        <History className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : reward.type === 'staking' ? (
                        <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Gift className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium dark:text-white">{reward.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{reward.date}</span>
                        <span className="text-sm text-gray-400 dark:text-gray-600">•</span>
                        <span className={`text-sm font-medium ${
                          reward.status === 'completed' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
                        }`}>
                          {reward.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600 dark:text-blue-400">+{reward.amount} THRIVE</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
} 