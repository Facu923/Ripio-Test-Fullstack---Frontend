import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  URL_BASE = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<any> {

    const token = "Token " + localStorage.getItem('userToken');

    let accountHeader = new HttpHeaders().set('Authorization', token);

    return this.http.get(this.URL_BASE + 'accounts/', { headers: accountHeader });
  }


  getAccountById(id: number): Observable<any> {

    const token = "Token " + localStorage.getItem('userToken');

    let accountHeader = new HttpHeaders().set('Authorization', token);

    return this.http.get(this.URL_BASE + 'accounts/' + id + '/', { headers: accountHeader })

  }


  create(client: number, currencyType: number, amount: number = 0): Observable<any> {
    const token = "Token " + localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');

    // Header
    let accountHeader = new HttpHeaders().set('Authorization', token);

    // Body
    const accountBody = {
      'client': client,
      'currencyType': currencyType,
      'amount': amount
    };

    return this.http.post<any>(this.URL_BASE + 'accounts/', accountBody, { headers: accountHeader });
  }

  deleteById(id: number): Observable<any> {

    const token = "Token " + localStorage.getItem('userToken');

    // Header
    let accountHeader = new HttpHeaders().set('Authorization', token);

    return this.http.delete<any>(this.URL_BASE + 'accounts/' + id + '/', { headers: accountHeader });

  }

  updateAmount(id: number, client: number, currencyType: number, amount: number): Observable<any> {

    const token = "Token " + localStorage.getItem('userToken');

    let accountHeader = new HttpHeaders().set('Authorization', token);

    // Body
    const accountBody = {
      'client': client,
      'currencyType': currencyType,
      'amount': amount
    };

    return this.http.put(this.URL_BASE + 'accounts/' + id + '/', accountBody, { headers: accountHeader })

  }
}
