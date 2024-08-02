import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentHttpService {

  constructor(private http: HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  baseUrl: string = 'https://localhost:44367/Comment';

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error.error);
  }

  PostComment(commentDescription: string, commentDate: Date, cardId: number): Observable<any> {
    const commentDateIso: string = new Date(commentDate).toISOString();
    const requestBody: any = { commentDescription: commentDescription, commentDate: commentDateIso, cardId: cardId }
    return this.http.post<any>(this.baseUrl, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetComments(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/${id}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        return response.comments;
      })
    );
  }

  DeleteComment(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  UpdateBoard(id: number, commentDescription: string, commentDate: Date): Observable<any> {
    const commentDateIso: string = new Date(commentDate).toISOString();
    const requestBody: any = { commentDescription: commentDescription, commentDate: commentDateIso }
    return this.http.put<any>(this.baseUrl + `/${id}`, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
