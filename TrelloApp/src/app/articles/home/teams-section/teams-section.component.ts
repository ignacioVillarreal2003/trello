import { Component } from '@angular/core';
import {BasicPreViewCardComponent} from "../../../shared/components/basic-pre-view-card/basic-pre-view-card.component";
import {GenericButtonComponent} from "../../../shared/components/generic-button/generic-button.component";
import {NgForOf} from "@angular/common";
import {TeamCommunicationService} from "../../../core/services/communication/team-communication.service";
import {UserService} from "../../../core/services/user/user.service";
import {AlertService} from "../../../core/services/alert/alert.service";
import {ITeam} from "../../../core/models/team.model";
import {UserTeamHttpService} from "../../../core/services/http/user-team-http.service";
import {FormPostTeamComponent} from "../../../shared/components/forms/form-post-team/form-post-team.component";
import {FormUpdateTeamComponent} from "../../../shared/components/forms/form-update-team/form-update-team.component";
import {FormDeleteTeamComponent} from "../../../shared/components/forms/form-delete-team/form-delete-team.component";
import {BoardCommunicationService} from "../../../core/services/communication/board-communication.service";
import {FormAddFriendComponent} from "../../../shared/components/forms/form-add-friend/form-add-friend.component";
import {FormRemoveFriendComponent} from "../../../shared/components/forms/form-remove-friend/form-remove-friend.component";

@Component({
  selector: 'app-teams-section',
  standalone: true,
  imports: [
    BasicPreViewCardComponent,
    GenericButtonComponent,
    NgForOf,
    FormPostTeamComponent,
    FormUpdateTeamComponent,
    FormDeleteTeamComponent,
    FormAddFriendComponent,
    FormRemoveFriendComponent,
  ],
  templateUrl: './teams-section.component.html',
  styleUrl: './teams-section.component.css'
})
export class TeamsSectionComponent {

  username: string = '';

  ngOnInit(): void{
    this.GetTeams();
    this.teamCommunicationService.refreshTeams$.subscribe(() => {
      this.GetTeams();
    });
    this.username = this.userService.username;
  }

  constructor(private teamCommunicationService: TeamCommunicationService,
              private userTeamHttpService: UserTeamHttpService,
              private userService: UserService,
              private boardCommunicationService: BoardCommunicationService,
              private alertService: AlertService) {}

  teams: ITeam[] = [];

  GetTeams(){
    this.userTeamHttpService.GetUserTeamsByUser(this.userService.email).subscribe(
      (result: ITeam[]): void => {
        this.teams = result;
      },
      (error): void => {
        this.alertService.ErrorMessage('Error in the server. Verify the data entered.')
      }
    )
  }

  OpenPostTeamForm(): void {
    const base: HTMLElement = document.querySelector('#forms-content') as HTMLElement;
    base.style.display = "flex";
    const form: HTMLElement = document.querySelector('#form-post-team') as HTMLElement;
    this.teamCommunicationService.changeTeam(this.teams);
    form.style.display = "flex";
  }

  OpenUpdateTeamForm(): void {
    const base: HTMLElement = document.querySelector('#forms-content') as HTMLElement;
    base.style.display = "flex";
    const form: HTMLElement = document.querySelector('#form-update-team') as HTMLElement;
    form.style.display = "flex";
    this.teamCommunicationService.changeTeam(this.teams);
  }

  OpenDeleteTeamForm(): void {
    const base: HTMLElement = document.querySelector('#forms-content') as HTMLElement;
    base.style.display = "flex";
    const form: HTMLElement = document.querySelector('#form-delete-team') as HTMLElement;
    form.style.display = "flex";
    this.teamCommunicationService.changeTeam(this.teams);
  }

  OpenAddFriendForm(): void {
    const base: HTMLElement = document.querySelector('#forms-content') as HTMLElement;
    base.style.display = "flex";
    const form: HTMLElement = document.querySelector('#form-add-friend') as HTMLElement;
    form.style.display = "flex";
    this.teamCommunicationService.changeTeam(this.teams);
  }

  OpenRemoveFriendForm(): void {
    const base: HTMLElement = document.querySelector('#forms-content') as HTMLElement;
    base.style.display = "flex";
    const form: HTMLElement = document.querySelector('#form-remove-friend') as HTMLElement;
    form.style.display = "flex";
    this.teamCommunicationService.changeTeam(this.teams);
  }

  OpenBoards(teamName: string): void {
    this.userService.teamName = teamName;
    this.boardCommunicationService.triggerRefreshBoards();
    const boardsSection: HTMLElement = document.querySelector('#boards-section') as HTMLElement;
    const teamsSection: HTMLElement = document.querySelector('#teams-section') as HTMLElement;
    boardsSection.style.display = "flex";
    teamsSection.style.display = "none";
  }
}
