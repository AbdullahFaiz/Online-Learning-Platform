import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  httpOptions = {
    headers: new HttpHeaders({
    })
};

jwtToken : string | null = null;

constructor(
    private router              : Router,
    private httpClient          : HttpClient,private tokenStorageService: TokenStorageService
    ) {
      this.jwtToken = this.tokenStorageService.getToken();
      this.httpOptions = {
        headers: new HttpHeaders({
            'Authorization'                 : `Bearer ${this.jwtToken }`
        })
    };
     }

//api URL
apiUrl = "http://localhost:8080"+"/api/admins";

// HTTP request error handling
private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error('Backend returned code error'+ error);
    }
    return throwError(() => 'Something bad happened; please try again later.');
}

create(admin : User){
    return this.httpClient.post(this.apiUrl, admin, this.httpOptions).pipe(
        catchError(this.handleError)
    );
}

update(admin : User){
    return this.httpClient.put(this.apiUrl+ '/' + admin.id, admin, this.httpOptions).pipe(
        catchError(this.handleError)
    );
}

delete(adminId : any){
    return this.httpClient.delete(this.apiUrl + '/' + adminId, this.httpOptions).pipe(
        catchError(this.handleError)
    );
}

getAllAdmin() {
  return this.httpClient.get<User[]>(this.apiUrl, this.httpOptions)
      .pipe(
          catchError(this.handleError)
      );
}

}
