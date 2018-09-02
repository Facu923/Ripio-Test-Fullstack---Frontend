import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// models
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL_BASE = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }


  getById(id: number) {

    const token = "Token " + localStorage.getItem('userToken');

    let userHeader = new HttpHeaders().set('Authorization', token);

    return this.http.get(this.URL_BASE + 'users/' + id + '/', { headers: userHeader });
  }


  delete() {

    let userId = localStorage.getItem("userId");

    if (userId != null) {

      // Header for User Registration
      const deleteHeader = new HttpHeaders({'Content-Type': 'application/json'});
      
      // User register
      return this.http.delete(this.URL_BASE + 'users/' + userId + '/', { headers: deleteHeader })

    }
  }

}
