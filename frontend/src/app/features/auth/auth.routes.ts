import { Routes } from '@angular/router';

import { guestGuard } from '@core/guards/guest.guard';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('@features/auth/sign-in/sign-in').then((m) => m.SignIn),
    title: 'MajeVal | SignIn',
    canActivate: [guestGuard],
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('@features/auth/sign-up/sign-up').then((m) => m.SignUp),
    title: 'MajeVal | SignUp',
    canActivate: [guestGuard],
  },
];
