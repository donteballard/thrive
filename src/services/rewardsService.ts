import { 
  StakingTier, 
  UserStakingData, 
  StakingStats, 
  RewardHistory,
  StakeFormData,
  UnstakeFormData,
  RewardsFilters
} from '@/types/rewards';

class RewardsService {
  private baseUrl = '/api/rewards';

  async getStakingTiers(): Promise<StakingTier[]> {
    const response = await fetch(`${this.baseUrl}/tiers`);
    if (!response.ok) throw new Error('Failed to fetch staking tiers');
    return response.json();
  }

  async getUserStaking(): Promise<UserStakingData> {
    const response = await fetch(`${this.baseUrl}/user-staking`);
    if (!response.ok) throw new Error('Failed to fetch user staking data');
    return response.json();
  }

  async getStakingStats(): Promise<StakingStats> {
    const response = await fetch(`${this.baseUrl}/stats`);
    if (!response.ok) throw new Error('Failed to fetch staking stats');
    return response.json();
  }

  async getRewardsHistory(filters: RewardsFilters): Promise<{ data: RewardHistory[]; total: number }> {
    const queryParams = new URLSearchParams({
      page: filters.page.toString(),
      limit: filters.limit.toString(),
      ...(filters.type && { type: filters.type }),
      ...(filters.status && { status: filters.status }),
      ...(filters.startDate && { startDate: filters.startDate }),
      ...(filters.endDate && { endDate: filters.endDate })
    });

    const response = await fetch(`${this.baseUrl}/history?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch rewards history');
    return response.json();
  }

  async stakeTokens(data: StakeFormData): Promise<void> {
    const response = await fetch(`${this.baseUrl}/stake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to stake tokens');
    }
  }

  async unstakeTokens(data: UnstakeFormData): Promise<void> {
    const response = await fetch(`${this.baseUrl}/unstake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to unstake tokens');
    }
  }

  async claimRewards(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/claim`, {
      method: 'POST'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to claim rewards');
    }
  }
}

export const rewardsService = new RewardsService(); 