import { Component, OnInit, Input } from '@angular/core';
import { User, Salary } from 'src/app/features/models';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authentication/auth/auth.service';
import { HttpService } from 'src/app/core/services/http-firebase/http.service';
import { map, catchError } from 'rxjs/operators';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { throwError} from 'rxjs';
import { LoggerService } from 'src/app/core/services/logger/logger.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  employes: any;
  user = {};
  getObjEmp: any;
  key: any;
  isShown: any;

  constructor(
      private router: Router,
      private authenticationService: AuthService,
      private http: HttpService,
      private modal: ModalService,
      private logger: LoggerService
   
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  
  }

  public logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
      this.logger.log('Logout success')
  }
 /*Получаем данные с сервера */
  public getEmployes(){
    this.http.getSalarySheet().snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        key: c.payload.key, ...c.payload.val()     
      })))
    ).subscribe(res => {
      this.employes = res;
      this.logger.log('Get data success');
    }),catchError(error => {
      return throwError(error);
    })
  }

  /*Вывод информации о пользователе в модалке*/
    public getEmpInfo(el: any, index: any){
      let data = el;
      this.user = data.persons;
      this.modal.openEmpInfo(this.user[index])
      this.logger.log('Get data modal success');
    };

  /*Удаление ведомости */
  public deleteEmployee({key}) {
    this.modal.openDeleteDialog().afterClosed().subscribe(res => {
      if(res){
        this.http.deleteEmp(key);
        this.logger.log('Delete data success');
      }
    }),catchError(error => {
      return throwError(error)
    }
    )
  }

 /*Удаление сотрудника */
  public deleteUser(el: any, index: number){
    this.modal.openDeleteDialog().afterClosed().subscribe(res => {
      if(res){
        let data = el;
        this.key = data.key;
        let emp = data.persons;
        let result = emp.filter(u => u != emp[index])
        this.http.updateUser(this.key, {'/persons/': result}).catch(err => console.log(err));
        this.logger.log('Emploee delete sucess');
        this.logger.log(emp[index]);
      }
    }),catchError(error => {
      return throwError(error)
  })
}
    
  
 /*Изменение сотрудника */
  public updateEmploee(el: any, index: number,){
    let data = el;
    this.user = data.persons;
    this.key = data.key;
    this.modal.updateEmp(this.user[index], this.key, index, this.user)
    this.logger.log('open update window sucess');
  };

  public isShownown(el: any) {
    this.isShown = el;
    this.logger.log('Opened statement sucess ' + el);
}
    

  ngOnInit() {
    this.getEmployes()
 
  }



}
