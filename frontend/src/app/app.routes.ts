import { Routes } from '@angular/router';

import { SignIn } from './components/sign-in/sign-in';
import { Landing } from './components/landing/landing';

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
                loadComponent: () => import('../app/components/sign-up/sign-up').then(comp => comp.SignUp),
                title: 'MajeVal | SignUp'
            }
        ]
    }
];
