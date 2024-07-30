import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {GenericButtonComponent} from "../../../inputs/generic-button/generic-button.component";
import {GenericInputTextComponent} from "../../../inputs/generic-input-text/generic-input-text.component";
import {AlertService} from "../../../../../core/services/alert/alert.service";
import {ActivatedRoute} from "@angular/router";
import {ListHttpService} from "../../../../../core/services/http/list-http.service";
import {ListCommunicationService} from "../../../../../core/services/communication/list-communication.service";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    FormsModule,
    GenericButtonComponent,
    GenericInputTextComponent,
    ReactiveFormsModule
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  constructor(private route: ActivatedRoute,
              private listCommunicationService: ListCommunicationService,
              private listHttpService: ListHttpService,
              private alertService: AlertService) {}

  formList: FormGroup = new FormGroup({
    listTitle: new FormControl('', [Validators.required]),
  });

  PostList(): void {
    if (this.formList.valid) {
      const id: number = Number(this.route.snapshot.paramMap.get('id'))
      this.listHttpService.PostList(id, this.formList.value.listTitle).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully created list.');
          this.listCommunicationService.triggerRefreshLists();
          this.CloseWindow();
        },
        (error): void => {
          this.alertService.ErrorMessage('Error in the server. Please verify the data entered.')
        }
      );
    } else {
      this.alertService.ErrorMessage('List error. Please verify the data entered.')
    }
  }

  CloseWindow(){
    const window: HTMLElement = document.querySelector('.post-list') as HTMLElement;
    window.style.display = 'none';
  }
}
