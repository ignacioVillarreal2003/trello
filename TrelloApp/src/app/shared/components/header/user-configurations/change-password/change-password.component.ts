import { Component } from '@angular/core';
import {GenericInputTextComponent} from "../../../generic-input-text/generic-input-text.component";
import {GenericButtonComponent} from "../../../generic-button/generic-button.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AlertService} from "../../../../../core/services/alert/alert.service";
import {UserService} from "../../../../../core/services/user/user.service";
import {UserHttpService} from "../../../../../core/services/http/user-http.service";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    GenericInputTextComponent,
    GenericButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  constructor(private userHttpService: UserHttpService, private alertService: AlertService, private userService: UserService) {}

  formChangePassword: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  OnSubmitChange(): void {
    if (this.formChangePassword.valid) {
      this.userHttpService.UpdateUser(this.userService.email, '', this.formChangePassword.value.password).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Password successfully changed')
        },
        (error): void => {
          this.alertService.ErrorMessage('Error in the server. Try again later.')
        }
      );
    } else {
      this.alertService.ErrorMessage('Error in the data entered.')
    }
  }

  CloseWindow(){
    const window: HTMLElement = document.querySelector('#change-password') as HTMLElement;
    const configurations: HTMLElement = document.querySelector('#user-configurations') as HTMLElement;
    window.style.display = 'none';
    configurations.style.display = 'none';
    configurations.setAttribute('data-view', 'false');
  }
}
