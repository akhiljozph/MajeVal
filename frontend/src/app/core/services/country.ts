import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';

import { IS_PUBLIC_API } from '../interceptors/auth-interceptor';
import { IBaseResponse } from '../interfaces/base-response';
import { ICountry } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  constructor(
    private httpService: HttpClient
  ) { }

  getCountry(): Observable<IBaseResponse<ICountry[]>> {
    return this.httpService.get<IBaseResponse<ICountry[]>>('app/countries', {
      context: new HttpContext().set(IS_PUBLIC_API, true)
    }).pipe(
      retry(3),
      catchError(error => {
        console.error('All 3 retries failed:', error);
        throw error;
      })
    );
  }
}
