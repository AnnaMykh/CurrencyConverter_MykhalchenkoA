import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

interface selectOption {
  title: string;
  value: string;
}

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [NgClass, NgForOf, NgIf, FormsModule],
  templateUrl: './custom-select-component.component.html',
  styleUrl: './custom-select-component.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomSelectComponentComponent),
    multi: true
  }]
})


export class CustomSelectComponentComponent implements ControlValueAccessor{
  @Input() options: selectOption[] = [];
  selectedOption: selectOption | undefined;
  get placeholder():string{
    return this.selectedOption && this.selectedOption.hasOwnProperty('title') ? this.selectedOption.title : 'USD';
  }
  value: string = '';
  open: boolean = false;

  optionSelect(option:selectOption) {
    this.writeValue(option.value);
    this.onTouched();
    this.open = false;
  }

  toggleOpen() {
    this.open = !this.open;
  }

  get isOpen(): boolean {
    return this.open;
  }

  writeValue(value: any) {
    if(!value || typeof value !== 'string') {
      return
    }
    const selectedEl = this.options.find(el => el.value === value);
    if(selectedEl) {
      this.selectedOption = selectedEl;
      this.onChange(this.selectedOption.value);
    }
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}


