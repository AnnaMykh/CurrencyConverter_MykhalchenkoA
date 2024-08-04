import {Component, forwardRef, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationModule} from "@angular/core";
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ExchangeService} from "../services/exchange.service";
import { Title } from '@angular/platform-browser';
import {ExchangeRate} from "../models/ExchangeRate";
import { CurrencyInputComponent } from '../components/currency-input/currency-input.component';
import {CustomSelectComponentComponent} from "../components/custom-select/custom-select-component.component";
import {CustomInputComponentComponent} from "../components/custom-input/custom-input-component.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ApplicationModule, CommonModule, RouterOutlet, FormsModule, HttpClientModule, CurrencyInputComponent, CustomSelectComponentComponent, CustomInputComponentComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  usdToUah: string | undefined;
  eurToUah: string | undefined;
  amount1: number = 1;
  currency1: string = 'USD';
  amount2: number = 1;
  currency2: string = 'UAH';
  todayDate: string = '';
  currencies: string[] = [];
  protected rates: { [key: string]: number } = {};
  private isAmount1Changed: boolean = true;
  title: "" | undefined;

  constructor(private exchangeService: ExchangeService, private titleService: Title) { }
  currencyOptions: { title: string; value: string }[] = [];

  ngOnInit(): void {
    this.titleService.setTitle('Курси валют на ' + this.getTodayDate());
    this.todayDate = this.getTodayDate();
    this.loadExchangeRates();
  }
  loadExchangeRates(): void {
    this.exchangeService.getExchangeRates().subscribe(rates => {
      this.processRates(rates);
      this.convertCurrency(); // Оновлюємо конвертацію після завантаження курсів
    });
  }
  getTodayDate(): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  processRates(rates: ExchangeRate[]): void {
    this.currencies = ['UAH', ...rates.map(rate => rate.ccy)]; // Додаємо UAH та інші валюти
    this.rates = rates.reduce<{ [key: string]: number }>((acc, rate) => {
      acc[rate.ccy] = parseFloat(rate.buy);
      return acc;
    }, { 'UAH': 1 });

    this.currencyOptions = this.currencies.map(currency => ({ title: currency, value: currency }));
  }

  updateAmount(amount: number, isAmount1Changed: boolean): void {
    if (amount <= 0) {
      amount = 1;
    }

    if (isAmount1Changed) {
      this.amount1 = amount;
    } else {
      this.amount2 = amount;
    }

    this.isAmount1Changed = isAmount1Changed;
    this.convertCurrency();
  }

  onAmount1Change($event: number): void {
    this.updateAmount($event, true);
  }

  onAmount2Change($event: number): void {
    this.updateAmount($event, false);
  }
  onCurrency1Change(selectedCurrency: string): void {
    this.updateCurrency(selectedCurrency, true);
  }

  onCurrency2Change(selectedCurrency: string): void {
    this.updateCurrency(selectedCurrency, false);
  }
  updateCurrency(selectedCurrency: string, isCurrency1: boolean): void {
    if (isCurrency1) {
      this.currency1 = selectedCurrency;
    } else {
      this.currency2 = selectedCurrency;
    }
    this.convertCurrency();
  }

  convertCurrency(): void {
    if (this.currency1 && this.currency2) {
      const rate1toUAH = this.rates[this.currency1];
      const rate2toUAH = this.rates[this.currency2];
      if (this.isAmount1Changed) {
        this.amount2 = parseFloat(((this.amount1 * rate1toUAH) / rate2toUAH).toFixed(5));
      } else {
        this.amount1 = parseFloat(((this.amount2 * rate2toUAH) / rate1toUAH).toFixed(5));
      }
    }
  }
}




