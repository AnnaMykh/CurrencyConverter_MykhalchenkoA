import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationModule} from "@angular/core";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ExchangeService} from "./exchange.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ApplicationModule, CommonModule, RouterOutlet, FormsModule, HttpClientModule],
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
  currencies: string[] = ['UAH', 'USD', 'EUR'];

  private rates: { [key: string]: number } = {};
  constructor(private exchangeRateService: ExchangeService, private titleService: Title) { }
  private isAmount1Changed: boolean = true;

  ngOnInit(): void {
    this.titleService.setTitle('Курси валют на ' + this.getTodayDate());
    this.todayDate = this.getTodayDate();
    this.exchangeRateService.getExchangeRates().subscribe(rates => {
      const usdRate = rates.find(rate => rate.ccy === 'USD');
      const eurRate = rates.find(rate => rate.ccy === 'EUR');
      if (usdRate) {
        this.usdToUah = parseFloat(usdRate.buy).toFixed(5);
        this.rates['USD'] = parseFloat(usdRate.buy);
      }
      if (eurRate) {
        this.eurToUah = parseFloat(eurRate.buy).toFixed(5);
        this.rates['EUR'] = parseFloat(eurRate.buy);
      }
      this.rates['UAH'] = 1;
      this.convertCurrency();
    });
  }

  getTodayDate(): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onAmount1Change(): void {
    if (this.amount1 <= 0) {
      this.amount1 = 1;
    }
    this.isAmount1Changed = true;
    this.convertCurrency();
  }

  onAmount2Change(): void {
    if (this.amount2 <= 0) {
      this.amount2 = 1;
    }
    this.isAmount1Changed = false;
    this.convertCurrency();
  }

  onCurrencyChange(): void {
    this.convertCurrency();
  }
  convertCurrency(): void {
    if (this.currency1 && this.currency2) {
      const rate1toUAH = this.rates[this.currency1];
      const rate2toUAH = this.rates[this.currency2];
      if (this.isAmount1Changed) {
        const amountInUAH = this.amount1 * rate1toUAH;
        this.amount2 = parseFloat((amountInUAH / rate2toUAH).toFixed(5));
      } else {
        const amountInUAH = this.amount2 * rate2toUAH;
        this.amount1 = parseFloat((amountInUAH / rate1toUAH).toFixed(5));
      }
    }
  }
}




