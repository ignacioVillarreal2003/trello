import { Component } from '@angular/core';
import {GenericButtonComponent} from "../../../../../shared/components/generic-button/generic-button.component";
import {NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ITeam} from "../../../../../core/models/team.model";
import {TeamCommunicationService} from "../../../../../core/services/communication/team-communication.service";
import {TeamHttpService} from "../../../../../core/services/http/team-http.service";
import {AlertService} from "../../../../../core/services/alert/alert.service";
import {BoardHttpService} from "../../../../../core/services/http/board-http.service";
import {BoardCommunicationService} from "../../../../../core/services/communication/board-communication.service";
import {IBoard} from "../../../../../core/models/board.model";

@Component({
  selector: 'app-form-delete-board',
  standalone: true,
  imports: [
    GenericButtonComponent,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './form-delete-board.component.html',
  styleUrl: './form-delete-board.component.css'
})
export class FormDeleteBoardComponent {
  boards: IBoard[] = [];

  ngOnInit(): void {
    this.boardCommunicationService.currentBoards.subscribe(boards => {
      this.boards = boards;
    });
  }

  constructor(private boardCommunicationService: BoardCommunicationService,
              private boardHttpService: BoardHttpService,
              private alertService: AlertService) {}

  formBoard: FormGroup = new FormGroup({
    id: new FormControl(0, [Validators.required])
  });

  DeleteBoard(): void {
    if (this.formBoard.valid) {
      this.boardHttpService.DeleteBoard(this.formBoard.value.id).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully deleted board.');
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
    const window: HTMLElement = document.querySelector('#form-delete-board') as HTMLElement;
    window.style.display = 'none';
  }
}
