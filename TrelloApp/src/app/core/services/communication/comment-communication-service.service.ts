import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {IBoard} from "../../models/board.model";
import {IComment} from "../../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentCommunicationServiceService {

  private refreshCommentsSubject = new Subject<void>();
  refreshComments$ = this.refreshCommentsSubject.asObservable();

  triggerRefreshComments() {
    this.refreshCommentsSubject.next();
  }

  private commentsSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentComments: Observable<any> = this.commentsSource.asObservable();

  changeComments(comment: IComment[]) {
    this.commentsSource.next(comment);
  }

  private commentSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentComment: Observable<any> = this.commentSource.asObservable();

  changeComment(comment: IComment) {
    this.commentSource.next(comment);
  }
}
