import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: unknown) => {

      if (error instanceof HttpErrorResponse) {

        const backendMessage = error.error?.message || 'An unexpected server error occurred.';

        switch (error.status) {
          case 400:
            alert(`Validation Failed: ${backendMessage}`);
            break;

          case 401:
            alert(`Session Expired: ${backendMessage}`);
            break;

          case 403:
            alert(`Access Denied: You do not have permission for this action.`);
            break;

          case 429:
            alert(`Too many requests: ${backendMessage}`);
            break;

          case 500:
            alert(`Server Error: ${backendMessage}`);
            break;

          default:
            alert(backendMessage);
            break;
        }
      } else {
        console.error('An internal frontend engine error occurred:', error);
      }

      return throwError(() => error);
    })
  );
};
