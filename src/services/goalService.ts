import { Goal, GoalFormData, GoalProgressUpdate, GoalShareData, GoalFilters, GoalStats } from '@/types/goals';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export class GoalService {
  private static async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}/api/goals${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }

    return response.json();
  }

  static async getGoals(filters?: GoalFilters): Promise<Goal[]> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'All') {
          queryParams.append(key, value);
        }
      });
    }

    return this.fetchWithAuth(`?${queryParams.toString()}`);
  }

  static async getGoalStats(): Promise<GoalStats> {
    return this.fetchWithAuth('/stats');
  }

  static async createGoal(data: GoalFormData): Promise<Goal> {
    return this.fetchWithAuth('', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateGoal(id: number, data: Partial<GoalFormData>): Promise<Goal> {
    return this.fetchWithAuth(`/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  static async deleteGoal(id: number): Promise<void> {
    await this.fetchWithAuth(`/${id}`, {
      method: 'DELETE',
    });
  }

  static async updateGoalProgress(id: number, data: GoalProgressUpdate): Promise<Goal> {
    return this.fetchWithAuth(`/${id}/progress`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  static async shareGoal(id: number, data: GoalShareData): Promise<Goal> {
    return this.fetchWithAuth(`/${id}/share`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async duplicateGoal(id: number): Promise<Goal> {
    return this.fetchWithAuth(`/${id}/duplicate`, {
      method: 'POST',
    });
  }

  static async getGoalById(id: number): Promise<Goal> {
    return this.fetchWithAuth(`/${id}`);
  }

  static async getGoalMilestones(id: number): Promise<string[]> {
    return this.fetchWithAuth(`/${id}/milestones`);
  }

  static async updateGoalMilestones(id: number, milestones: string[]): Promise<Goal> {
    return this.fetchWithAuth(`/${id}/milestones`, {
      method: 'PUT',
      body: JSON.stringify({ milestones }),
    });
  }
} 