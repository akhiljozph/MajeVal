import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  constructor(
    private httpService: HttpClient
  ) { }

  getCountry(): Observable<any> {
    return this.httpService.get('app/countries');
  }
}
