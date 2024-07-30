import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeCommunicationService {

  private refreshThemeSubject: Subject<void> = new Subject<void>();
  refreshTheme$: Observable<void> = this.refreshThemeSubject.asObservable();

  triggerRefreshTheme() {
    this.refreshThemeSubject.next();
  }
}
