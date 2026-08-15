import { Routes } from '@angular/router';

import { SignIn } from './components/auth/sign-in/sign-in';
import { Landing } from './components/auth/auth-landing/auth-landing';
import { PageNotFound } from './components/error-pages/page-not-found/page-not-found';
import { MainLayout } from './shared/components/main-layout/main-layout';

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
        component: MainLayout,
        children: []
    }, {
        path: '**',
        component: PageNotFound
    }
];
