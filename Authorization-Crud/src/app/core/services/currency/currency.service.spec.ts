import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CurrencyService]
  }));


  it('should be created', () => {
    const service: CurrencyService = TestBed.get(CurrencyService);
    expect(service).toBeTruthy();
  });

  it('should get currency', inject([CurrencyService, HttpTestingController], (service: CurrencyService, beckend: HttpTestingController) => {
    const mockBooks = [];
    expect(service).toBeTruthy();

    service.getCurrency().subscribe(books =>{
      expect(books).toEqual(mockBooks);
    });

    beckend.expectOne({
      method: 'GET',
      url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
    }).flush(mockBooks)
  }));




});
