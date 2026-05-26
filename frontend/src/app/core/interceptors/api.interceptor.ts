import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export const IS_PUBLIC_API = new HttpContextToken<boolean>(() => false);

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = environment.baseUrl;
  const token = 'ss' // localStorage.getItem('token');
  const isPublic = req.context.get(IS_PUBLIC_API);

  const fullUrl = req.url.startsWith('http') ? req.url : `${baseUrl}${req.url}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (token && !isPublic) {
    console.log('Inside token verification.')
  }

  let modifiedReq = req.clone({
    url: fullUrl,
    setHeaders: headers
  });

  return next(modifiedReq).pipe(
    catchError((error) => {
      return throwError(() => error);
    })
  );

};
