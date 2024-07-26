import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type'                  : 'application/json',
        'Access-Control-Allow-Origin'   : '*'
    })
};


constructor(
    private router              : Router,
    private httpClient          : HttpClient
    ) { }

//api URL
apiUrl = "http://localhost:8080"+"/student";

// HTTP request error handling
private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error('Backend returned code error'+ error);
    }
    return throwError(() => 'Something bad happened; please try again later.');
}

create(user : User){
    return this.httpClient.post(this.apiUrl, user, this.httpOptions).pipe(
        catchError(this.handleError)
    );
}

update(user : any){
    return this.httpClient.put(this.apiUrl+ '/' + user.id, user, this.httpOptions).pipe(
        catchError(this.handleError)
    );
}

delete(userId : any){
    return this.httpClient.delete(this.apiUrl + '/' + userId, this.httpOptions).pipe(
        catchError(this.handleError)
    );
}

getAllUser(page: number = 0, size: number = 10): Observable<any> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
  return this.httpClient.get<any>(this.apiUrl, { params });
}

}
