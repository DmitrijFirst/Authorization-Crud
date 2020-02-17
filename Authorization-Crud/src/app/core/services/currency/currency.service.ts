import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../../../features/models';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

  constructor(private http: HttpClient, private logger: LoggerService) { }

  public getCurrency():Observable<Currency[]>{
    return this.http.get<Currency[]>(`${this.url}`).pipe(
      map((data:any) =>{
        this.logger.log(data)
        return data.splice(0,3);
      }),catchError(error => {
        return throwError(error);
      })
    )
  }
}