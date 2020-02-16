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
  getObjEmp;
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

   /*Удаление  одного юзера*/
  public deleteUser({key}, index: number){
    this.modal.openDeleteDialog().afterClosed().subscribe(res => {
      if(res){
        //получаем массив сотрудников
        let data = this.employes;
        let res = Object.keys(data).forEach(el => {
        this.getObjEmp = data[el]['persons'];
      });
      //изменяем с помощью фильтра массив сотрудников 
        let resl = Object.keys(data).forEach(el => {
        this.user = data[el]['persons'];
      });
      //передаем измененный массив объектов
        let result = this.getObjEmp.filter(u => u != this.user[index])
        this.http.updateUser(key, {'/persons/': result}).catch(err => console.log(err)); 
        }
      }),catchError(error => {
        return throwError(error)
      }
  )}

  public updateEmploee(index: number){
    let data = this.employes;
    let val = Object.keys(data).forEach(el => {
      this.user = data[el]['persons']
    })
    this.modal.updateEmp(this.user[index])
      console.log(this.user[index])
    };
    
  

/*
 
  public getEmpInfo(index: number){
    let data = this.employes;
    let val = Object.keys(data).forEach(el => {
      this.user = data[el]['persons']
    })
    this.modal.openEmpInfo(this.user[index])
      console.log(this.user[index])
    };


*/

  ngOnInit() {
    this.getEmployes()
 
  }



}
