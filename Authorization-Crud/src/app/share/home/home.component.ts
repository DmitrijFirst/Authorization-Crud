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
  user = {};
  employeInfo = {};

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

    /*Вывод информации о пользователе в модалке*/
    public getEmpInfo(index: number){
      let data = this.employes;
      let val = Object.keys(data).forEach(el => {
        this.user = data[el]['persons']
      })
      this.modal.openEmpInfo(this.user[index])
        console.log(this.user[index])
      };

      /*Удаление ведомости */
  public deleteEmployee({key}) {
    this.modal.openDeleteDialog().afterClosed().subscribe(res => {
      if(res){
        this.http.deleteEmp(key);
      }
    }),catchError(error => {
      return throwError(error)
    }
    )
  }

   /*Удаление  */
  public deleteUser({key}){
    this.modal.openDeleteDialog().afterClosed().subscribe(res => {
      if(res){
        let data = this.employes;
        let val = Object.keys(data).forEach(el => {
          this.user = data[el]['persons'].splice(0,1).filter(u => u !== el);
        })
        this.http.updateUser(key, {"/persons/": this.user}).catch(err => console.log(err))
       // console.log(key)  
        }
      }),catchError(error => {
      return throwError(error)
      }
  )}
  

  updateActive( isActive: boolean){
    this.http.updateUser(this.employee.key, { active: isActive }).catch(err => console.log(err));
  }



  ngOnInit() {
    this.getEmployes()
 
  }



}
