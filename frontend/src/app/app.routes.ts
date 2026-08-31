import { Routes } from '@angular/router';

import { SignIn } from './components/auth/sign-in/sign-in';
import { Landing } from './components/auth/auth-landing/auth-landing';
import { PageNotFound } from './components/error-pages/page-not-found/page-not-found';
import { DashboardLanding } from './components/dashboard/dashboard-landing/dashboard-landing';
import { LayoutContainer } from './shared/components/layout-container/layout-container';
import { CoursesLanding } from './components/courses/courses-landing/courses-landing';
import { AdministratorsLanding } from './components/administrators/administrators-landing/administrators-landing';
import { UsersLanding } from './components/users/users-landing/users-landing';

export const routes: Routes = [
    {
        path: '',
        component: Landing,
        children: [
            {
                path: '',
                redirectTo: 'sign-in',
                pathMatch: 'full'
            },
            {
                path: 'sign-in',
                component: SignIn,
                title: 'MajeVal | SignIn'
            },
            {
                path: 'sign-up',
                loadComponent: () => import('../app/components/auth/sign-up/sign-up').then(comp => comp.SignUp),
                title: 'MajeVal | SignUp'
            }
        ]
    }, {
        path: 'app',
        component: LayoutContainer,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardLanding,
                title: 'MajeVal | Dashboard'
            },
            {
                path: 'courses',
                component: CoursesLanding,
                title: 'MajeVal | Courses'
            },
            {
                path: 'administrators',
                component: AdministratorsLanding,
                title: 'MajeVal | Administrators'
            },
            {
                path: 'users',
                component: UsersLanding,
                title: 'MajeVal | Users'
            }
        ]
    }, {
        path: '**',
        component: PageNotFound
    }
];
