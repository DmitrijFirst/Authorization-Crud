import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/core/services/currency/currency.service';
import { Currency } from '../models';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  constructor(private http: CurrencyService) { }

  courses: Currency[] = [];

  ngOnInit() {
    this.http.getCurrency().subscribe(res => {
      this.courses = res;
      console.log(res)
    })
  }

}
