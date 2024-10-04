import { Component, OnInit } from '@angular/core';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskDetailsComponent, FormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task: Task = { id: 0, title: '', description: undefined, dueDate: '', priority: 'medium', isComplete: false };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe(tasks => {
      console.log('Updated tasks:', tasks);
    });
  }

  onSubmit() {
    if (!this.task.title) {
      this.showError('Title is required.');
      return;
    } else if (!this.task.priority) {
      this.showError('Priority is required.');
      return;
    }

    this.errorMessage = null;

    console.log('Submitting Task:', this.task);

    this.taskService.createTask(this.task).subscribe({
      next: response => {
        console.log('Task created:', response);
        this.resetTask();
        this.showSuccess('Task added successfully!');
      },
      error: error => {
        console.error('Error creating task:', error);
      }
    });
  }

  private showSuccess(message: string) {
    this.successMessage = message;

    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }

  private showError(message: string) {
    this.errorMessage = message;

    const alertElement = document.querySelector('.alert') as HTMLElement;
    if (alertElement) {
      alertElement.classList.remove('fade-in');
      alertElement.classList.add('show');
      void alertElement.offsetWidth;
      alertElement.classList.add('fade-in');
    }
  }

  private resetTask() {
    this.task = { id: 0, title: '', description: undefined, dueDate: '', priority: 'medium', isComplete: false };
  }
}
