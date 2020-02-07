import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/features/models';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authentication/auth/auth.service';
import { HttpService } from 'src/app/core/services/http-firebase/http.service';
import { map } from 'rxjs/operators';
import { Salary } from 'src/app/features/models/salary';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  employee: any;

  constructor(
      private router: Router,
      private authenticationService: AuthService,
      private http: HttpService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

  getEmployes(){
    this.http.getSalarySheet().snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      })))
    ).subscribe(res => {
      this.employee = res;
      console.log(this.employee)
    })
  }

  ngOnInit() {
    this.getEmployes()
  }



}
/*
getUsersList(){
  this._userService.getUsersList().snapshotChanges().pipe(
    map(changes => changes.map(c => ({
      key: c.payload.key, ...c.payload.val()
    })))
  ).subscribe(users => {
    this.users = users;
  })
}
*/