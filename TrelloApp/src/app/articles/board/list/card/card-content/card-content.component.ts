import { Component, OnInit } from '@angular/core';
import { ICard } from "../../../../../core/models/card.model";
import {NgForOf, NgIf} from "@angular/common";
import { CardCommunicationService } from "../../../../../core/services/communication/card-communication.service";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CardHttpService } from "../../../../../core/services/http/card-http.service";
import { AlertService } from "../../../../../core/services/alert/alert.service";
import { HttpResponse } from "@angular/common/http";
import { debounceTime, distinctUntilChanged } from 'rxjs';
import {CommentHttpService} from "../../../../../core/services/http/comment-http.service";
import {IComment} from "../../../../../core/models/comment.model";
import {FormPostCommentComponent} from "../../../../../shared/components/forms/form-post-comment/form-post-comment.component";
import {
  CommentCommunicationServiceService
} from "../../../../../core/services/communication/comment-communication-service.service";
import {IUser} from "../../../../../core/models/user.model";
import {CardUserHttpService} from "../../../../../core/services/http/card-user-http.service";
import {CardUserCommunicationService} from "../../../../../core/services/communication/card-user-communication.service";
import {
  FormPostCardUserComponent
} from "../../../../../shared/components/forms/form-post-card-user/form-post-card-user.component";
import {ILabel} from "../../../../../core/models/label.model";
import {LabelCommunicationService} from "../../../../../core/services/communication/label-communication.service";
import {FormPostLabelComponent} from "../../../../../shared/components/forms/form-post-label/form-post-label.component";
import {CardLabelHttpService} from "../../../../../core/services/http/card-label-http.service";

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    FormPostCommentComponent,
    NgForOf,
    FormPostCardUserComponent,
    FormPostLabelComponent
  ],
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css']
})
export class CardContentComponent implements OnInit {
  card: ICard | undefined = undefined;
  comments: IComment[] = [];
  users: IUser[] = [];
  labels: ILabel[] = []

  formUpdateTitleCard: FormGroup | undefined = undefined;
  formUpdateEndCard: FormGroup | undefined = undefined;
  formUpdateDescriptionCard: FormGroup | undefined = undefined;

  constructor(private cardCommunicationService: CardCommunicationService,
              private cardHttpService: CardHttpService,
              private alertService: AlertService,
              private commentHttpService: CommentHttpService,
              private commentCommunicationServiceService: CommentCommunicationServiceService,
              private cardUserHttpService: CardUserHttpService,
              private cardUserCommunicationService: CardUserCommunicationService,
              private labelCommunicationService: LabelCommunicationService,
              private cardLabelHttpService: CardLabelHttpService) {}

  ngOnInit(): void {
    this.initializeForms();

    this.cardCommunicationService.currentCard.subscribe((card: ICard): void => {
      this.card = card;
      this.setFormValues();
      this.GetComments();
      this.GetCardUsers();
      this.GetLabels();
    });

    this.commentCommunicationServiceService.refreshComments$.subscribe(() => {
      this.GetComments()
    });

    this.cardUserCommunicationService.refreshCardUsers$.subscribe(() => {
      this.GetCardUsers()
    });

    this.labelCommunicationService.refreshLabels$.subscribe(() => {
      this.GetLabels()
    });

  }

  initializeForms(): void {
    this.formUpdateTitleCard = new FormGroup({
      cardTitle: new FormControl('', [Validators.required])
    });

    this.formUpdateEndCard = new FormGroup({
      end: new FormControl('', [Validators.required])
    });

    this.formUpdateDescriptionCard = new FormGroup({
      description: new FormControl('', [Validators.required])
    });

    this.subscribeToFormChanges();
  }

  subscribeToFormChanges(): void {
    this.formUpdateTitleCard?.controls['cardTitle'].valueChanges.pipe(
      debounceTime(3000),
      distinctUntilChanged()
    ).subscribe(value => {
      this.UpdateCard({ cardTitle: value });
    });

    this.formUpdateEndCard?.controls['end'].valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(value => {
      this.UpdateCard({ end: value });
    });

    this.formUpdateDescriptionCard?.controls['description'].valueChanges.pipe(
      debounceTime(3000),
      distinctUntilChanged()
    ).subscribe(value => {
      this.UpdateCard({ description: value });
    });
  }

  setFormValues(): void {
    if (this.card) {
      this.formUpdateTitleCard?.controls['cardTitle'].setValue(this.card.cardTitle, { emitEvent: false });
      this.formUpdateEndCard?.controls['end'].setValue(this.formatDate(this.card.end), { emitEvent: false });
      this.formUpdateDescriptionCard?.controls['description'].setValue(this.card.description, { emitEvent: false });
    }
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toISOString().substring(0, 16);
  }

  UpdateCard(updatedFields: Partial<ICard>): void {
    if (this.card) {
      const updatedCard = { ...this.card, ...updatedFields };
      let end;
      if (updatedCard.end?.length > 0) {
        end = new Date(updatedCard.end);
      } else {
        end = undefined;
      }
      this.cardHttpService.UpdateCard(this.card.id, updatedCard.cardTitle, end, updatedCard.description).subscribe(
        (response): void => {
          this.cardCommunicationService.triggerRefreshCards();
          this.alertService.SuccessMessage('Successfully updated card.');
        },
        (error): void => {
          this.alertService.ErrorMessage('Error in the server. Please verify the data entered.');
        }
      );
    }
  }

  CloseWindow() {
    const window: HTMLElement = document.querySelector('.card-content') as HTMLElement;
    window.style.display = 'none';
  }

  DeleteCard(): void {
    if (this.card) {
      this.cardHttpService.DeleteCard(this.card.id).subscribe(
        (response: HttpResponse<any>): void => {
          this.alertService.SuccessMessage('Card successfully eliminated.');
          this.cardCommunicationService.triggerRefreshCards();
        },
        (error: Error): void => {
          this.alertService.ErrorMessage('Error in the server. The list could not be deleted.');
        }
      );
    } else {
      this.alertService.ErrorMessage('Internal error in the application. Try again later.');
    }
  }

  OpenPostComment(): void {
    const form: HTMLElement = document.querySelector('#form-post-comment') as HTMLElement;
    form.style.display = 'flex';
  }

  GetComments(): void {
    if (this.card){
      this.commentHttpService.GetComments(this.card.id).subscribe(
        (response: IComment[]): void => {
          this.comments = response;
        },
        (error: Error): void => {
          this.alertService.ErrorMessage("adsd")
        }
      )
    }
  }

  OpenPostCardUsers(): void {
    const form: HTMLElement = document.querySelector('#form-post-card-user') as HTMLElement;
    form.style.display = 'flex';
  }

  GetCardUsers(): void {
    if (this.card){
      this.cardUserHttpService.GetCardUser(this.card.id).subscribe(
        (response: IUser[]): void => {
          this.users = response;
        },
        (error: Error): void => {
          this.alertService.ErrorMessage("adsd")
        }
      )
    }
  }

  OpenPostLabel(): void {
    const form: HTMLElement = document.querySelector('#form-post-label') as HTMLElement;
    form.style.display = 'flex';
  }

  GetLabels(): void {
    if (this.card){
      this.cardLabelHttpService.GetCardLabel(this.card.id).subscribe(
        (response: ILabel[]): void => {
          this.labels = response;
        },
        (error: Error): void => {
          this.alertService.ErrorMessage("adsd")
        }
      )
    }
  }
}
