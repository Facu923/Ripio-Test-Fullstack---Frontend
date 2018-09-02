import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

// models
import { Login } from '../models/login.model';
import { Client } from '../models/client.model';

@Injectable()
export class AuthenticationService {

    URL_BASE = 'http://127.0.0.1:8000/api/';

    constructor(private http: HttpClient) { }


    loginUser(userName: string, pass: string): Observable<any> {

        // Header for Login
        const loginHeader = new HttpHeaders({'Content-Type': 'application/json'});

        // Body for Login
        const loginBody = {
            'username': userName.toLowerCase(),
            'email': "",
            'password': pass
        };
        
        // Login
        return this.http.post<any>(this.URL_BASE + 'rest-auth/login/', loginBody, { headers: loginHeader });
    }


    registerUser(user: Login, client: Client): Observable<any> {

        // Header for User Registration
        const userRegisterHeader = new HttpHeaders({'Content-Type': 'application/json'});

        // Body for User Registration
        const userRegisterBody = {
            'username': user.username.toLowerCase(),
            'password1': user.password1,
            'password2': user.password2,
            'email': user.email.toLowerCase()
        };
        
        // User register
        return this.http.post<any>(this.URL_BASE + 'rest-auth/registration/', userRegisterBody, { headers: userRegisterHeader });
    }


    logout() {

        // Remove token and user id in local storage
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('clientId');

        // Header for User Registration
        const logoutHeader = new HttpHeaders({'Content-Type': 'application/json'});

        // Logout
        return this.http.post<any>(this.URL_BASE + 'rest-auth/logout/', { headers: logoutHeader });
    }
}
