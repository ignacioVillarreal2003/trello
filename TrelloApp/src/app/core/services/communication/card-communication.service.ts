import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {ICard} from "../../models/card.model";

@Injectable({
  providedIn: 'root'
})
export class CardCommunicationService {

  private refreshCardsSubject = new Subject<void>();
  refreshCards$ = this.refreshCardsSubject.asObservable();

  triggerRefreshCards() {
    this.refreshCardsSubject.next();
  }

  private cardSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentCard: Observable<any> = this.cardSource.asObservable();

  changeCard(card: ICard) {
    this.cardSource.next(card);
  }
}
