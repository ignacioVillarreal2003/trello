import {Component, forwardRef, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-generic-input-text',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './generic-input-text.component.html',
  styleUrl: './generic-input-text.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInputTextComponent),
      multi: true
    }
  ]
})
export class GenericInputTextComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'password' | 'date' = 'text';
  @Input() size: 'free' | 'small' | 'medium' | 'large' = 'medium';
  @Input() placeholder: string = '';

  value: string = '';

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onInput(event: any): void {
    const value = event.target.value;
    this.value = value;
    this.onChange(value);
    this.onTouch();
  }
}
