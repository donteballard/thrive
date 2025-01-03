import { useState, useCallback, useEffect } from 'react';
import { Goal, GoalFormData, GoalProgressUpdate, GoalShareData, GoalFilters, GoalStats } from '@/types/goals';
import { GoalService } from '@/services/goalService';

interface UseGoalsReturn {
  goals: Goal[];
  stats: GoalStats | null;
  isLoading: boolean;
  error: string | null;
  filters: GoalFilters;
  setFilters: (filters: GoalFilters | ((prev: GoalFilters) => GoalFilters)) => void;
  createGoal: (data: GoalFormData) => Promise<void>;
  updateGoal: (id: number, data: Partial<GoalFormData>) => Promise<void>;
  deleteGoal: (id: number) => Promise<void>;
  updateGoalProgress: (id: number, data: GoalProgressUpdate) => Promise<void>;
  shareGoal: (id: number, data: GoalShareData) => Promise<void>;
  duplicateGoal: (id: number) => Promise<void>;
  refreshGoals: () => Promise<void>;
}

export function useGoals(): UseGoalsReturn {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [stats, setStats] = useState<GoalStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<GoalFilters>({
    category: undefined,
    status: undefined,
    search: '',
  });

  const fetchGoals = useCallback(async () => {
    try {
      setIsLoading(true);
      const [fetchedGoals, fetchedStats] = await Promise.all([
        GoalService.getGoals(filters),
        GoalService.getGoalStats(),
      ]);
      setGoals(fetchedGoals);
      setStats(fetchedStats);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch goals');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const createGoal = async (data: GoalFormData) => {
    try {
      setIsLoading(true);
      const newGoal = await GoalService.createGoal(data);
      setGoals(prev => [...prev, newGoal]);
      await fetchGoals(); // Refresh stats
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create goal');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateGoal = async (id: number, data: Partial<GoalFormData>) => {
    try {
      setIsLoading(true);
      const updatedGoal = await GoalService.updateGoal(id, data);
      setGoals(prev => prev.map(goal => goal.id === id ? updatedGoal : goal));
      await fetchGoals(); // Refresh stats
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update goal');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGoal = async (id: number) => {
    try {
      setIsLoading(true);
      await GoalService.deleteGoal(id);
      setGoals(prev => prev.filter(goal => goal.id !== id));
      await fetchGoals(); // Refresh stats
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete goal');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateGoalProgress = async (id: number, data: GoalProgressUpdate) => {
    try {
      setIsLoading(true);
      const updatedGoal = await GoalService.updateGoalProgress(id, data);
      setGoals(prev => prev.map(goal => goal.id === id ? updatedGoal : goal));
      await fetchGoals(); // Refresh stats
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update goal progress');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const shareGoal = async (id: number, data: GoalShareData) => {
    try {
      setIsLoading(true);
      const updatedGoal = await GoalService.shareGoal(id, data);
      setGoals(prev => prev.map(goal => goal.id === id ? updatedGoal : goal));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share goal');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const duplicateGoal = async (id: number) => {
    try {
      setIsLoading(true);
      const newGoal = await GoalService.duplicateGoal(id);
      setGoals(prev => [...prev, newGoal]);
      await fetchGoals(); // Refresh stats
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to duplicate goal');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    goals,
    stats,
    isLoading,
    error,
    filters,
    setFilters,
    createGoal,
    updateGoal,
    deleteGoal,
    updateGoalProgress,
    shareGoal,
    duplicateGoal,
    refreshGoals: fetchGoals,
  };
} 