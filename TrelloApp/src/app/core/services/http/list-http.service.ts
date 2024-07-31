import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ListHttpService {

  constructor(private http: HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  baseUrl: string = 'https://localhost:44367/List';

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error.error);
  }

  PostList(boardId: number, listTitle: string): Observable<any> {
    const requestBody: any = { boardId: boardId, listTitle: listTitle }
    return this.http.post<any>(this.baseUrl, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetLists(boardId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/${boardId}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        return response.lists;
      })
    );
  }

  DeleteList(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  UpdateList(id: number, listTitle: string): Observable<any> {
    const requestBody: any = { listTitle: listTitle }
    return this.http.put<any>(this.baseUrl + `/${id}`, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
