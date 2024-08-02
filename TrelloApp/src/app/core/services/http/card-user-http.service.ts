import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardUserHttpService {

  constructor(private http: HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  baseUrl: string = 'https://localhost:44367/CardUser';

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error.error);
  }

  PostCardUser(cardId: number, userEmail: string): Observable<any> {
    const requestBody: any = { cardId: cardId, userEmail: userEmail }
    return this.http.post<any>(this.baseUrl, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetCardUser(cardId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/${cardId}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        return response;
      })
    );
  }

  DeleteCardUser(cardId: number, userEmail: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/${cardId}-${userEmail}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

}
