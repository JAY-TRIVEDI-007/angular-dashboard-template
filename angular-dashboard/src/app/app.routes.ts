import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
    data: {title: 'Login to app'}
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent),
    data: {title: 'Signup to app'}
  },
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
    pathMatch: 'full',
    data: {title: 'Welcome to dashboard!'}
  },
  {path: '**', component: PageNotFoundComponent, pathMatch: 'full', data: {title: 'Page not found'}},
];
