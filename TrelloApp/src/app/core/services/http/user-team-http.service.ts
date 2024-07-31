import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserTeamHttpService {

  constructor(private http: HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  baseUrl: string = 'https://localhost:44367/UserTeam';

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error.error);
  }

  PostUserTeam(teamName: string, userEmail: string): Observable<any> {
    const requestBody: any = { teamName: teamName, userEmail: userEmail }
    console.log(requestBody)
    return this.http.post<any>(this.baseUrl, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  DeleteUserTeam(teamName: string, userEmail: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/${teamName}-${userEmail}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetUserTeamsByUser(userEmail: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/user/${userEmail}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        return response.teams;
      })
    );
  }

  GetUserTeamsByTeam(teamName: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/team/${teamName}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        return response.users;
      })
    );
  }
}
