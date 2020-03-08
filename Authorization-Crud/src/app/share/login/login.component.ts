import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../core/services/authentication/auth/auth.service';
import { CurrencyService } from 'src/app/core/services/currency/currency.service';
import { Currency } from 'src/app/features/models';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({ 
  templateUrl: 'login.component.html' ,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    curren: Currency[] = [];
    isShown: boolean = false;
/*############################################################################################ */
curr = ['UAH', 'USD', 'EUR', 'RUR' ];
inCurr="";
outCurr = "";
inrToForeignRates = {
    UAH: 1,
    EUR: 1,
    USD: 1,
    RUR: 1
  };
inputValue = 0;
/*############################################################################################ */

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
        private currency: CurrencyService,
        private logger: LoggerService
    ) { 
        //перенаправить на /home, если авторизаций уже пройдена
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
            this.logger.log('Auterization success, redirect /home')
        }
    }

    public isShownown(el: any) {
        this.isShown = el;
    }

//конвертация валют 
public currencyVal(){
  this.logger.log('conversion success')
  return this.inputValue * this.inrToForeignRates[this.inCurr] / this.inrToForeignRates[this.outCurr];

 } 

 public getCurr(){
    return this.currency.getCurrency().subscribe(res => {
      this.curren = res;
      this.inrToForeignRates.USD = this.curren[0].buy;
      this.inrToForeignRates.EUR = this.curren[1].buy;
      this.inrToForeignRates.RUR = this.curren[2].buy;
      this.logger.log('Get currency sucess')
      console.log(this.inrToForeignRates.USD)
    })
  }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
        // получаем URL-адрес возврата из параметров маршрутов или по умолчанию «/»
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        //получаем курсы валют
        this.getCurr();
    }


    // быстрый доступ к полям формы
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // если форма не валидна отменяем
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            this.logger.warn('required fields are not filled')
             return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
