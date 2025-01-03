export type GoalStatus = 'Not Started' | 'In Progress' | 'Completed';
export type GoalCategory = 'Wellness' | 'Learning' | 'Finance' | 'Career' | 'Fitness' | 'Personal';
export type GoalVisibility = 'public' | 'friends' | 'private';

export interface Goal {
  id: number;
  title: string;
  description: string;
  category: GoalCategory;
  progress: number;
  status: GoalStatus;
  dueDate: string;
  milestones: string[];
  createdAt: string;
  updatedAt: string;
  visibility: GoalVisibility;
  allowComments: boolean;
  allowDuplication: boolean;
  userId: string;
}

export interface GoalFormData {
  title: string;
  description: string;
  category: GoalCategory;
  dueDate: string;
  milestones: string[];
  visibility?: GoalVisibility;
  allowComments?: boolean;
  allowDuplication?: boolean;
}

export interface GoalProgressUpdate {
  progress: number;
  completedMilestones: string[];
  status: GoalStatus;
}

export interface GoalShareData {
  visibility: GoalVisibility;
  message: string;
  allowComments: boolean;
  allowDuplication: boolean;
}

export interface GoalFilters {
  category?: GoalCategory | 'All';
  status?: GoalStatus | 'All';
  search?: string;
}

export interface GoalStats {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  overdue: number;
  categoryBreakdown: Record<GoalCategory, number>;
} 