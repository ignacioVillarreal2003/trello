import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {IList} from "../../models/list.model";

@Injectable({
  providedIn: 'root'
})
export class ListCommunicationService {

  private refreshListsSubject = new Subject<void>();
  refreshLists$ = this.refreshListsSubject.asObservable();

  triggerRefreshLists() {
    this.refreshListsSubject.next();
  }

  private listSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentList: Observable<any> = this.listSource.asObservable();

  changeList(lists: IList[]) {
    this.listSource.next(lists);
  }

  private listIdSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentListId: Observable<number> = this.listIdSource.asObservable();

  changeListId(id: number) {
    this.listIdSource.next(id);
  }
}
