import { Component } from '@angular/core';
import {GenericButtonComponent} from "../../generic-button/generic-button.component";
import {NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ITeam} from "../../../../core/models/team.model";
import {TeamCommunicationService} from "../../../../core/services/communication/team-communication.service";
import {TeamHttpService} from "../../../../core/services/http/team-http.service";
import {AlertService} from "../../../../core/services/alert/alert.service";
import {BoardCommunicationService} from "../../../../core/services/communication/board-communication.service";
import {BoardHttpService} from "../../../../core/services/http/board-http.service";
import {IBoard} from "../../../../core/models/board.model";
import {
  GenericInputTextComponent
} from "../../generic-input-text/generic-input-text.component";

@Component({
  selector: 'app-form-update-board',
  standalone: true,
  imports: [
    GenericButtonComponent,
    NgForOf,
    ReactiveFormsModule,
    GenericInputTextComponent
  ],
  templateUrl: './form-update-board.component.html',
  styleUrl: './form-update-board.component.css'
})
export class FormUpdateBoardComponent {
  boards: IBoard[] = [];

  ngOnInit() {
    this.boardCommunicationService.currentBoards.subscribe(boards => {
      this.boards = boards;
    });
  }

  constructor(private boardCommunicationService: BoardCommunicationService,
              private boardHttpService: BoardHttpService,
              private alertService: AlertService) {}

  formBoard: FormGroup = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    boardTitle: new FormControl(''),
    boardTheme: new FormControl('')
  });

  UpdateBoard(): void {
    if (this.formBoard.valid) {
      this.boardHttpService.UpdateBoard(this.formBoard.value.id, this.formBoard.value.boardTitle, this.formBoard.value.boardTheme).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully updated board.');
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
    const window: HTMLElement = document.querySelector('#form-update-board') as HTMLElement;
    window.style.display = 'none';
  }
}
