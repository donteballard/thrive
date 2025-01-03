import { useState, useEffect } from 'react';
import { rewardsService } from '@/services/rewardsService';
import { 
  RewardsState, 
  RewardsFilters, 
  StakeFormData, 
  UnstakeFormData,
  RewardHistory,
  RewardType,
  RewardStatus,
  StakingTier,
  UserStakingData,
  StakingTierName
} from '@/types/rewards';
import { toast } from 'sonner';

// Mock data for testing
const mockStakingTiers: StakingTier[] = [
  {
    id: '1',
    name: 'Bronze',
    requiredTokens: 1000,
    benefits: [
      'Basic rewards multiplier (1x)',
      'Access to basic challenges',
      'Monthly reward drops',
      'Basic AI Coach features',
      'Common NFT rewards'
    ],
    color: 'from-amber-500 to-amber-700',
    apy: 5,
    lockPeriod: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Silver',
    requiredTokens: 5000,
    benefits: [
      'Enhanced rewards multiplier (2x)',
      'Priority access to new features',
      'Weekly reward drops',
      'Exclusive challenges',
      'Advanced AI Coach features',
      'Rare NFT rewards',
      'NFT staking benefits',
      'AI-powered workout recommendations'
    ],
    color: 'from-gray-400 to-gray-600',
    apy: 8,
    lockPeriod: 60,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Gold',
    requiredTokens: 20000,
    benefits: [
      'Premium rewards multiplier (3x)',
      'Early access to features',
      'Daily reward drops',
      'Custom achievement badges',
      'VIP support',
      'Premium AI Coach with personalized plans',
      'Epic NFT rewards',
      'NFT breeding capabilities',
      'AI-powered performance analytics',
      'Exclusive AI training sessions'
    ],
    color: 'from-yellow-400 to-yellow-600',
    apy: 12,
    lockPeriod: 90,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Platinum',
    requiredTokens: 50000,
    benefits: [
      'Elite rewards multiplier (5x)',
      'Exclusive platform features',
      'Instant reward claims',
      'Custom profile themes',
      'Priority support',
      'Governance voting rights',
      'Legendary NFT rewards',
      'NFT marketplace fee reduction',
      'Advanced NFT breeding and fusion',
      'Full AI Coach feature suite',
      'Personal AI fitness consultant',
      'Custom AI-generated workout plans',
      'Real-time AI form correction'
    ],
    color: 'from-blue-400 to-blue-600',
    apy: 15,
    lockPeriod: 180,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
] as const;

const mockUserStaking: UserStakingData = {
  id: '1',
  userId: '1',
  tokenBalance: 25000,
  stakedAmount: 20000,
  currentTier: 'Gold',
  lifetimeEarnings: 5000,
  stakingApy: 12,
  nextReward: 200,
  nextRewardDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  lockEndDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const mockStakingStats = {
  totalStaked: 1500000,
  averageApy: 10,
  totalStakers: 1250,
  tvl: 2000000,
  updatedAt: new Date().toISOString()
};

const generateMockRewardsHistory = (page: number, limit: number, filters: RewardsFilters) => {
  const history: RewardHistory[] = [];
  const startIndex = (page - 1) * limit;
  const types: RewardType[] = ['achievement', 'streak', 'staking', 'referral'];
  const statuses: RewardStatus[] = ['completed', 'pending'];

  for (let i = 0; i < limit; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const date = new Date();
    date.setDate(date.getDate() - startIndex - i);

    if (filters.type && filters.type !== type) continue;
    if (filters.status && filters.status !== status) continue;

    history.push({
      id: `${startIndex + i + 1}`,
      type,
      title: type === 'achievement' ? 'Achievement Unlocked'
        : type === 'streak' ? '7-Day Streak Bonus'
        : type === 'staking' ? 'Staking Reward'
        : 'Referral Bonus',
      amount: Math.floor(Math.random() * 500) + 50,
      date: date.toISOString(),
      status,
      userId: '1',
      createdAt: date.toISOString(),
      updatedAt: date.toISOString()
    });
  }

  return history;
};

export function useRewards() {
  const [state, setState] = useState<RewardsState>({
    stakingTiers: mockStakingTiers,
    userStaking: mockUserStaking,
    stakingStats: mockStakingStats,
    rewardsHistory: generateMockRewardsHistory(1, 5, { page: 1, limit: 5 }),
    isLoading: false,
    error: null
  });

  const [filters, setFilters] = useState<RewardsFilters>({
    page: 1,
    limit: 5,
    status: undefined
  });

  // Replace API calls with mock data
  const fetchStakingTiers = async () => {
    setState(prev => ({ ...prev, stakingTiers: mockStakingTiers }));
  };

  const fetchUserStaking = async () => {
    setState(prev => ({ ...prev, userStaking: mockUserStaking }));
  };

  const fetchStakingStats = async () => {
    setState(prev => ({ ...prev, stakingStats: mockStakingStats }));
  };

  const fetchRewardsHistory = async () => {
    const updatedFilters = {
      ...filters,
      status: filters.status === undefined ? undefined : filters.status
    };
    setState(prev => ({
      ...prev,
      rewardsHistory: generateMockRewardsHistory(filters.page, filters.limit, updatedFilters)
    }));
  };

  const stakeTokens = async (data: StakeFormData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await rewardsService.stakeTokens(data);
      await fetchUserStaking();
      await fetchStakingStats();
      toast.success('Tokens staked successfully');
    } catch (error) {
      console.error('Error staking tokens:', error);
      toast.error('Failed to stake tokens');
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const unstakeTokens = async (data: UnstakeFormData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await rewardsService.unstakeTokens(data);
      await fetchUserStaking();
      await fetchStakingStats();
      toast.success('Tokens unstaked successfully');
    } catch (error) {
      console.error('Error unstaking tokens:', error);
      toast.error('Failed to unstake tokens');
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const claimRewards = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await rewardsService.claimRewards();
      await fetchUserStaking();
      toast.success('Rewards claimed successfully');
    } catch (error) {
      console.error('Error claiming rewards:', error);
      toast.error('Failed to claim rewards');
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const updateFilters = (newFilters: Partial<RewardsFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 'page' in newFilters ? newFilters.page || 1 : 1
    }));
  };

  useEffect(() => {
    fetchStakingTiers();
    fetchUserStaking();
    fetchStakingStats();
  }, []);

  useEffect(() => {
    fetchRewardsHistory();
  }, [filters]);

  return {
    ...state,
    filters,
    updateFilters,
    stakeTokens,
    unstakeTokens,
    claimRewards,
    refreshUserStaking: fetchUserStaking,
    refreshStakingStats: fetchStakingStats,
    refreshRewardsHistory: fetchRewardsHistory
  };
} 