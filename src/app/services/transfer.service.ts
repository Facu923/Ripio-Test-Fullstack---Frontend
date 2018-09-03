import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  URL_BASE = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  create(accountFromId: number, accountToId: number, amount: number = 0): Observable<any> {
    const token = "Token " + localStorage.getItem('userToken');

    // Header
    let transferHeader = new HttpHeaders().set('Authorization', token);

    // Body
    /*const transferBody = {
      'accountFrom': this.URL_BASE + 'accounts/' + accountFromId + '/',
      'accountTo': this.URL_BASE + 'accounts/' + accountToId + '/',
      'amount': amount
    };*/

    const transferBody = {
      'accountFrom': accountFromId,
      'accountTo': accountToId,
      'amount': amount
    };

    return this.http.post<any>(this.URL_BASE + 'transfers/', transferBody, { headers: transferHeader });
  }

  getTransfers(): Observable<any> {

    const token = 'Token ' + localStorage.getItem('userToken');

    // Header
    const transferHeader = new HttpHeaders().set('Authorization', token);

    return this.http.get<any>(this.URL_BASE + 'transfers/', { headers: transferHeader });

  }
}
