import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// models
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  URL_BASE = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  create(client: Client): Observable<any> {

    const token = "Token " + localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');

    // Header
    let clientRegisterHeader = new HttpHeaders().set('Authorization', token);

    // Body
    const clientRegisterBody = {
      'user': userId,
      'firstname': client.firstname,
      'lastname': client.lastname,
      'idcard': client.idcard,
      'phone': client.phone
    };

    return this.http.post<any>(this.URL_BASE + 'clients/', clientRegisterBody, { headers: clientRegisterHeader });
  }

  getByUserId(id: string): Observable<any> {

    const token = "Token " + localStorage.getItem('userToken');

    let clientHeader = new HttpHeaders().set('Authorization', token);
    clientHeader.append('user', id);


    return this.http.get(this.URL_BASE + 'clients/', { headers: clientHeader })

  }
}
