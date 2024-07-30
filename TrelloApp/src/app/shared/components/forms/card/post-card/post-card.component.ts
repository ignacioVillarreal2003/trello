import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {GenericButtonComponent} from "../../../inputs/generic-button/generic-button.component";
import {GenericInputTextComponent} from "../../../inputs/generic-input-text/generic-input-text.component";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../core/services/alert/alert.service";
import {CardHttpService} from "../../../../../core/services/http/card-http.service";
import {ListCommunicationService} from "../../../../../core/services/communication/list-communication.service";
import {CardCommunicationService} from "../../../../../core/services/communication/card-communication.service";

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    FormsModule,
    GenericButtonComponent,
    GenericInputTextComponent,
    ReactiveFormsModule
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {

  constructor(private route: ActivatedRoute,
              private listCommunicationService: ListCommunicationService,
              private cardCommunicationService: CardCommunicationService,
              private cardHttpService: CardHttpService,
              private alertService: AlertService) {}

  listId: number = 0;

  ngOnInit(): void {
    this.listCommunicationService.currentListId.subscribe(id => {
      this.listId = id;
    });
  }

  formCard: FormGroup = new FormGroup({
    cardTitle: new FormControl('', [Validators.required]),
    start: new FormControl(new Date(), [Validators.required]),
    end: new FormControl(new Date(), [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  PostCard(): void {
    if (this.formCard.valid) {
      this.cardHttpService.PostCard(this.listId, this.formCard.value.cardTitle, this.formCard.value.start, this.formCard.value.end, this.formCard.value.description).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully created card.');
          this.cardCommunicationService.triggerRefreshCards();
          this.CloseWindow();
        },
        (error): void => {
          this.alertService.ErrorMessage('Error in the server. Please verify the data entered.')
        }
      );
    } else {
      this.alertService.ErrorMessage('Card error. Please verify the data entered.')
    }
  }

  CloseWindow(){
    const window: HTMLElement = document.querySelector('.post-card') as HTMLElement;
    window.style.display = 'none';
  }
}
