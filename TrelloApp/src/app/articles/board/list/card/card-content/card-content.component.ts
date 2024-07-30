import {Component, Input} from '@angular/core';
import {ICard} from "../../../../../core/models/card.model";
import {NgIf} from "@angular/common";
import {CardCommunicationService} from "../../../../../core/services/communication/card-communication.service";

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './card-content.component.html',
  styleUrl: './card-content.component.css'
})
export class CardContentComponent {
  card: ICard | undefined = undefined;

  constructor(private cardCommunicationService: CardCommunicationService,) {}

  ngOnInit(): void {
    this.cardCommunicationService.currentCard.subscribe(card => {
      this.card = card;
    });
  }

  CloseWindow(){
    const window: HTMLElement = document.querySelector('.card-content') as HTMLElement;
    window.style.display = 'none';
  }
}
