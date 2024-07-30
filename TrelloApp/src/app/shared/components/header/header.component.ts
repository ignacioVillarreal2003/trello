import { Component } from '@angular/core';
import { UserConfigurationsComponent } from "./user-configurations/user-configurations.component";
import {ChangeThemeComponent} from "./user-configurations/change-theme/change-theme.component";
import {UserService} from "../../../core/services/user/user.service";
import {UserHttpService} from "../../../core/services/http/user-http.service";
import {IUser} from "../../../core/models/user.model";
import {AlertService} from "../../../core/services/alert/alert.service";
import {ThemeCommunicationService} from "../../../core/services/communication/theme-communication.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserConfigurationsComponent, ChangeThemeComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  username: string = "";
  email: string = "";

  constructor(private userService: UserService,
              private userHttpService: UserHttpService,
              private alertService: AlertService,
              private themeCommunicationService: ThemeCommunicationService) {}

  ngOnInit(): void {
    this.GetUser();
    this.ChangeTheme();
    this.themeCommunicationService.refreshTheme$.subscribe(() => {
      this.ChangeTheme();
    })
  }

  ChangeTheme(){
    const color: string | null = localStorage.getItem("theme");
    const icon: HTMLElement = document.querySelector('#perfil-icon-1') as HTMLElement;
    if (color) {
      icon.style.backgroundColor = color;
    }
  }

  GetUser(){
    this.userHttpService.GetUser(this.userService.email).subscribe(
      (response: IUser): void => {
        this.userService.username = response.username;
        this.username = response.username;
        this.email = this.userService.email;
      },
      (error): void => {
        this.alertService.ErrorMessage('Error in the server. User not found.')
      })
  }

  OpenConfigurations(){
    const configurations = document.querySelector("#user-configurations") as HTMLElement;
    if (configurations.getAttribute("data-view") == "false") {
      configurations.setAttribute('data-view', 'true');
      configurations.style.display = "flex";
    } else if (configurations.getAttribute("data-view") == "true") {
      configurations.setAttribute('data-view', 'false');
      configurations.style.display = "none";
    }
  }
}
