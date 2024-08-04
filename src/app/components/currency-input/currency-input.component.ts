import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss']
})
export class CurrencyInputComponent {
  @Input() amount: number = 1;
  @Input() currency: string = 'USD';
  @Input() currencies: string[] = [];
  @Input() label: string = '';

  @Output() amountChange = new EventEmitter<number>();
  @Output() currencyChange = new EventEmitter<string>();

  onAmountChange(): void {
    this.amountChange.emit(this.amount);
  }

  onCurrencyChange(): void {
    this.currencyChange.emit(this.currency);
  }
}
