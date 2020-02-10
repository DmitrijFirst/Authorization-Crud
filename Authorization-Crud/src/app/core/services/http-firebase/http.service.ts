import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Salary } from 'src/app/features/models/salary';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private dpPath = '/salary';
  items: Observable<any>
  usersRef: AngularFireList<Salary> = null;
  
  constructor(private db: AngularFireDatabase, private http: HttpClient) { 
    this.usersRef = db.list(this.dpPath);
    this.items = this.usersRef.snapshotChanges().pipe(
      map((changes: any) => {
        const test = changes.map(d => ({ key: d.payload.key,  ...d.payload.val()}))
        console.log(test)
        return test;
      })
    )

   }


  public addSalarySheet(salary: Salary):any{
    this.usersRef.push(salary);
  }

  public getSalarySheet(): AngularFireList<Salary>{
    return this.usersRef;
   }

  public deleteEmp(key: string): Promise<void>{
      return this.usersRef.remove(key);
  }

  public updateUser(key: string, value: any): Promise<void>{
    return this.usersRef.update(key,value);
  }

  public deleteAll(): Promise<void>{
    return this.usersRef.remove()
  }
}
