import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/features/models';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authentication/auth/auth.service';
import { HttpService } from 'src/app/core/services/http-firebase/http.service';
import { map, catchError } from 'rxjs/operators';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  employee: any;
  isShown: boolean = false ;

  constructor(
      private router: Router,
      private authenticationService: AuthService,
      private http: HttpService,
      private modal: ModalService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  public logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

  public getEmployes(){
    this.http.getSalarySheet().snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      })))
    ).subscribe(res => {
      this.employee = res;
      console.log(this.employee)
    })
  }

  public getEmpInfo(){
    this.modal.openEmpInfo();

  }

  public deleteEmp() {
    this.modal.openDeleteDialog().afterClosed().subscribe(res => {
      if(res){

      }
    }),catchError(error => {
      return throwError(error)
    }
    )
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