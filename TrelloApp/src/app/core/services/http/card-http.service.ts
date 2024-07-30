import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardHttpService {

  constructor(private http: HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  baseUrl: string = 'https://localhost:44367/Card';

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error.error);
  }

  PostCard(listId: number, cardTitle: string, start: Date, end: Date, description: string): Observable<any> {
    const startIso: string = new Date(start).toISOString();
    const endIso: string = new Date(end).toISOString();
    const requestBody: any = { listId: listId, cardTitle: cardTitle, start: startIso, end: endIso, description: description }
    return this.http.post<any>(this.baseUrl, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetCards(listId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/${listId}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        return response.cards;
      })
    );
  }

  DeleteCard(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  UpdateCard(id: number, boardTitle: string): Observable<any> {
    const requestBody: any = { boardTitle: boardTitle }
    return this.http.put<any>(this.baseUrl + `/${id}`, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

}
