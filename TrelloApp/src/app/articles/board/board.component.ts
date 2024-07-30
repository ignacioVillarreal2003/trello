import { Component } from '@angular/core';
import { HeaderComponent} from "../../shared/components/header/header.component";
import {ListComponent} from "./list/list.component";
import {NgForOf, NgIf} from "@angular/common";
import { ListHttpService} from "../../core/services/http/list-http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../core/services/alert/alert.service";
import {PostListComponent} from "../../shared/components/forms/list/post-list/post-list.component";
import {ThemeCommunicationService} from "../../core/services/communication/theme-communication.service";
import {IList} from "../../core/models/list.model";
import {ListCommunicationService} from "../../core/services/communication/list-communication.service";
import {BoardCommunicationService} from "../../core/services/communication/board-communication.service";
import {IBoard} from "../../core/models/board.model";
import {BoardHttpService} from "../../core/services/http/board-http.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {
  GenericInputTextComponent
} from "../../shared/components/inputs/generic-input-text/generic-input-text.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    HeaderComponent,
    ListComponent,
    NgForOf,
    PostListComponent,
    NgIf,
    ReactiveFormsModule,
    GenericInputTextComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  board: IBoard | undefined = undefined;

  constructor(private listHttpService: ListHttpService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private listCommunicationService: ListCommunicationService,
              private themeCommunicationService: ThemeCommunicationService,
              private boardCommunicationService: BoardCommunicationService,
              private boardHttpService: BoardHttpService,
              private router: Router) {}

  boardId: number = 0;
  lists: IList[] = [];

  ngOnInit(): void {
    this.boardId = Number(this.route.snapshot.paramMap.get('id'));
    this.GetLists();
    this.ChangeTheme();
    this.listCommunicationService.refreshLists$.subscribe(() => {
      this.GetLists();
    });
    this.themeCommunicationService.refreshTheme$.subscribe(() => {
      this.ChangeTheme();
    });
    this.boardCommunicationService.currentBoard.subscribe((board) => {
      this.board = board;
      if (this.board) {
        this.formBoard.controls['boardTitle'].setValue(this.board.boardTitle);
      }
    });

    this.formBoard.controls['boardTitle'].valueChanges.pipe(
      debounceTime(3000),
      distinctUntilChanged()
    ).subscribe(value => {
      this.UpdateBoard(value);
    });
  }

  ChangeTheme(){
    const color: string | null = localStorage.getItem("theme");
    const board: HTMLElement = document.querySelector('.board') as HTMLElement;
    if (color) {
      board.style.backgroundColor = color;
    }
  }

  GetLists(): void {
    this.listHttpService.GetLists(this.boardId).subscribe(
      (response: IList[]): void => {
        this.lists = response;
      },
      (error): void => {
        this.alertService.ErrorMessage('Error in the server. Verify the data entered.')
      }
    )
  }

  formBoard: FormGroup = new FormGroup({
    boardTitle: new FormControl('', [Validators.required]),
  });

  UpdateBoard(title: string): void {
      this.boardHttpService.UpdateBoard(this.boardId, title, '').subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully updated board.');
        },
        (error): void => {
          this.alertService.ErrorMessage('Error in the server. Please verify the data entered.')
        }
      )
    }

  DeleteBoard(): void {
    this.boardHttpService.DeleteBoard(this.boardId).subscribe(
      (response): void => {
        this.router.navigate([`/home`]);
        this.alertService.SuccessMessage('Successfully delete board.');
      },
      (error): void => {
        this.alertService.ErrorMessage('Error in the server. Please verify the data entered.')
      }
    )
  }

  OpenPostList(): void {
    const listForm: HTMLElement = document.querySelector('.post-list') as HTMLElement;
    listForm.style.display = 'flex';
  }
}
