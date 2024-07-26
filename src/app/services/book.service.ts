import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

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
apiUrl = "http://localhost:8080"+"/book";

// HTTP request error handling
private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error('Backend returned code error'+ error);
    }
    return throwError(() => 'Something bad happened; please try again later.');
}

create(book : any){
    return this.httpClient.post(this.apiUrl, book, this.httpOptions).pipe(
        catchError(this.handleError)
    );
}

update(book : any){
    return this.httpClient.put(this.apiUrl+ '/' + book.bookId, book, this.httpOptions).pipe(
        catchError(this.handleError)
    );
}

delete(bookId : any){
    return this.httpClient.delete(this.apiUrl + '/' + bookId, this.httpOptions).pipe(
        catchError(this.handleError)
    );
}

getAllBook(page: number = 0, size: number = 10): Observable<any> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
  return this.httpClient.get<any>(this.apiUrl, { params });
}
}
