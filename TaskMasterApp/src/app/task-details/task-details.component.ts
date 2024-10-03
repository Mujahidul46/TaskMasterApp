import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  tasks: Task[] = []; // Array to hold the tasks
  currentView: 'todos' = 'todos'; // Only keeping 'todos' view
  editingTask: Task | null = null; // For editing a task

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe({
      next: (tasks) => {
        console.log("Current tasks:", tasks); // Log current tasks
        this.tasks = tasks.sort((a, b) => a.id - b.id);
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }

  setCurrentView(view: 'todos') {
    this.currentView = view; // Set the current view (only 'todos' now)
  }

  markTaskComplete(task: Task) {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        console.log('Task deleted successfully', task);
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }

  editTask(task: Task) {
    this.editingTask = {
      ...task,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
    };
    console.log('Editing Task:', this.editingTask);
  }

  saveTask(task: Task) {
    this.taskService.updateTask(task).subscribe({
      next: () => {
        console.log('Task updated successfully');
        this.editingTask = null;
        this.taskService.loadTasks(); // Reload tasks after saving
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }

  closeModal() {
    this.editingTask = null;
  }

  confirmDelete(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          console.log('Task deleted successfully');
          this.taskService.loadTasks(); // Reload tasks after deletion
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        }
      });
    }
  }

  getRemainingTime(dueDate?: string): string {
    if (!dueDate) return 'No due date';

    const due = new Date(dueDate);
    const now = new Date();
    const difference = due.getTime() - now.getTime();

    const daysLeft = Math.ceil(difference / (1000 * 3600 * 24));

    if (daysLeft > 0) {
      return `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`;
    } else if (daysLeft === 0) {
      return 'Due today';
    } else {
      return `Overdue by ${Math.abs(daysLeft)} day${Math.abs(daysLeft) === 1 ? '' : 's'}`;
    }
  }
}
