import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardLabelHttpService {

  constructor(private http: HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  baseUrl: string = 'https://localhost:44367/CardLabel';

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error.error);
  }

  PostCardLabel(cardId: number, labelTitle: string, color: string): Observable<any> {
    const requestBody: any = { cardId: cardId, labelTitle: labelTitle, color: color }
    return this.http.post<any>(this.baseUrl, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetCardLabel(cardId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/${cardId}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        return response.labels;
      })
    );
  }

  DeleteComment(cardId: string, labelTitle: string, color: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/${cardId}-${labelTitle}-${color}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
