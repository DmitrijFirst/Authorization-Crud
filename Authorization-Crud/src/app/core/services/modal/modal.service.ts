import { Injectable, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/share/modal_components/delete/delete.component';
import { Salary } from 'src/app/features/models';
import { EmpInfoComponent } from 'src/app/share/modal_components/emp-info/emp-info.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  @Input() employes: Salary;

  constructor(private dialog: MatDialog) { }
  

  public openEmpInfo({name,surname,length_of_work,phone,pers_num,status,salary }) {
    return this.dialog.open(EmpInfoComponent, 
    {
      width: '25%',
      data : { name,surname,length_of_work,phone,pers_num,status,salary }    
    });
  }
 
  public openDeleteDialog(){
    return this.dialog.open(DeleteComponent,{
      width: '390px',
      disableClose: true
    })
  }

}