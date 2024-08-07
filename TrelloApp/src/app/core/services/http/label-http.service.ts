import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LabelHttpService {

  constructor(private http: HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  baseUrl: string = 'https://localhost:44367/Label';

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error.error);
  }

  PostLabel(labelTitle: string, color: string): Observable<any> {
    const requestBody: any = { labelTitle: labelTitle, color: color }
    return this.http.post<any>(this.baseUrl, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetLabels(): Observable<any> {
    return this.http.get<any>(this.baseUrl, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        return response.labels;
      })
    );
  }

  DeleteLabel(labelTitle: string, color: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/${labelTitle}-${color}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

}
