import { Component } from '@angular/core';
import {BasicPreViewCardComponent} from "../basic-pre-view-card/basic-pre-view-card.component";
import {GenericButtonComponent} from "../../../shared/components/inputs/generic-button/generic-button.component";
import {NgForOf} from "@angular/common";
import {TeamCommunicationService} from "../../../core/services/communication/team-communication.service";
import {UserService} from "../../../core/services/user/user.service";
import {AlertService} from "../../../core/services/alert/alert.service";
import {ITeam} from "../../../core/models/team.model";
import {UserTeamHttpService} from "../../../core/services/http/user-team-http.service";
import {FormPostTeamComponent} from "./form-post-team/form-post-team.component";
import {FormUpdateTeamComponent} from "./form-update-team/form-update-team.component";
import {FormDeleteTeamComponent} from "./form-delete-team/form-delete-team.component";
import {BoardCommunicationService} from "../../../core/services/communication/board-communication.service";
import {FormAddFriendComponent} from "./form-add-friend/form-add-friend.component";

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
  ],
  templateUrl: './teams-section.component.html',
  styleUrl: './teams-section.component.css'
})
export class TeamsSectionComponent {

  ngOnInit(): void{
    this.GetTeams();
    this.teamCommunicationService.refreshTeams$.subscribe(() => {
      this.GetTeams();
    });
  }

  constructor(private teamCommunicationService: TeamCommunicationService,
              private userTeamHttpService: UserTeamHttpService,
              private userService: UserService,
              private boardCommunicationService: BoardCommunicationService,
              private alertService: AlertService) {}

  teams: ITeam[] = [];

  GetTeams(){
    this.userTeamHttpService.GetUserTeams(this.userService.email).subscribe(
      (result: ITeam[]): void => {
        this.teams = result;
      },
      (error): void => {
        this.alertService.ErrorMessage('Error in the server. Verify the data entered.')
      }
    )
  }

  OpenPostTeamForm(): void {
    const form: HTMLElement = document.querySelector('#form-post-team') as HTMLElement;
    this.teamCommunicationService.changeTeam(this.teams);
    form.style.display = "flex";
  }

  OpenUpdateTeamForm(): void {
    const form: HTMLElement = document.querySelector('#form-update-team') as HTMLElement;
    form.style.display = "flex";
    this.teamCommunicationService.changeTeam(this.teams);
  }

  OpenDeleteTeamForm(): void {
    const form: HTMLElement = document.querySelector('#form-delete-team') as HTMLElement;
    form.style.display = "flex";
    this.teamCommunicationService.changeTeam(this.teams);
  }

  OpenAddFriendForm(): void {
    const form: HTMLElement = document.querySelector('#form-add-friend') as HTMLElement;
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
