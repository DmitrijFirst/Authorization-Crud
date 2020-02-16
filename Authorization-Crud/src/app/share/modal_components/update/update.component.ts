import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Salary } from 'src/app/features/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/core/services/http-firebase/http.service';



@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  
  @Input() employes: Salary;
  personsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private matDialogRef: MatDialogRef<UpdateComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  public updateForm(){
    this.personsForm = this.fb.group({
      name: [this.data.name,[Validators.required]],
      surname: [this.data.surname,[Validators.required]],
      pers_num: [this.data.pers_num,[Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(8)]],
      length_of_work: [this.data.length_of_work,[Validators.required]],
      status: [this.data.status,[Validators.required]],
      phone: [this.data.phone,[Validators.required,Validators.minLength(10), Validators.maxLength(13)]],
      salary: [this.data.salary,[Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(10)]]
      
  });
  }
/*
  public updateEmploee({key}){
    this.http.updateUser(key, {'/persons/': this.personsForm.value}).catch(err => console.log(err)); 

  }
*/
  ngOnInit() {
    this.updateForm();
  }

}
