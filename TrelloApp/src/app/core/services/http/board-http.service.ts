import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardHttpService {

  constructor(private http: HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  baseUrl: string = 'https://localhost:44367/Board';

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error.error);
  }

  PostBoard(boardTitle: string, teamName: string): Observable<any> {
    const requestBody: any = { boardTitle: boardTitle, teamName: teamName, theme: "skyblue" }
    return this.http.post<any>(this.baseUrl, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetBoards(teamName: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/${teamName}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        return response.boards;
      })
    );
  }

  DeleteBoard(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  UpdateBoard(id: number, boardTitle: string, theme: string): Observable<any> {
    const requestBody: any = { boardTitle: boardTitle, theme: theme }
    return this.http.put<any>(this.baseUrl + `/${id}`, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
