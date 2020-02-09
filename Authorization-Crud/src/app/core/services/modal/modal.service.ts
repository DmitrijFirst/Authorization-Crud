import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpInfoComponent } from 'src/app/share/modal_components/emp-info/emp-info.component';
import { DeleteComponent } from 'src/app/share/modal_components/delete/delete.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  public openEmpInfo(){
    return this.dialog.open(EmpInfoComponent,{
      width: '600px',
      
    })
  }
 
  public openDeleteDialog(){
    return this.dialog.open(DeleteComponent,{
      width: '390px',
      disableClose: true
    })
  }

}