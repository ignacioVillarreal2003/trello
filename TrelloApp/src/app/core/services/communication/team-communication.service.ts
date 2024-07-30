import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {ITeam} from "../../models/team.model";

@Injectable({
  providedIn: 'root'
})
export class TeamCommunicationService {

  private refreshTeamsSubject = new Subject<void>();
  refreshTeams$ = this.refreshTeamsSubject.asObservable();

  triggerRefreshTeams() {
    this.refreshTeamsSubject.next();
  }

  private teamSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentTeam: Observable<any> = this.teamSource.asObservable();

  changeTeam(teams: ITeam[]) {
    this.teamSource.next(teams);
  }
}
