export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate?: Date;
  order: number;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Task['priority'];
  dueDate?: Date;
}

export type TaskFilter = 'all' | 'active' | 'completed';
export type TaskSort = 'createdAt' | 'priority' | 'dueDate';

export interface Category {
  id: number;
  name: string;
  color: string;
  userId: number;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: Task['priority'];
  categoryId?: number;
} 