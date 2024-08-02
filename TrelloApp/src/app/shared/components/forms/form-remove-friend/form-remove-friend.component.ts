import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {GenericButtonComponent} from "../../generic-button/generic-button.component";
import {NgForOf} from "@angular/common";
import {ITeam} from "../../../../core/models/team.model";
import {IUser} from "../../../../core/models/user.model";
import {TeamCommunicationService} from "../../../../core/services/communication/team-communication.service";
import {UserHttpService} from "../../../../core/services/http/user-http.service";
import {UserTeamHttpService} from "../../../../core/services/http/user-team-http.service";
import {AlertService} from "../../../../core/services/alert/alert.service";

@Component({
  selector: 'app-form-remove-friend',
  standalone: true,
  imports: [
    FormsModule,
    GenericButtonComponent,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './form-remove-friend.component.html',
  styleUrl: './form-remove-friend.component.css'
})
export class FormRemoveFriendComponent {
  teams: ITeam[] = [];
  users: IUser[] = [];

  ngOnInit() {
    this.teamCommunicationService.currentTeam.subscribe(teams => {
      this.teams = teams;
    });
  }

  constructor(private teamCommunicationService: TeamCommunicationService,
              private userHttpService: UserHttpService,
              private userTeamHttpService: UserTeamHttpService,
              private alertService: AlertService) {}

  formTeam: FormGroup = new FormGroup({
    teamName: new FormControl('', [Validators.required]),
    userEmail: new FormControl('', [Validators.required])
  });

  GetUsers(event: Event): void {
    const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
    const teamName: string = selectElement.value;
    this.userTeamHttpService.GetUserTeamsByTeam(teamName).subscribe(
      (response): void => {
        this.users = response;
      },
      (err: Error): void => {
        this.alertService.ErrorMessage('Error in getUsers');
      }
    )
  }

  RemoveFriend(): void {
    if (this.formTeam.valid) {
      this.userTeamHttpService.DeleteUserTeam(this.formTeam.value.teamName, this.formTeam.value.userEmail).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully deleted team.');
          this.teamCommunicationService.triggerRefreshTeams();
          this.CloseWindow();
          this.GetUsers(this.formTeam.value.teamName);
        },
        (error): void => {
          this.alertService.ErrorMessage('Error in the server. Please verify the data entered.')
        }
      );
    } else {
      this.alertService.ErrorMessage('Team error. Please verify the data entered.')
    }
  }

  CloseWindow(){
    const window: HTMLElement = document.querySelector('#form-remove-friend') as HTMLElement;
    window.style.display = 'none';
  }
}
