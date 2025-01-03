'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Trophy, ArrowUp, Lock, Gift, History, Sparkles, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useRewards } from '@/hooks/useRewards';
import { StakingModal } from '@/components/modals/StakingModal';
import { StakingTier } from '@/types/rewards';
import { Button } from '@/components/ui/button';

export default function RewardsPage() {
  const {
    stakingTiers,
    userStaking,
    stakingStats,
    rewardsHistory,
    isLoading,
    filters,
    updateFilters,
    stakeTokens,
    unstakeTokens,
    claimRewards
  } = useRewards();

  const [showStakingModal, setShowStakingModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<StakingTier | undefined>();

  const handleStakingClick = (tier: StakingTier) => {
    setSelectedTier(tier);
    setShowStakingModal(true);
  };

  if (isLoading && !userStaking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading rewards data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <StakingModal
        isOpen={showStakingModal}
        onClose={() => setShowStakingModal(false)}
        selectedTier={selectedTier}
        currentStakedAmount={userStaking?.stakedAmount || 0}
        tokenBalance={userStaking?.tokenBalance || 0}
        onStake={stakeTokens}
        onUnstake={unstakeTokens}
      />

      {/* Token Overview */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold dark:text-white">Rewards & Staking</h1>
          {userStaking?.nextReward && userStaking.nextReward > 0 && (
            <Button onClick={claimRewards} className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Claim {userStaking.nextReward} THRAIVE
            </Button>
          )}
        </div>
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
                <p className="text-xl font-bold dark:text-white">
                  {userStaking?.tokenBalance.toLocaleString()} THRAIVE
                </p>
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
                <p className="text-xl font-bold dark:text-white">
                  {userStaking?.stakedAmount.toLocaleString()} THRAIVE
                </p>
                <p className="text-sm text-green-600">APY: {userStaking?.stakingApy}%</p>
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
                <p className="text-xl font-bold dark:text-white">{userStaking?.currentTier}</p>
                {userStaking?.lockEndDate && (
                  <p className="text-sm text-gray-500">
                    Lock ends: {new Date(userStaking.lockEndDate).toLocaleDateString()}
                  </p>
                )}
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
                <p className="text-xl font-bold dark:text-white">
                  {userStaking?.lifetimeEarnings.toLocaleString()} THRAIVE
                </p>
                {userStaking?.nextReward && userStaking.nextReward > 0 && (
                  <p className="text-sm text-blue-600">
                    Next reward: {userStaking.nextReward} THRAIVE
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Platform Stats */}
      {stakingStats && (
        <div className="mb-8 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Platform Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Value Locked</p>
              <p className="text-xl font-bold dark:text-white">
                {stakingStats.tvl.toLocaleString()} THRAIVE
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Stakers</p>
              <p className="text-xl font-bold dark:text-white">
                {stakingStats.totalStakers.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Staked</p>
              <p className="text-xl font-bold dark:text-white">
                {stakingStats.totalStaked.toLocaleString()} THRAIVE
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average APY</p>
              <p className="text-xl font-bold dark:text-white">{stakingStats.averageApy}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Staking Tiers */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Staking Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stakingTiers.map((tier) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col h-full`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tier.color} opacity-10 rounded-bl-[100%]`} />
              <div className="p-4 flex flex-col flex-1">
                <div>
                  <h3 className="text-xl font-bold dark:text-white">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold text-primary">{tier.requiredTokens.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">THRAIVE</span>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {tier.apy}% APY
                    </span>
                    <span className="text-muted-foreground">
                      Lock: {tier.lockPeriod} days
                    </span>
                  </div>

                  <div className="h-px bg-gray-200 dark:bg-gray-700" />

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Benefits</p>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-1.5 text-xs">
                          <Sparkles className="w-3 h-3 mt-0.5 text-primary shrink-0" />
                          <span className="text-muted-foreground leading-tight">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <Button
                    onClick={() => handleStakingClick(tier)}
                    variant={userStaking?.currentTier === tier.name ? 'default' : 'secondary'}
                    className="w-full"
                    size="default"
                  >
                    {userStaking?.currentTier === tier.name ? (
                      <span className="flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" />
                        Current Tier
                      </span>
                    ) : (
                      'Stake Now'
                    )}
                  </Button>
                </div>
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
            {['all', 'completed', 'pending'].map((status) => (
              <Button
                key={status}
                variant={(!filters.status && status === 'all') || filters.status === status ? 'default' : 'secondary'}
                onClick={() => updateFilters({ status: status === 'all' ? undefined : (status as 'completed' | 'pending') })}
                className="capitalize"
                size="sm"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {rewardsHistory.map((reward) => (
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
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(reward.date).toLocaleDateString()}
                      </span>
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
                  <p className="font-semibold text-blue-600 dark:text-blue-400">+{reward.amount} THRAIVE</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {rewardsHistory.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => updateFilters({ page: Math.max(1, filters.page - 1) })}
              disabled={filters.page === 1}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {filters.page}
            </span>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => updateFilters({ page: filters.page + 1 })}
              disabled={rewardsHistory.length < filters.limit}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 