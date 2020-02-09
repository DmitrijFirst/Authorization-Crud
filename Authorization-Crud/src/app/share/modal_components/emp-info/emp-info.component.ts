import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/core/services/http-firebase/http.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-emp-info',
  templateUrl: './emp-info.component.html',
  styleUrls: ['./emp-info.component.css']
})
export class EmpInfoComponent implements OnInit {
  employee: any;

  constructor(
    private matDialogRef: MatDialogRef<EmpInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private http: HttpService
  ) { }

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
