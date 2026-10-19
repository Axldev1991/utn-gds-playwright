export type TaskStatus = 'backlog' | 'in_progress' | 'completed';
export type TaskPriority = 'baja' | 'media' | 'alta';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  createdAt: string;
}

export interface FilterCriteria {
  searchQuery: string;
  statusFilter: TaskStatus | 'all';
}
