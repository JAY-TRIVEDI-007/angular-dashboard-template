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
    path: 'profile',
    loadComponent: () => import('./user/profile/profile.component').then(c => c.ProfileComponent),
    data: {title: 'Welcome User!', isAuthorizedView: true}
  },
  {
    path: 'users',
    loadComponent: () => import('./user/user-manager/user-manager.component').then(c => c.UserManagerComponent),
    data: {title: 'Manage App users', isAuthorizedView: true}
  },
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
    pathMatch: 'full',
    data: {title: 'Welcome to dashboard!', isAuthorizedView: true}
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full',
    data: {title: 'Page not found'}
  },
];
