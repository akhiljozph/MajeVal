import { Routes } from '@angular/router';

import { authGuard } from '@core/guards/auth.guard';
import { authRoutes } from '@features/auth/auth.routes';
import { appRoutes } from '@features/shell/app.routes';
import { AuthLanding } from '@features/auth/auth-landing/auth-landing';
import { LayoutContainer } from '@shared/components/layout-container/layout-container';
import { PageNotFound } from '@shared/components/page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: '',
    component: AuthLanding,
    children: authRoutes,
  },
  {
    path: 'app',
    component: LayoutContainer,
    canActivate: [authGuard],
    children: appRoutes,
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
