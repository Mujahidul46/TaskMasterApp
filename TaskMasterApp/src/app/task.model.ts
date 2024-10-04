export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  isComplete: boolean;
  completedDate?: Date | null;
}
