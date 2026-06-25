import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IBaseResponse } from '../interfaces/base-response';

@Service()
export class AuthService {

    private httpService = inject(HttpClient);

    accountSignUp(accountData: any): Observable<IBaseResponse<any>> {
        return this.httpService.post<IBaseResponse<any>>('auth/signup', accountData);
    }
}
