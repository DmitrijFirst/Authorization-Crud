import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../../../share/models';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

  constructor(private http: HttpClient) { }

  public getCurrency():Observable<Currency[]>{
    return this.http.get<Currency[]>(`${this.url}`).pipe(
      map((data:any) =>{
        return data.splice(0,3);
      })
    )
  }
}
