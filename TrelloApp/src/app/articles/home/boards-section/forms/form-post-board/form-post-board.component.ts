import { Component } from '@angular/core';
import {GenericButtonComponent} from "../../../../../shared/components/generic-button/generic-button.component";
import {
  GenericInputTextComponent
} from "../../../../../shared/components/generic-input-text/generic-input-text.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BoardCommunicationService} from "../../../../../core/services/communication/board-communication.service";
import {BoardHttpService} from "../../../../../core/services/http/board-http.service";
import {UserTeamHttpService} from "../../../../../core/services/http/user-team-http.service";
import {AlertService} from "../../../../../core/services/alert/alert.service";
import {UserService} from "../../../../../core/services/user/user.service";

@Component({
  selector: 'app-form-post-board',
  standalone: true,
  imports: [
    GenericButtonComponent,
    GenericInputTextComponent,
    ReactiveFormsModule
  ],
  templateUrl: './form-post-board.component.html',
  styleUrl: './form-post-board.component.css'
})
export class FormPostBoardComponent {
  constructor(private boardCommunicationService: BoardCommunicationService,
              private boardHttpService: BoardHttpService,
              private alertService: AlertService,
              private userService: UserService) {}

  formBoard: FormGroup = new FormGroup({
    boardTitle: new FormControl('', [Validators.required]),
  });

  PostBoard(): void {
    if (this.formBoard.valid) {
      this.boardHttpService.PostBoard(this.formBoard.value.boardTitle, this.userService.teamName).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully created board.');
          this.boardCommunicationService.triggerRefreshBoards();
          this.CloseWindow();
        },
        (error): void => {
          this.alertService.ErrorMessage('Error in the server. Please verify the data entered.')
        }
      );
    } else {
      this.alertService.ErrorMessage('Board error. Please verify the data entered.')
    }
  }

  CloseWindow(){
    const window: HTMLElement = document.querySelector('#form-post-board') as HTMLElement;
    window.style.display = 'none';
  }
}
