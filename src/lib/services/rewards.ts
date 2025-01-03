import { prisma } from '@/lib/prisma';
import { StakeFormData, UnstakeFormData } from '@/types/rewards';

export class RewardsService {
  static async getStakingTiers() {
    return prisma.stakingTier.findMany({
      orderBy: { requiredTokens: 'asc' }
    });
  }

  static async getUserStaking(userId: string) {
    return prisma.userStaking.findFirst({
      where: { userId },
      include: {
        stakingTier: true
      }
    });
  }

  static async getStakingStats() {
    return prisma.stakingStats.findFirst({
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getRewardsHistory(userId: string, page: number, limit: number, filters: any) {
    const where = {
      userId,
      ...(filters.type && { type: filters.type }),
      ...(filters.status && { status: filters.status }),
      ...(filters.startDate && filters.endDate && {
        date: {
          gte: new Date(filters.startDate),
          lte: new Date(filters.endDate)
        }
      })
    };

    const [data, total] = await Promise.all([
      prisma.rewardTransaction.findMany({
        where,
        orderBy: { date: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          userStaking: true
        }
      }),
      prisma.rewardTransaction.count({ where })
    ]);

    return { data, total };
  }

  static async stakeTokens(userId: string, data: StakeFormData) {
    const { amount, tierId, lockPeriod } = data;

    // Start a transaction
    return prisma.$transaction(async (tx) => {
      // Get user's current staking data
      const currentStaking = await tx.userStaking.findFirst({
        where: { userId }
      });

      // Get selected tier
      const tier = await tx.stakingTier.findUnique({
        where: { id: tierId }
      });

      if (!tier) {
        throw new Error('Invalid staking tier');
      }

      // Calculate lock end date
      const lockEndDate = new Date();
      lockEndDate.setDate(lockEndDate.getDate() + lockPeriod);

      // Create or update user staking
      const userStaking = await tx.userStaking.upsert({
        where: {
          id: currentStaking?.id || '',
        },
        create: {
          userId,
          tokenBalance: amount,
          stakedAmount: amount,
          tierId,
          stakingApy: tier.apy,
          nextReward: Math.floor(amount * (tier.apy / 100) / 12), // Monthly reward
          nextRewardDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          lockEndDate
        },
        update: {
          tokenBalance: (currentStaking?.tokenBalance || 0) - amount,
          stakedAmount: (currentStaking?.stakedAmount || 0) + amount,
          tierId,
          stakingApy: tier.apy,
          nextReward: Math.floor(amount * (tier.apy / 100) / 12),
          nextRewardDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          lockEndDate
        }
      });

      // Create staking transaction record
      await tx.rewardTransaction.create({
        data: {
          userId,
          stakingId: userStaking.id,
          type: 'staking',
          title: `Staked ${amount} THRAIVE tokens`,
          amount,
          status: 'completed',
          date: new Date()
        }
      });

      // Update platform stats
      await tx.stakingStats.upsert({
        where: { id: 'platform-stats' },
        create: {
          id: 'platform-stats',
          totalStaked: amount,
          averageApy: tier.apy,
          totalStakers: 1,
          tvl: amount
        },
        update: {
          totalStaked: { increment: amount },
          totalStakers: { increment: 1 },
          tvl: { increment: amount }
        }
      });

      return userStaking;
    });
  }

  static async unstakeTokens(userId: string, data: UnstakeFormData) {
    const { amount } = data;

    return prisma.$transaction(async (tx) => {
      const userStaking = await tx.userStaking.findFirst({
        where: { userId },
        include: { stakingTier: true }
      });

      if (!userStaking) {
        throw new Error('No staking found for user');
      }

      if (userStaking.lockEndDate && userStaking.lockEndDate > new Date()) {
        throw new Error('Tokens are still locked');
      }

      if (amount > userStaking.stakedAmount) {
        throw new Error('Insufficient staked balance');
      }

      // Update user staking
      const updatedStaking = await tx.userStaking.update({
        where: { id: userStaking.id },
        data: {
          tokenBalance: userStaking.tokenBalance + amount,
          stakedAmount: userStaking.stakedAmount - amount,
          nextReward: Math.floor((userStaking.stakedAmount - amount) * (userStaking.stakingApy / 100) / 12)
        }
      });

      // Create unstaking transaction record
      await tx.rewardTransaction.create({
        data: {
          userId,
          stakingId: userStaking.id,
          type: 'staking',
          title: `Unstaked ${amount} THRAIVE tokens`,
          amount: -amount,
          status: 'completed',
          date: new Date()
        }
      });

      // Update platform stats
      await tx.stakingStats.update({
        where: { id: 'platform-stats' },
        data: {
          totalStaked: { decrement: amount },
          tvl: { decrement: amount }
        }
      });

      return updatedStaking;
    });
  }

  static async claimRewards(userId: string) {
    return prisma.$transaction(async (tx) => {
      const userStaking = await tx.userStaking.findFirst({
        where: { userId }
      });

      if (!userStaking || !userStaking.nextReward || userStaking.nextReward <= 0) {
        throw new Error('No rewards available to claim');
      }

      if (userStaking.nextRewardDate > new Date()) {
        throw new Error('Rewards are not ready to claim yet');
      }

      const rewardAmount = userStaking.nextReward;

      // Update user staking
      const updatedStaking = await tx.userStaking.update({
        where: { id: userStaking.id },
        data: {
          tokenBalance: userStaking.tokenBalance + rewardAmount,
          nextReward: Math.floor(userStaking.stakedAmount * (userStaking.stakingApy / 100) / 12),
          nextRewardDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Next reward in 30 days
        }
      });

      // Create reward transaction record
      await tx.rewardTransaction.create({
        data: {
          userId,
          stakingId: userStaking.id,
          type: 'staking',
          title: `Claimed ${rewardAmount} THRAIVE rewards`,
          amount: rewardAmount,
          status: 'completed',
          date: new Date()
        }
      });

      return updatedStaking;
    });
  }
} 