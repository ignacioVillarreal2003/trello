import { Component } from '@angular/core';
import {BasicPreViewCardComponent} from "../../../shared/components/basic-pre-view-card/basic-pre-view-card.component";
import {GenericButtonComponent} from "../../../shared/components/generic-button/generic-button.component";
import {NgForOf} from "@angular/common";
import {IBoard} from "../../../core/models/board.model";
import {BoardCommunicationService} from "../../../core/services/communication/board-communication.service";
import {BoardHttpService} from "../../../core/services/http/board-http.service";
import {UserService} from "../../../core/services/user/user.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../core/services/alert/alert.service";
import {FormPostBoardComponent} from "./forms/form-post-board/form-post-board.component";
import {FormDeleteBoardComponent} from "./forms/form-delete-board/form-delete-board.component";
import {FormUpdateBoardComponent} from "./forms/form-update-board/form-update-board.component";

@Component({
  selector: 'app-boards-section',
  standalone: true,
  imports: [
    BasicPreViewCardComponent,
    GenericButtonComponent,
    NgForOf,
    FormPostBoardComponent,
    FormDeleteBoardComponent,
    FormUpdateBoardComponent
  ],
  templateUrl: './boards-section.component.html',
  styleUrl: './boards-section.component.css'
})
export class BoardsSectionComponent {

  username: string = '';

  ngOnInit(): void{
    this.boardCommunicationService.refreshBoards$.subscribe(() => {
      this.GetBoards(this.userService.teamName);
    });
    this.username = this.userService.username;
  }

  constructor(private boardCommunicationService: BoardCommunicationService,
              private router: Router,
              private userService: UserService,
              private boardHttpService: BoardHttpService,
              private alertService: AlertService) {}

  boards: IBoard[] = [];

  GetBoards(teamName: string): void {
    this.boardHttpService.GetBoards(teamName).subscribe(
      (result: IBoard[]): void => {
        this.boards = result;
      },
      (error): void => {
        this.alertService.ErrorMessage('Error in the server. Verify the data entered.')
      }
    )
  }

  OpenBoard(board: IBoard): void {
    this.router.navigate([`/board/${board.id}`]);
    this.boardCommunicationService.changeBoard(board);
  }

  OpenPostBoardForm(): void {
    const form: HTMLElement = document.querySelector('#form-post-board') as HTMLElement;
    form.style.display = "flex";
  }

  OpenUpdateBoardForm(): void {
    const form: HTMLElement = document.querySelector('#form-update-board') as HTMLElement;
    form.style.display = "flex";
    this.boardCommunicationService.changeBoards(this.boards);
  }

  OpenDeleteBoardForm(): void {
    const form: HTMLElement = document.querySelector('#form-delete-board') as HTMLElement;
    form.style.display = "flex";
    this.boardCommunicationService.changeBoards(this.boards);
  }
}
