import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {GenericButtonComponent} from "../../generic-button/generic-button.component";
import {GenericInputTextComponent} from "../../generic-input-text/generic-input-text.component";
import {ICard} from "../../../../core/models/card.model";
import {CardCommunicationService} from "../../../../core/services/communication/card-communication.service";
import {CardHttpService} from "../../../../core/services/http/card-http.service";
import {AlertService} from "../../../../core/services/alert/alert.service";
import {CommentHttpService} from "../../../../core/services/http/comment-http.service";
import {
  CommentCommunicationServiceService
} from "../../../../core/services/communication/comment-communication-service.service";
import {LabelHttpService} from "../../../../core/services/http/label-http.service";
import {CardLabelHttpService} from "../../../../core/services/http/card-label-http.service";
import {LabelCommunicationService} from "../../../../core/services/communication/label-communication.service";

@Component({
  selector: 'app-form-post-label',
  standalone: true,
  imports: [
    FormsModule,
    GenericButtonComponent,
    GenericInputTextComponent,
    ReactiveFormsModule
  ],
  templateUrl: './form-post-label.component.html',
  styleUrl: './form-post-label.component.css'
})
export class FormPostLabelComponent {
  card: ICard | undefined = undefined;

  constructor(private cardCommunicationService: CardCommunicationService,
              private cardHttpService: CardHttpService,
              private alertService: AlertService,
              private labelHttpService: LabelHttpService,
              private cardLabelHttpService: CardLabelHttpService,
              private labelCommunicationService: LabelCommunicationService,) {}

  ngOnInit(): void {
    this.cardCommunicationService.currentCard.subscribe(card => {
      this.card = card;
    });
  }

  formPostLabel: FormGroup = new FormGroup({
    labelTitle: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
  });

  PostLabel(): void {
    if (this.formPostLabel.valid && this.card){
      this.labelHttpService.PostLabel(this.formPostLabel.value.labelTitle, this.formPostLabel.value.color).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully added label.');
          this.PostCardLabel(this.formPostLabel.value.labelTitle, this.formPostLabel.value.color)
        },
        (error: Error): void => {
          this.alertService.ErrorMessage('Error in the server. Please verify the data entered.')
        }
      )
    } else {
      this.alertService.ErrorMessage('Team error. Please verify the data entered.')
    }
  }

  PostCardLabel(labelTitle: string, color: string): void {
    if (this.card){
      this.cardLabelHttpService.PostCardLabel(this.card.id, labelTitle, color).subscribe(
        (response): void => {
          this.labelCommunicationService.triggerRefreshLabels();
          this.CloseWindow();
        },
        (error: Error): void => {
          this.alertService.ErrorMessage('Error in the server. Please verify the data entered.')
        }
      )
    }
  }

  CloseWindow(): void {
    const base: HTMLElement = document.querySelector('#forms-content') as HTMLElement;
    base.style.display = "none";
    const window: HTMLElement = document.querySelector('#form-post-label') as HTMLElement;
    window.style.display = 'none';
  }
}
