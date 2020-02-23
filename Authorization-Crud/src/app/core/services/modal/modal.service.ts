import { Injectable, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/share/modal_components/delete/delete.component';
import { Salary } from 'src/app/features/models';
import { EmpInfoComponent } from 'src/app/share/modal_components/emp-info/emp-info.component';
import { UpdateComponent } from 'src/app/share/modal_components/update/update.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  [x: string]: any;

  @Input() employes: Salary;

  constructor(private dialog: MatDialog) { }
  

  public openEmpInfo({name,surname,length_of_work,phone,pers_num,status,salary}) {
    return this.dialog.open(EmpInfoComponent, 
    {
      width: '25%',
      data : { name,surname,length_of_work,phone,pers_num,status,salary }    
    });
  }

  public updateEmp({name,surname,length_of_work,phone,pers_num,status,salary},key, index, persons){
    return this.dialog.open(UpdateComponent, 
      {
        width: '90%',
        data : { name,surname,length_of_work,phone,pers_num,status,salary,key, index, persons }
      })
      
  }
 
  public openDeleteDialog(){
    return this.dialog.open(DeleteComponent,{
      width: '390px',
      disableClose: true
    })
  }

}