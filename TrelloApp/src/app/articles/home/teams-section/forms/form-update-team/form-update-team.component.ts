import { Component } from '@angular/core';
import {ITeam} from "../../../../../core/models/team.model";
import {TeamCommunicationService} from "../../../../../core/services/communication/team-communication.service";
import {TeamHttpService} from "../../../../../core/services/http/team-http.service";
import {AlertService} from "../../../../../core/services/alert/alert.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GenericButtonComponent} from "../../../../../shared/components/generic-button/generic-button.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-form-update-team',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GenericButtonComponent,
    NgForOf
  ],
  templateUrl: './form-update-team.component.html',
  styleUrl: './form-update-team.component.css'
})
export class FormUpdateTeamComponent {
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
    teamName: new FormControl(''),
    teamTheme: new FormControl('')
  });

  UpdateTeam(): void {
    if (this.formTeam.valid) {
      this.teamHttpService.UpdateTeam(this.formTeam.value.teamName, this.formTeam.value.teamTheme).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully updated team.');
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
    const window: HTMLElement = document.querySelector('#form-update-team') as HTMLElement;
    window.style.display = 'none';
  }
}
