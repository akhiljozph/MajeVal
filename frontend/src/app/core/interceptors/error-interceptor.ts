import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const snackBar = inject(MatSnackBar);

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
            snackBar.open(backendMessage, 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
            break;

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
