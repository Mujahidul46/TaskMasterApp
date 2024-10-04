import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TaskComponent } from './task/task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'taskDetails', component: TaskDetailsComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];
