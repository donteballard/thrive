import { LucideIcon } from 'lucide-react';

export type StakingTierName = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
export type RewardType = 'achievement' | 'streak' | 'staking' | 'referral';
export type RewardStatus = 'completed' | 'pending';

export interface StakingTier {
  id: string;
  name: StakingTierName;
  requiredTokens: number;
  benefits: string[];
  color: string;
  apy: number;
  lockPeriod: number;
  createdAt: string;
  updatedAt: string;
}

export interface RewardHistory {
  id: string;
  type: RewardType;
  title: string;
  amount: number;
  date: string;
  status: RewardStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStakingData {
  id: string;
  userId: string;
  tokenBalance: number;
  stakedAmount: number;
  currentTier: StakingTierName;
  lifetimeEarnings: number;
  stakingApy: number;
  nextReward: number;
  nextRewardDate: string;
  lockEndDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StakingStats {
  totalStaked: number;
  averageApy: number;
  totalStakers: number;
  tvl: number;
  updatedAt: string;
}

export interface StakeFormData {
  amount: number;
  tierId: string;
  lockPeriod: number;
}

export interface UnstakeFormData {
  amount: number;
}

export interface RewardsState {
  stakingTiers: StakingTier[];
  userStaking: UserStakingData | null;
  stakingStats: StakingStats | null;
  rewardsHistory: RewardHistory[];
  isLoading: boolean;
  error: string | null;
}

export interface RewardsFilters {
  type?: RewardType;
  status?: RewardStatus;
  startDate?: string;
  endDate?: string;
  page: number;
  limit: number;
} 