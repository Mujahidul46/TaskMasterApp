import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5220/api/user'; // port must match the port that is being listened to by TASKAPI
  private loggedIn = false;

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  // Login method sends the details to the backend
  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    console.log('Sending login request with payload:', payload);
    return this.http.post(`${this.apiUrl}/login`, payload).pipe(
      tap((response) => {
        if (response) {
          this.setLoggedIn(true);
        }
      })
    );
}

signup(username: string, email: string, password: string): Observable<any> {
  const payload = { username, email, password };
  return this.http.post(`${this.apiUrl}/signup`, payload);
}




  //login is successful
  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  logout() {
    this.loggedIn = false;
  }
}
