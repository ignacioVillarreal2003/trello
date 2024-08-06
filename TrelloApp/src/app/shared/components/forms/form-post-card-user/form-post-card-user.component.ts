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
import {CardUserHttpService} from "../../../../core/services/http/card-user-http.service";
import {CardUserCommunicationService} from "../../../../core/services/communication/card-user-communication.service";
import {IUser} from "../../../../core/models/user.model";
import {UserHttpService} from "../../../../core/services/http/user-http.service";
import {NgForOf} from "@angular/common";
import {ILabel} from "../../../../core/models/label.model";

@Component({
  selector: 'app-form-post-card-user',
  standalone: true,
  imports: [
    FormsModule,
    GenericButtonComponent,
    GenericInputTextComponent,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './form-post-card-user.component.html',
  styleUrl: './form-post-card-user.component.css'
})
export class FormPostCardUserComponent {
  card: ICard | undefined = undefined;
  users: IUser[] = []

  constructor(private cardCommunicationService: CardCommunicationService,
              private cardUserCommunicationService: CardUserCommunicationService,
              private cardHttpService: CardHttpService,
              private alertService: AlertService,
              private cardUserHttpService: CardUserHttpService,
              private commentCommunicationService: CommentCommunicationServiceService,
              private userHttpService: UserHttpService) {}

  ngOnInit(): void {
    this.cardCommunicationService.currentCard.subscribe(card => {
      this.card = card;
    });
    this.GetUsers();
  }

  GetUsers(){
    this.userHttpService.GetUsers().subscribe(
      (response): void => {
        this.users = response;
      },
      (err: Error) => {
        this.alertService.ErrorMessage('Error in getUsers');
      }
    )
  }

  formPostCardUser: FormGroup = new FormGroup({
    userEmail: new FormControl('', [Validators.required]),
  });

  PostCardUser(): void {
    if (this.formPostCardUser.valid && this.card){
      this.cardUserHttpService.PostCardUser(this.card.id, this.formPostCardUser.value.userEmail).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully added user.');
          this.cardUserCommunicationService.triggerRefreshCardUsers();
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

  CloseWindow(): void {
    const base: HTMLElement = document.querySelector('#forms-content') as HTMLElement;
    base.style.display = "none";
    const window: HTMLElement = document.querySelector('#form-post-card-user') as HTMLElement;
    window.style.display = 'none';
  }
}
