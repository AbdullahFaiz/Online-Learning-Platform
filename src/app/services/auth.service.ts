import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { TokenStorageService } from './token-storage.service';
import { LoginRequest } from '../models/login-request.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Student } from '../models/student.model';

const apiUrl = 'http://localhost:8080/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService,
    private httpClient          : HttpClient,
    private router              : Router)  
 { }

  // HTTP request error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error('Backend returned code error'+ error);
    }
    return throwError(() => 'Something bad happened; please try again later.');
  }

  login(loginRequest: LoginRequest): Observable<any> { 
    return this.httpClient.post(apiUrl+ '/login', loginRequest, httpOptions).pipe(
      catchError(this.handleError)
  );

  }
  create(user : User){
    return this.httpClient.post(apiUrl, user, httpOptions).pipe(
        catchError(this.handleError)
    );
  }
  register(user: any): Observable<any> {
    return this.http.post(apiUrl + '/signup', user, httpOptions);
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean  {
    const token = this.tokenStorageService.getToken();
    console.log(token);
    return !!token;
  }
  getUser(): Observable<User> {

    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    console.log(headers);
  console.log(token);
    return this.httpClient.get<User>(apiUrl+"/me", { headers });
  }

  getStudent(): Observable<Student> {

    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.httpClient.get<Student>(apiUrl+"/student", { headers });
  }
}
