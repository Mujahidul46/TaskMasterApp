import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5220/api/user'; // Adjust to your backend URL
  private loggedIn = false;

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  // Login method that sends the credentials to the backend
  login(username: string, password: string): Observable<any> {
    const payload = { username, password }; // This aligns with your backend's LoginRequest
    console.log('Sending login request with payload:', payload); // Debug log
    return this.http.post(`${this.apiUrl}/login`, payload).pipe(
      tap((response) => {
        if (response) {
          this.setLoggedIn(true);
        }
      })
    );
}

// auth.service.ts
signup(username: string, email: string, password: string): Observable<any> {
  const payload = { username, email, password }; // Align with your backend's User model
  return this.http.post(`${this.apiUrl}/signup`, payload);
}




  // Call this method when login is successful
  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  logout() {
    this.loggedIn = false; // Clear session or token as needed
  }
}
