import { Component } from '@angular/core';
import {GenericButtonComponent} from "../../../inputs/generic-button/generic-button.component";
import {GenericInputTextComponent} from "../../../inputs/generic-input-text/generic-input-text.component";
import {ThemeCommunicationService} from "../../../../../core/services/communication/theme-communication.service";

@Component({
  selector: 'app-change-theme',
  standalone: true,
  imports: [
    GenericButtonComponent,
    GenericInputTextComponent
  ],
  templateUrl: './change-theme.component.html',
  styleUrl: './change-theme.component.css'
})
export class ChangeThemeComponent {

  constructor(private themeCommunicationService: ThemeCommunicationService) {}

  ChangeTheme(theme: string): void {
    this.SaveTheme(theme);
    this.themeCommunicationService.triggerRefreshTheme();
    this.CloseWindow();
  }

  CloseWindow(): void {
    const window: HTMLElement = document.querySelector('#change-theme') as HTMLElement;
    const configurations: HTMLElement = document.querySelector('#user-configurations') as HTMLElement;
    window.style.display = 'none';
    configurations.style.display = 'none';
    configurations.setAttribute('data-view', 'false');
  }

  SaveTheme(theme: string): void {
    localStorage.setItem('theme', theme);
  }
}
