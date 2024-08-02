import {Component, Input} from '@angular/core';
import {CardComponent} from "./card/card.component";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import { AlertService} from "../../../core/services/alert/alert.service";
import {CardHttpService} from "../../../core/services/http/card-http.service";
import {ICard} from "../../../core/models/card.model";
import {CardCommunicationService} from "../../../core/services/communication/card-communication.service";
import {ListCommunicationService} from "../../../core/services/communication/list-communication.service";
import {IList} from "../../../core/models/list.model";
import {ListHttpService} from "../../../core/services/http/list-http.service";
import {HttpResponse} from "@angular/common/http";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {FormPostCardComponent} from "../../../shared/components/forms/form-post-card/form-post-card.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    FormPostCardComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() list: IList | undefined = undefined;
  cards: ICard[] = [];

  constructor(private cardHttpService: CardHttpService,
              private cardCommunicationService: CardCommunicationService,
              private listCommunicationService: ListCommunicationService,
              private listHttpService: ListHttpService,
              private alertService: AlertService) {}

  ngOnInit(): void {
    this.InitializeGetCards();
    this.InitializeUpdateList();
  }

  /* POST CARD */
  OpenPostCard(): void {
    if (this.list) {
      const form: HTMLElement = document.querySelector('#form-post-card') as HTMLElement;
      form.style.display = 'flex';
      this.listCommunicationService.changeList(this.list);
    }
  }

  /* GET CARD */
  InitializeGetCards(): void {
    this.GetCards();
    this.cardCommunicationService.refreshCards$.subscribe(() => {
      this.GetCards();
    });
  }

  GetCards(): void {
    if (this.list) {
      this.cardHttpService.GetCards(this.list.id).subscribe(
        (response: ICard[]): void => {
          this.cards = response;
        },
        (error: Error): void => {
          this.alertService.ErrorMessage('Error in the server. Unable to obtain the cards.')
        }
      )
    } else {
      this.alertService.ErrorMessage('Internal error in the application. Try again later.')
    }
  }

  /* DELETE LIST*/
  DeleteList(): void {
    if (this.list) {
      this.listHttpService.DeleteList(this.list.id).subscribe(
        (response: HttpResponse<any>): void => {
          this.alertService.SuccessMessage('List successfully eliminated.')
          this.listCommunicationService.triggerRefreshLists();
        },
        (error: Error): void => {
          this.alertService.ErrorMessage('Error in the server. The list could not be deleted.')
        }
      )
    } else {
      this.alertService.ErrorMessage('Internal error in the application. Try again later.')
    }
  }

  /* UPDATE LIST */
  InitializeUpdateList(): void {
    if (this.list) {
      this.formUpdateList.controls['listTitle'].setValue(this.list.listTitle);
    }
    this.formUpdateList.controls['listTitle'].valueChanges.pipe(
      debounceTime(3000),
      distinctUntilChanged()
    ).subscribe(value => {
      this.UpdateList(value);
    });
  }

  formUpdateList: FormGroup = new FormGroup({
    listTitle: new FormControl('', [Validators.required]),
  });

  UpdateList(listTitle: string): void {
    if (this.list) {
      this.listHttpService.UpdateList(this.list.id, listTitle).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully updated board.');
        },
        (error): void => {
          this.alertService.ErrorMessage('Error in the server. Please verify the data entered.')
        }
      )
    }
  }
}
