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

  private listsSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentLists: Observable<any> = this.listsSource.asObservable();

  changeLists(lists: IList[]) {
    this.listsSource.next(lists);
  }

  private listSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentList: Observable<IList> = this.listSource.asObservable();

  changeList(list: IList) {
    this.listSource.next(list);
  }
}
