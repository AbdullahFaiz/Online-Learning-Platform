import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Enrollment } from '../models/enrollment.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type'                  : 'application/json',
        'Access-Control-Allow-Origin'   : '*'
    })
};

constructor(
    private router              : Router,
    private httpClient          : HttpClient,private tokenStorageService: TokenStorageService
    ) {
      const jwtToken = this.tokenStorageService.getToken();
      this.httpOptions = {
        headers: new HttpHeaders({
            'Content-Type'                  : 'application/json',
            'Access-Control-Allow-Origin'   : '*',
            'Authorization'                 : `Bearer ${jwtToken}`
        })
    };
    }

//api URL
apiUrl = "http://localhost:8080"+"/api/enrollments";

// HTTP request error handling
private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error('Backend returned code error'+ error);
    }
    return throwError(() => 'Something bad happened; please try again later.');
}

create(enrollment : Enrollment){
    return this.httpClient.post(this.apiUrl, enrollment, this.httpOptions).pipe(
        catchError(this.handleError)
    );
}

update(enrollment : any){
  const token = this.tokenStorageService.getToken();
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  console.log(headers);
  console.log(token);
    return this.httpClient.put(this.apiUrl+ '/' + enrollment.id, enrollment, { headers }).pipe(
        catchError(this.handleError)
    );
}
update2(enrollment : any){
  const token = this.tokenStorageService.getToken();
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  console.log(headers);
  console.log(token);
  console.log(this.httpOptions)
    return this.httpClient.put(this.apiUrl+ '/' + enrollment.id, enrollment, this.httpOptions).pipe(
        catchError(this.handleError)
    );
}
delete(enrollmentId : any){
  const token = this.tokenStorageService.getToken();
    const httpOptions2 = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin'   : '*',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.httpClient.delete(this.apiUrl + '/' + enrollmentId, httpOptions2).pipe(
        catchError(this.handleError)
    );
}

getAllEnrollment() {
  return this.httpClient.get<any[]>(this.apiUrl, this.httpOptions)
      .pipe(
          catchError(this.handleError)
      );
}
getAllEnrollmentByStudent(id) {
  return this.httpClient.get<any[]>(this.apiUrl+'/student/' +id, this.httpOptions)
      .pipe(
          catchError(this.handleError)
      );
}

}
