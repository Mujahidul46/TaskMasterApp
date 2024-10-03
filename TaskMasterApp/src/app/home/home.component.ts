import { Component } from '@angular/core';
import { RouterOutlet, RouterLink  } from '@angular/router'; // Import RouterOutlet

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // Include RouterOutlet here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected styleUrl to styleUrls
})
export class HomeComponent {}
