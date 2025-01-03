import { prisma } from '@/lib/prisma';

export interface ActivityData {
  type: 'task' | 'goal_progress' | 'achievement';
  title: string;
  description: string;
  status?: 'completed' | 'in_progress' | 'pending';
  progress?: number;
  points: number;
  category: string;
  duration?: number;
}

export const activityService = {
  async createActivity(userId: string, data: ActivityData) {
    return prisma.activity.create({
      data: {
        userId,
        ...data
      }
    });
  },

  async getTodayActivities(userId: string) {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    
    return prisma.activity.findMany({
      where: {
        userId,
        createdAt: {
          gte: today
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  },

  async getDailyStats(userId: string) {
    const today = new Date(new Date().setHours(0, 0, 0, 0));

    const [
      tasksCompleted,
      pointsData,
      userData,
      activeMinutesData
    ] = await Promise.all([
      // Count completed tasks
      prisma.activity.count({
        where: {
          userId,
          type: 'task',
          status: 'completed',
          createdAt: {
            gte: today
          }
        }
      }),

      // Sum points earned
      prisma.activity.aggregate({
        where: {
          userId,
          createdAt: {
            gte: today
          }
        },
        _sum: {
          points: true
        }
      }),

      // Get user stats for streak
      prisma.userStats.findUnique({
        where: {
          userId
        },
        select: {
          currentStreak: true
        }
      }),

      // Sum active minutes
      prisma.activity.aggregate({
        where: {
          userId,
          createdAt: {
            gte: today
          }
        },
        _sum: {
          duration: true
        }
      })
    ]);

    return {
      tasksCompleted,
      pointsEarned: pointsData._sum.points || 0,
      currentStreak: userData?.currentStreak || 0,
      activeMinutes: activeMinutesData._sum.duration || 0
    };
  },

  async updateActivity(id: number, data: Partial<ActivityData>) {
    return prisma.activity.update({
      where: { id },
      data
    });
  },

  async deleteActivity(id: number) {
    return prisma.activity.delete({
      where: { id }
    });
  }
}; 