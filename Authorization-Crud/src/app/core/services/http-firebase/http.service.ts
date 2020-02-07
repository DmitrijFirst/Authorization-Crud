import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Salary } from 'src/app/features/models/salary';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private dpPath = '/salary';
  usersRef: AngularFireList<Salary> = null;

  constructor(private db: AngularFireDatabase) { 
    this.usersRef = db.list(this.dpPath);
  }

  public addSalarySheet(salary: Salary):any{
    this.usersRef.push(salary);
  }

  public getSalarySheet(): AngularFireList<Salary>{
    return this.usersRef;
   }
}
