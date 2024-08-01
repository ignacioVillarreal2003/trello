import { Component } from '@angular/core';
import {GenericButtonComponent} from "../../../../../shared/components/generic-button/generic-button.component";
import {NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ITeam} from "../../../../../core/models/team.model";
import {TeamCommunicationService} from "../../../../../core/services/communication/team-communication.service";
import {TeamHttpService} from "../../../../../core/services/http/team-http.service";
import {AlertService} from "../../../../../core/services/alert/alert.service";
import {IUser} from "../../../../../core/models/user.model";
import {UserHttpService} from "../../../../../core/services/http/user-http.service";
import {UserTeamHttpService} from "../../../../../core/services/http/user-team-http.service";

@Component({
  selector: 'app-form-add-friend',
  standalone: true,
  imports: [
    GenericButtonComponent,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './form-add-friend.component.html',
  styleUrl: './form-add-friend.component.css'
})
export class FormAddFriendComponent {
  teams: ITeam[] = [];
  users: IUser[] = [];

  ngOnInit() {
    this.teamCommunicationService.currentTeam.subscribe(teams => {
      this.teams = teams;
    });
    this.GetUsers();
  }

  constructor(private teamCommunicationService: TeamCommunicationService,
              private userHttpService: UserHttpService,
              private userTeamHttpService: UserTeamHttpService,
              private alertService: AlertService) {}

  formTeam: FormGroup = new FormGroup({
    teamName: new FormControl('', [Validators.required]),
    userEmail: new FormControl('', [Validators.required])
  });

  GetUsers(){
    this.userHttpService.GetUsers().subscribe(
      (response): void => {
        this.users = response;
      },
      (err: Error) => {
        this.alertService.ErrorMessage('Error in getUsers');
      }
    )
  }

  AddFriend(): void {
    if (this.formTeam.valid) {
      this.userTeamHttpService.PostUserTeam(this.formTeam.value.teamName, this.formTeam.value.userEmail).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully added team.');
          this.teamCommunicationService.triggerRefreshTeams();
          this.CloseWindow();
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
    const window: HTMLElement = document.querySelector('#form-add-friend') as HTMLElement;
    window.style.display = 'none';
  }
}
