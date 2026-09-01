import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

import { environment } from '@env/environment';
import { Router } from '@angular/router';

let isRefreshing = false;

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const snackBar = inject(MatSnackBar);
  const http = inject(HttpClient);
  const router = inject(Router);

  const baseUrl = environment.baseUrl;
  const refreshTokenSubject$$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  return next(req).pipe(
    catchError((error: unknown) => {

      if (error instanceof HttpErrorResponse) {

        const backendMessage = error.error?.message || 'An unexpected server error occurred.';

        switch (error.status) {
          case 400:
            snackBar.open(backendMessage, 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
            break;

          case 401:
            if (req.url.includes(`${baseUrl}auth/refresh`)) {
              isRefreshing = false;
              refreshTokenSubject$$.next(null);

              snackBar.open(backendMessage, 'Close', {
                duration: 5000,
                panelClass: ['error-snackbar']
              });
            }

            if (!isRefreshing) {
              isRefreshing = true;
              refreshTokenSubject$$.next(null);

              return http.post<any>(`${baseUrl}auth/refresh`, {}, { withCredentials: true }).pipe(
                switchMap((response) => {
                  const newAccessToken = response.data.accessToken;

                  isRefreshing = false;
                  refreshTokenSubject$$.next(newAccessToken);

                  return next(req.clone({
                    setHeaders: { Authorization: `Bearer ${newAccessToken}` }
                  }));
                }),
                catchError((error: any) => {
                  isRefreshing = false;
                  router.navigate(['/sign-in']);
                  return throwError(() => error);
                })
              );
            } else {
              return refreshTokenSubject$$.pipe(
                filter((token) => token !== null),
                take(1),
                switchMap((newAccessToken) => {
                  return next(req.clone({
                    setHeaders: { Authorization: `Bearer ${newAccessToken}` }
                  }))
                })
              )
            }

          case 403:
            snackBar.open(backendMessage, 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
            break;

          case 429:
            snackBar.open(backendMessage, 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
            break;

          case 500:
            snackBar.open(backendMessage, 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
            break;

          default:
            snackBar.open(backendMessage, 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
            break;
        }
      } else {
        console.error('An internal frontend engine error occurred:', error);
      }

      return throwError(() => error);
    })
  );
};
