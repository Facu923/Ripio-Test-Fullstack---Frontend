import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  URL_BASE = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }


  getCurrencies(): Observable<any> {

    const token = "Token " + localStorage.getItem('userToken');

    let accountHeader = new HttpHeaders().set('Authorization', token);

    return this.http.get(this.URL_BASE + 'currencyTypes/', { headers: accountHeader });
  }
}
