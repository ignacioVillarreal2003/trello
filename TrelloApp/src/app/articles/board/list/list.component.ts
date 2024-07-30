import {Component, Input} from '@angular/core';
import {CardComponent} from "./card/card.component";
import {NgForOf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import { AlertService} from "../../../core/services/alert/alert.service";
import {CardHttpService} from "../../../core/services/http/card-http.service";
import {PostCardComponent} from "../../../shared/components/forms/card/post-card/post-card.component";
import {ICard} from "../../../core/models/card.model";
import {CardCommunicationService} from "../../../core/services/communication/card-communication.service";
import {ListCommunicationService} from "../../../core/services/communication/list-communication.service";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    PostCardComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() list: any;

  cards: ICard[] = [];

  constructor(private cardHttpService: CardHttpService,
              private cardCommunicationService: CardCommunicationService,
              private listCommunicationService: ListCommunicationService,
              private route: ActivatedRoute,
              private alertService: AlertService) {}

  ngOnInit(): void {
    this.GetCards();
    this.cardCommunicationService.refreshCards$.subscribe(() => {
      this.GetCards();
    });
  }

  GetCards(): void {
    this.cardHttpService.GetCards(this.list.id).subscribe(
      (response: ICard[]): void => {
        this.cards = response;
      },
      (error): void => {
        this.alertService.ErrorMessage('Error in the server. Verify the data entered.')
      }
    )
  }

  OpenPostCard(listId: number): void {
    const listForm: HTMLElement = document.querySelector('.post-card') as HTMLElement;
    listForm.style.display = 'flex';
    this.listCommunicationService.changeListId(listId);
  }
}
