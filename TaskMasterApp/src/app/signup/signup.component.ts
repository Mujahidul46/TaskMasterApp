import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form) {
      console.error('Form is undefined');
      return;
    }

    if (form.invalid) {
      console.log('Form is invalid');
      return;
    }

    const { username, email, password } = form.value;

    this.authService.signup(username, email, password).subscribe({
      next: (response) => {
        console.log('User signed up successfully:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup failed', error);
        alert('Signup failed: ' + error.message);
      }
    });
  }
}
