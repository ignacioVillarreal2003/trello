import {Component, Input} from '@angular/core';
import {ICard} from "../../../../core/models/card.model";
import {NgIf} from "@angular/common";
import {CardContentComponent} from "./card-content/card-content.component";
import {CardCommunicationService} from "../../../../core/services/communication/card-communication.service";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf,
    CardContentComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() card: ICard | undefined = undefined;

  constructor(private cardCommunicationService: CardCommunicationService) {}

  OpenCard() {
    if (this.card){
      this.cardCommunicationService.changeCard(this.card);
      const cardContent: HTMLElement = document.querySelector('.card-content') as HTMLElement;
      cardContent.style.display = 'flex';
    }
  }
}
