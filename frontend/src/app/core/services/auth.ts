import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpContext } from '@angular/common/http';

import { IBaseResponse } from '../interfaces/base-response';
import { IS_PUBLIC_API } from '../interceptors/auth-interceptor';

@Service()
export class AuthService {

    private httpService = inject(HttpClient);

    accountSignUp(accountData: any): Observable<IBaseResponse<any>> {
        return this.httpService.post<IBaseResponse<any>>('auth/signup', accountData);
    }

    checkEmailAvailability(emailAddress: string): Observable<IBaseResponse<any>> {
        return this.httpService.get<IBaseResponse<any>>(`app/check-email/${emailAddress}`, {
            context: new HttpContext().set(IS_PUBLIC_API, true)
        });
    }
}
