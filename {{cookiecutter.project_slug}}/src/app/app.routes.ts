import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {authGuard} from './auth/auth.guard';

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
    canActivate: [authGuard],
    loadComponent: () => import('./user/profile/profile.component').then(c => c.ProfileComponent),
    data: {title: 'Your Profile', hasHeaderView: true}
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () => import('./user/user-manager/user-manager.component').then(c => c.UserManagerComponent),
    data: {title: 'Manage App users', hasHeaderView: true, isOnlyAdmin: true}
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
    pathMatch: 'full',
    data: {title: 'Home', hasHeaderView: true}
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full',
    data: {title: 'Page not found'}
  },
];
