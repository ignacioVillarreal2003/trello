import {Component, Input} from '@angular/core';
import { ChangePasswordComponent } from "./change-password/change-password.component";
import {Router, RouterLink} from "@angular/router";
import {ChangeThemeComponent} from "./change-theme/change-theme.component";
import {UserService} from "../../../../core/services/user/user.service";
import {UserHttpService} from "../../../../core/services/http/user-http.service";
import {AlertService} from "../../../../core/services/alert/alert.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ThemeCommunicationService} from "../../../../core/services/communication/theme-communication.service";

@Component({
  selector: 'app-user-configurations',
  standalone: true,
  imports: [
    RouterLink,
    ChangePasswordComponent,
    ChangeThemeComponent
  ],
  templateUrl: './user-configurations.component.html',
  styleUrl: './user-configurations.component.css'
})
export class UserConfigurationsComponent {
  @Input() username: string = "";
  @Input() email: string = "";

  constructor(private userService: UserService,
              private router: Router,
              private userHttpService: UserHttpService,
              private alertService: AlertService,
              private themeCommunicationService: ThemeCommunicationService) {}

  ngOnInit(): void {
    this.ChangeTheme();
    this.themeCommunicationService.refreshTheme$.subscribe(() => {
      this.ChangeTheme();
    })
  }

  ChangeTheme(){
    const color: string | null = localStorage.getItem("theme");
    const icon: HTMLElement = document.querySelector('#perfil-icon-2') as HTMLElement;
    if (color) {
      icon.style.backgroundColor = color;
    }
  }

  OpenChangePassword(): void {
    const form: HTMLElement = document.querySelector('#change-password') as HTMLElement;
    form.style.display = "flex";
  }

  OpenChangeTheme(): void {
    const form: HTMLElement = document.querySelector('#change-theme') as HTMLElement;
    form.style.display = "flex";
  }

  async DeleteUser() {
    const confirmed: boolean = await this.alertService.PreConfirm("Do you want to delete the account?");
    if (confirmed) {
      this.userHttpService.DeleteUser(this.email).subscribe(
        (response): void => {
          this.alertService.SuccessMessage('Successfully deleted');
          this.Logout();
        },
        (error: HttpErrorResponse): void => {
          this.alertService.ErrorMessage('Error in the server. Try again later.');
        }
      );
    }
  }

  Logout(): void {
    this.userService.email = '';
    this.userService.username = '';
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
