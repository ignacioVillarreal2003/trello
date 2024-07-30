import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserAccessComponent } from "./articles/user-access/user-access.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { HomeComponent } from "./articles/home/home.component";
import {ChangePasswordComponent} from "./shared/components/header/user-configurations/change-password/change-password.component";
import {ListComponent} from "./articles/board/list/list.component";
import {BoardComponent} from "./articles/board/board.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, UserAccessComponent, HeaderComponent, HomeComponent, ChangePasswordComponent, ListComponent, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TrelloApp';
}
