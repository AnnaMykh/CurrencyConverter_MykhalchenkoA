import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface ExchangeRate {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

@Injectable({
  providedIn: 'root'
})


export class ExchangeService {
  private apiUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

  constructor(private http: HttpClient) { }

  getExchangeRates(): Observable<ExchangeRate[]> {
    return this.http.get<ExchangeRate[]>(this.apiUrl);
  }
}
