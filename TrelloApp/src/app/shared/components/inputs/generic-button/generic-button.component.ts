import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.css'
})
export class GenericButtonComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: 'primary' | 'secondary' | 'success' | 'danger' | 'light' | 'dark' = 'danger';
  @Input() text: string = 'Button';
  @Input() buttonType: string = 'button';
}
