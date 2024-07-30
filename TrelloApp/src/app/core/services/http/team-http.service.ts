import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamHttpService {

  constructor(private http: HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  baseUrl: string = 'https://localhost:44367/Team';

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error.error);
  }

  PostTeam(teamName: string): Observable<any> {
    const requestBody: any = { teamName: teamName, theme: "skyblue" }
    return this.http.post<any>(this.baseUrl, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  DeleteTeam(teamName: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/${teamName}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  UpdateTeam(teamName: string, teamTheme: string): Observable<any> {
    const requestBody: any = { theme: teamTheme }
    return this.http.put<any>(this.baseUrl + `/${teamName}`, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
