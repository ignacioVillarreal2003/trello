import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LabelCommunicationService {

  private refreshLabelsSubject = new Subject<void>();
  refreshLabels$ = this.refreshLabelsSubject.asObservable();

  triggerRefreshLabels() {
    this.refreshLabelsSubject.next();
  }
}
