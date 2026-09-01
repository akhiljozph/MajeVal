import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { IS_PUBLIC_API } from '@core/tokens/http-context.tokens';
import { environment } from '@env/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
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
    setHeaders: headers,
    withCredentials: true
  });

  return next(modifiedReq).pipe(
    catchError((error) => {
      return throwError(() => error);
    })
  );
};
