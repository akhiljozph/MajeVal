import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@features/dashboard/dashboard-landing/dashboard-landing').then(
        (m) => m.DashboardLanding,
      ),
    title: 'MajeVal | Dashboard',
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('@features/courses/courses-landing/courses-landing').then(
        (m) => m.CoursesLanding,
      ),
    title: 'MajeVal | Courses',
  },
  {
    path: 'administrators',
    loadComponent: () =>
      import(
        '@features/administrators/administrators-landing/administrators-landing'
      ).then((m) => m.AdministratorsLanding),
    title: 'MajeVal | Administrators',
  },
  {
    path: 'users',
    loadComponent: () =>
      import('@features/users/users-landing/users-landing').then(
        (m) => m.UsersLanding,
      ),
    title: 'MajeVal | Users',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('@features/profile/profile-landing/profile-landing').then(
        (m) => m.ProfileLanding,
      ),
    title: 'MajeVal | Profile',
  },
];
