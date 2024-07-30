import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {IBoard} from "../../models/board.model";

@Injectable({
  providedIn: 'root'
})
export class BoardCommunicationService {

  private refreshBoardsSubject = new Subject<void>();
  refreshBoards$ = this.refreshBoardsSubject.asObservable();

  triggerRefreshBoards() {
    this.refreshBoardsSubject.next();
  }

  private boardsSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentBoards: Observable<any> = this.boardsSource.asObservable();

  changeBoards(boards: IBoard[]) {
    this.boardsSource.next(boards);
  }

  private boardSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentBoard: Observable<any> = this.boardSource.asObservable();

  changeBoard(board: IBoard) {
    this.boardSource.next(board);
  }
}
