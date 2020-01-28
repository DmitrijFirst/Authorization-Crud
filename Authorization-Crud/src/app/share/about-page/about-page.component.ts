import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/core/services/currency/currency.service';
import { Currency } from '../../features/models';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/authentication/auth/auth.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  courses: Currency[] = [];

  constructor(
    private http: CurrencyService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
    ) {
      // перенаправить на about, если вы уже есть авторизация
      if (this.authService.currentUserValue) { 
        this.router.navigate(['/']);
      }
    }

  

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  // получаем URL-адрес возврата из параметров маршрута или по умолчанию «/»
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.http.getCurrency().subscribe(res => {
      this.courses = res;
      console.log(res)
    })
  }

      get f() { return this.loginForm.controls; }

      onSubmit() {
          this.submitted = true;
  
          // если форма недействительна
          if (this.loginForm.invalid) {
              return;
          }
  
          this.loading = true;
          this.authService.login(this.f.username.value, this.f.password.value)
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
