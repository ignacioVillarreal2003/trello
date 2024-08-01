import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {GenericButtonComponent} from "../../shared/components/generic-button/generic-button.component";
import {BasicPreViewCardComponent} from "../../shared/components/basic-pre-view-card/basic-pre-view-card.component";
import {RouterLink} from "@angular/router";
import {PresentationComponent} from "./presentation/presentation.component";
import {TeamsSectionComponent} from "./teams-section/teams-section.component";
import {BoardsSectionComponent} from "./boards-section/boards-section.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, NgOptimizedImage, GenericButtonComponent, BasicPreViewCardComponent, NgForOf, RouterLink, PresentationComponent, TeamsSectionComponent, BoardsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  SelectOption(event: Event) {
    const target: HTMLElement = event.target as HTMLElement;
    const buttons: NodeListOf<HTMLElement> = document.querySelectorAll(".options button") as NodeListOf<HTMLElement>;
    buttons.forEach(btn => btn.setAttribute('data-selected', 'false'));
    target.setAttribute('data-selected', 'true');
  }

  ChangeMode(n: number){
    const presentation: HTMLElement = document.querySelector("#presentation") as HTMLElement;
    const teamsSection: HTMLElement = document.querySelector("#teams-section") as HTMLElement;
    const boardsSection: HTMLElement = document.querySelector('#boards-section') as HTMLElement;
    if (n == 1){
      presentation.style.display = "flex";
      teamsSection.style.display = "none";
    } else if (n == 2){
      presentation.style.display = "none";
      teamsSection.style.display = "flex";
    }
    boardsSection.style.display = 'none';
  }
}
