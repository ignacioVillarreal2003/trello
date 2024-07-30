import { Injectable } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private http: HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  baseUrl: string = 'https://localhost:44367/User';

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error.error);
  }

  Register(email: string, username: string, password: string): Observable<any> {
    const requestBody: any = { email: email,username: username, password: password };
    return this.http.post<any>(this.baseUrl + '/register', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        return response.token;
      })
    );
  }

  Login(email: string, password: string): Observable<any> {
    const requestBody: any = { email: email, password: password };
    return this.http.post<any>(this.baseUrl + '/login', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        return response.token;
      })
    );
  }

  UpdateUser(email: string, username: string, password: string): Observable<any> {
    const requestBody: any = { username: username, password: password };
    return this.http.put<any>(this.baseUrl + `/${email}`, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetUser(email: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/${email}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        return response.user;
      })
    );
  }

  GetUsers(): Observable<any> {
    return this.http.get<any>(this.baseUrl, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        return response.users.result;
      })
    );
  }

  DeleteUser(email: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/${email}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
