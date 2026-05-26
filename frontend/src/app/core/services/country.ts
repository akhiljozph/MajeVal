import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.httpService.get<IBaseResponse<ICountry[]>>('app/countries');
  }
}
