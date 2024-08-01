import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { GenericButtonComponent } from "../../shared/components/generic-button/generic-button.component";
import { GenericInputTextComponent } from "../../shared/components/generic-input-text/generic-input-text.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {NgClass} from "@angular/common";
import { Router } from '@angular/router';
import { AuthService} from "../../core/services/auth/auth.service";
import { AlertService} from "../../core/services/alert/alert.service";
import {UserHttpService} from "../../core/services/http/user-http.service";
import {UserService} from "../../core/services/user/user.service";

@Component({
  selector: 'app-user-access',
  standalone: true,
  imports: [
    RouterLink,
    GenericButtonComponent,
    GenericInputTextComponent,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css']
})
export class UserAccessComponent {

  constructor(private router: Router, private userHttpService: UserHttpService, private authService: AuthService, private alertService: AlertService, private userService: UserService) { }

  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  formRegister: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    username: new FormControl('', [Validators.required])
  });

  onSubmitLogin(): void {
    if (this.formLogin.valid) {
      this.userHttpService.Login(this.formLogin.value.email, this.formLogin.value.password).subscribe(
        (response): void => {
          this.authService.setToken(response);
          this.userService.email = this.formLogin.value.email;
          this.router.navigate(['/home']);
        },
        (error): void => {
          this.alertService.ErrorMessage('Error in the server. Please verify the data entered.')
        }
      );
    } else {
      this.alertService.ErrorMessage('User error. Please verify the data entered.')
    }
  }

  onSubmitRegister(): void {
    if (this.formRegister.valid) {
      this.userHttpService.Register(this.formRegister.value.email, this.formRegister.value.username, this.formRegister.value.password).subscribe(
        (response): void => {
          this.authService.setToken(response);
          this.userService.email = this.formRegister.value.email;
          this.router.navigate(['/home']);
        },
        (error): void => {
          this.alertService.ErrorMessage('Error in the server. Please verify the data entered.')
        }
      );
    } else {
      this.alertService.ErrorMessage('User error. Please verify the data entered.')
    }
  }

  modeLogin: boolean = true;

  ChangeMode(): void {
    if (this.modeLogin) {
      const contentRegister: HTMLElement = document.querySelector(".register") as HTMLElement;
      const contentLogin: HTMLElement = document.querySelector(".login") as HTMLElement;
      contentRegister.style.display = "flex";
      contentLogin.style.display = "none";
      this.modeLogin = false;
    } else {
      const contentRegister: HTMLElement = document.querySelector(".register") as HTMLElement;
      const contentLogin: HTMLElement = document.querySelector(".login") as HTMLElement;
      contentRegister.style.display = "none";
      contentLogin.style.display = "flex";
      this.modeLogin = true;
    }
  }
}
