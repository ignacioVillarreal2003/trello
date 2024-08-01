import { Component } from '@angular/core';
import {BasicPreViewCardComponent} from "../shared/components/basic-pre-view-card/basic-pre-view-card.component";
import {GenericButtonComponent} from "../shared/components/generic-button/generic-button.component";
import {NgForOf, NgIf} from "@angular/common";
import {ITeam} from "../core/models/team.model";
import {BoardsSectionComponent} from "../articles/home/boards-section/boards-section.component";
import {PresentationComponent} from "../articles/home/presentation/presentation.component";
import {TeamsSectionComponent} from "../articles/home/teams-section/teams-section.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListComponent} from "../articles/board/list/list.component";
import {HeaderComponent} from "../shared/components/header/header.component";
import {IBoard} from "../core/models/board.model";
import {IList} from "../core/models/list.model";

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [
    BasicPreViewCardComponent,
    GenericButtonComponent,
    NgForOf,
    BoardsSectionComponent,
    PresentationComponent,
    TeamsSectionComponent,
    FormsModule,
    ListComponent,
    NgIf,
    ReactiveFormsModule,
    HeaderComponent,
  ],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {

  board: IBoard = {
    id: 0,
    boardTitle: "titulo 1",
    teamId: 2,
    theme: "skyblue"
  };

  lists: IList[] = [
    {
      id: 1,
      listTitle: "lista 1",
      boardId: 1,
    },
    {
      id: 1,
      listTitle: "lista 1",
      boardId: 1,
    },{
      id: 1,
      listTitle: "lista 1",
      boardId: 1,
    },{
      id: 1,
      listTitle: "lista 1",
      boardId: 1,
    },{
      id: 1,
      listTitle: "lista 1",
      boardId: 1,
    },
    {
      id: 1,
      listTitle: "lista 1",
      boardId: 1,
    },
    {
      id: 1,
      listTitle: "lista 1",
      boardId: 1,
    },{
      id: 1,
      listTitle: "lista 1",
      boardId: 1,
    },{
      id: 1,
      listTitle: "lista 1",
      boardId: 1,
    },{
      id: 1,
      listTitle: "lista 1",
      boardId: 1,
    },{
      id: 1,
      listTitle: "lista 1",
      boardId: 1,
    },{
      id: 1,
      listTitle: "lista 1",
      boardId: 1,
    },



  ];

}
