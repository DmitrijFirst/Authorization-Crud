import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { CurrencyService } from 'src/app/core/services/currency/currency.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/core/services/authentication/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ThousandPipe } from '../pipes/num.pipe';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let currencyService: CurrencyService;
  let spy: jasmine.Spy;
  let mockCurrency;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ LoginComponent, ThousandPipe ],
      providers: [CurrencyService, LoggerService, AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    currencyService = fixture.debugElement.injector.get(CurrencyService);
    mockCurrency = [{
      ccy: "Test",
      base_ccy: "Test",
      buy: 10,
      sale: 10,
    }
    ]
  
    
    spy = spyOn(currencyService, 'getCurrency').and.returnValue(of(mockCurrency))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call currency service', () => {
    component.getCurr();;
    expect(spy.calls.any()).toBeTruthy()
  });





});
