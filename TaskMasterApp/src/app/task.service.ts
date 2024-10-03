import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5220/task';
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  // Load all tasks initially
  public loadTasks(): void {
    this.getTasks().subscribe(tasks => {
        console.log("Loaded tasks from API:", tasks);
        this.tasksSubject.next(tasks);
    });
}

  // Create a new task
  createTask(task: Task): Observable<any> {
    const body = new FormData();
    body.append('title', task.title);
    body.append('description', task.description || '');
    body.append('dueDate', task.dueDate?.toString() || '');
    body.append('priority', task.priority || '');
    body.append('isComplete', task.isComplete ? 'true' : 'false');

    return this.http.post(`${this.apiUrl}/create_task`, body).pipe(
      // After creating the task, update the local task list
      tap(() => {
        this.loadTasks(); // Reload tasks after creation
      })
    );
  }

  // Get all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/get_task`);
  }

  // Get a task by ID
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/get_task/${id}`);
  }

  // Update a task
  updateTask(task: Task): Observable<Task> {
    // Create the body only with fields that are present in the task
    const body: any = { id: task.id };

    // Only append fields that have values
    if (task.title) body.title = task.title;
    if (task.description !== undefined) body.description = task.description;
    if (task.dueDate) body.dueDate = task.dueDate;
    if (task.priority) body.priority = task.priority;
    body.isComplete = task.isComplete;

    return this.http.put<Task>(`${this.apiUrl}/update_task/${task.id}`, body).pipe(
      tap(() => {
        this.loadTasks();
      })
    );
  }

  // Delete a task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete_task/${id}`).pipe(
      tap(() => {
        this.loadTasks();
      })
    );
  }
}
