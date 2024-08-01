import { Component } from '@angular/core';
import {ITeam} from "../../../../../core/models/team.model";
import {TeamCommunicationService} from "../../../../../core/services/communication/team-communication.service";
import {TeamHttpService} from "../../../../../core/services/http/team-http.service";
import {UserTeamHttpService} from "../../../../../core/services/http/user-team-http.service";
import {AlertService} from "../../../../../core/services/alert/alert.service";
import {UserService} from "../../../../../core/services/user/user.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GenericButtonComponent} from "../../../../../shared/components/generic-button/generic-button.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-form-delete-team',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GenericButtonComponent,
    NgForOf
  ],
  templateUrl: './form-delete-team.component.html',
  styleUrl: './form-delete-team.component.css'
})
export class FormDeleteTeamComponent {
  teams: ITeam[] = [];

  ngOnInit() {
    this.teamCommunicationService.currentTeam.subscribe(teams => {
      this.teams = teams;
    });
  }

  constructor(private teamCommunicationService: TeamCommunicationService,
              private teamHttpService: TeamHttpService,
              private alertService: AlertService) {}

  formTeam: FormGroup = new FormGroup({
    teamName: new FormControl('', [Validators.required])
  });

  DeleteTeam(): void {
    if (this.formTeam.valid) {
      this.teamHttpService.DeleteTeam(this.formTeam.value.teamName).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully deleted team.');
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
    const window: HTMLElement = document.querySelector('#form-delete-team') as HTMLElement;
    window.style.display = 'none';
  }
}
