import { Component, OnInit, Input } from '@angular/core';
import { User, Salary } from 'src/app/features/models';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authentication/auth/auth.service';
import { HttpService } from 'src/app/core/services/http-firebase/http.service';
import { map, catchError } from 'rxjs/operators';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { throwError, Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  employes: any;
  isShown: boolean = false ;

  @Input()
  employee: Salary;



  constructor(
      private router: Router,
      private authenticationService: AuthService,
      private http: HttpService,
      private modal: ModalService,
   
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
      this.employes = res;
      //console.log(this.employes)
    })
  }

  public getEmpInfo(i){
    this.modal.openEmpInfo();

  }

  public deleteEmployee() {
    this.modal.openDeleteDialog().afterClosed().subscribe(res => {
      if(res){
        this.http.deleteEmp(this.employee.key).catch(err => console.log(err));
      }
    }),catchError(error => {
      return throwError(error)
    }
    )
  }




  updateActive( isActive: boolean){
    this.http.updateUser(this.employee.key, { active: isActive }).catch(err => console.log(err));
  }



  ngOnInit() {
    this.getEmployes()
 
  }



}
