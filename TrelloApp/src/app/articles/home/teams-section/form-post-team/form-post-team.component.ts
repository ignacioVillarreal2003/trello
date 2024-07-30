import { Component } from '@angular/core';
import {GenericButtonComponent} from "../../../../shared/components/inputs/generic-button/generic-button.component";
import {
  GenericInputTextComponent
} from "../../../../shared/components/inputs/generic-input-text/generic-input-text.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TeamCommunicationService} from "../../../../core/services/communication/team-communication.service";
import {TeamHttpService} from "../../../../core/services/http/team-http.service";
import {UserTeamHttpService} from "../../../../core/services/http/user-team-http.service";
import {AlertService} from "../../../../core/services/alert/alert.service";
import {UserService} from "../../../../core/services/user/user.service";

@Component({
  selector: 'app-form-post-team',
  standalone: true,
  imports: [
    GenericButtonComponent,
    GenericInputTextComponent,
    ReactiveFormsModule
  ],
  templateUrl: './form-post-team.component.html',
  styleUrl: './form-post-team.component.css'
})
export class FormPostTeamComponent {
  constructor(private teamCommunicationService: TeamCommunicationService,
              private teamHttpService: TeamHttpService,
              private userTeamHttpService: UserTeamHttpService,
              private alertService: AlertService,
              private userService: UserService) {}

  formTeam: FormGroup = new FormGroup({
    teamName: new FormControl('', [Validators.required]),
  });

  PostTeams(): void {
    if (this.formTeam.valid) {
      this.teamHttpService.PostTeam(this.formTeam.value.teamName).subscribe(
        (response): void => {
          this.PostUserTeams(this.formTeam.value.teamName, this.userService.email);
          this.alertService.SuccessMessage('Successfully created team.');
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

  PostUserTeams(teamName: string, email: string): void {
    this.userTeamHttpService.PostUserTeam(teamName, email).subscribe(
      (response): void => {
        this.teamCommunicationService.triggerRefreshTeams();
      },
      (error): void => {
        this.alertService.ErrorMessage('Error in the server. Please verify the data entered.')
      }
    );
  }

  CloseWindow(){
    const window: HTMLElement = document.querySelector('#form-post-team') as HTMLElement;
    window.style.display = 'none';
  }
}
