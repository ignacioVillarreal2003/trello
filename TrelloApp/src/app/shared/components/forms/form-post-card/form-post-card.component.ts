import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {GenericButtonComponent} from "../../generic-button/generic-button.component";
import {
  GenericInputTextComponent
} from "../../generic-input-text/generic-input-text.component";
import {ActivatedRoute} from "@angular/router";
import {ListCommunicationService} from "../../../../core/services/communication/list-communication.service";
import {CardCommunicationService} from "../../../../core/services/communication/card-communication.service";
import {CardHttpService} from "../../../../core/services/http/card-http.service";
import {AlertService} from "../../../../core/services/alert/alert.service";
import {IList} from "../../../../core/models/list.model";

@Component({
  selector: 'app-form-post-card',
  standalone: true,
  imports: [
    FormsModule,
    GenericButtonComponent,
    GenericInputTextComponent,
    ReactiveFormsModule
  ],
  templateUrl: './form-post-card.component.html',
  styleUrl: './form-post-card.component.css'
})
export class FormPostCardComponent {
  constructor(private route: ActivatedRoute,
              private listCommunicationService: ListCommunicationService,
              private cardCommunicationService: CardCommunicationService,
              private cardHttpService: CardHttpService,
              private alertService: AlertService) {}

  list: IList | undefined = undefined;

  ngOnInit(): void {
    this.listCommunicationService.currentList.subscribe(list => {
      this.list = list;
    });
  }

  formCard: FormGroup = new FormGroup({
    cardTitle: new FormControl('', [Validators.required]),
    start: new FormControl(new Date(), [Validators.required]),
    end: new FormControl(new Date(), [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  PostCard(): void {
    if (this.formCard.valid && this.list) {
      this.cardHttpService.PostCard(this.list.id, this.formCard.value.cardTitle, this.formCard.value.start, this.formCard.value.end, this.formCard.value.description).subscribe(
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

  CloseWindow(): void {
    const base: HTMLElement = document.querySelector('#forms-content') as HTMLElement;
    base.style.display = "none";
    const window: HTMLElement = document.querySelector('#form-post-card') as HTMLElement;
    window.style.display = 'none';
  }
}
