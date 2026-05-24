import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private httpService = Inject(HttpClient);

  getCountry(): Observable<any> {
    return this.httpService.get('/countries');
  }
}
