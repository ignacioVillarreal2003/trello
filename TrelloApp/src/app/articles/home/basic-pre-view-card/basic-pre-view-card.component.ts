import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-basic-pre-view-card',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './basic-pre-view-card.component.html',
  styleUrl: './basic-pre-view-card.component.css'
})
export class BasicPreViewCardComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() text: string = '';
  @Input() color: string = 'skyblue';
}
