import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardUserCommunicationService {

  private refreshCardUsersSubject = new Subject<void>();
  refreshCardUsers$ = this.refreshCardUsersSubject.asObservable();

  triggerRefreshCardUsers() {
    this.refreshCardUsersSubject.next();
  }
}
