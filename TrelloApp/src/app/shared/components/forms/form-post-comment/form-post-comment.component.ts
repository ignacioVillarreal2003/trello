import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CardCommunicationService} from "../../../../core/services/communication/card-communication.service";
import {CardHttpService} from "../../../../core/services/http/card-http.service";
import {AlertService} from "../../../../core/services/alert/alert.service";
import {CommentHttpService} from "../../../../core/services/http/comment-http.service";
import {ICard} from "../../../../core/models/card.model";
import {CommentCommunicationServiceService} from "../../../../core/services/communication/comment-communication-service.service";
import {GenericButtonComponent} from "../../generic-button/generic-button.component";
import {GenericInputTextComponent} from "../../generic-input-text/generic-input-text.component";

@Component({
  selector: 'app-form-post-comment',
  standalone: true,
  imports: [
    FormsModule,
    GenericButtonComponent,
    GenericInputTextComponent,
    ReactiveFormsModule
  ],
  templateUrl: './form-post-comment.component.html',
  styleUrl: './form-post-comment.component.css'
})
export class FormPostCommentComponent {

  card: ICard | undefined = undefined;

  constructor(private cardCommunicationService: CardCommunicationService,
              private cardHttpService: CardHttpService,
              private alertService: AlertService,
              private commentHttpService: CommentHttpService,
              private commentCommunicationService: CommentCommunicationServiceService,) {}

  ngOnInit(): void {
    this.cardCommunicationService.currentCard.subscribe(card => {
      this.card = card;
    });
  }

  formPostComment: FormGroup = new FormGroup({
    commentDescription: new FormControl('', [Validators.required]),
  });

  PostComment(): void {
    if (this.formPostComment.valid && this.card){
      this.commentHttpService.PostComment(this.formPostComment.value.commentDescription, new Date(), this.card.id).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully added team.');
          this.commentCommunicationService.triggerRefreshComments();
          this.CloseWindow();
        },
        (error: Error): void => {
          this.alertService.ErrorMessage('Error in the server. Please verify the data entered.')
        }
      )
    } else {
      this.alertService.ErrorMessage('Team error. Please verify the data entered.')
    }
  }

  CloseWindow(){
    const window: HTMLElement = document.querySelector('#form-post-comment') as HTMLElement;
    window.style.display = 'none';
  }
}
