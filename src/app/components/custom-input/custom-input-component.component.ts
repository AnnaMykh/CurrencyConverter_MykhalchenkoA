import {Component, forwardRef, Input, Output, EventEmitter, numberAttribute} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [[NgClass, NgForOf, NgIf, FormsModule]],
  templateUrl: './custom-input-component.component.html',
  styleUrl: './custom-input-component.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomInputComponentComponent),
    multi: true
  }]
})
export class CustomInputComponentComponent implements ControlValueAccessor {
  @Input({transform: numberAttribute}) min: number = 1;
  @Input({transform: numberAttribute}) step: number = 1;
  @Output() amountChange = new EventEmitter<number>();
  value: number | undefined;

  onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  onInputChange(value: number) {
    this.value = value;
    this.onChange(value);
    this.amountChange.emit(value);
  }

  onBlur() {
    this.onTouched();
  }
}
