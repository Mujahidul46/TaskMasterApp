import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'; // Adjust path if needed
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-login',
  standalone: true, // Set this to true if it's a standalone component
  imports: [FormsModule], // Include FormsModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // Debugging: Log the values before sending them
    console.log('Logging in with:', { username: this.username, password: this.password });

    // Send login credentials to backend
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response); // Log successful response
        this.router.navigate(['/tasks']); // Redirect after successful login
      },
      error: (error) => {
        // Handle error (e.g., show a message to the user)
        console.error('Login failed', error);
        const errorMessage = error.error.Errors ? error.error.Errors.join(', ') : 'An error occurred'; // Show specific errors
        alert('Login failed: ' + errorMessage); // Optional: show error message
      }
    });
  }
}
