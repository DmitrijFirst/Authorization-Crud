import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Salary } from 'src/app/features/models';

@Component({
  selector: 'app-emp-info',
  templateUrl: './emp-info.component.html',
  styleUrls: ['./emp-info.component.css']
})
export class EmpInfoComponent implements OnInit {
  
  constructor(
    private matDialogRef: MatDialogRef<EmpInfoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {}

}
