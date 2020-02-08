import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from "@angular/forms";
import { HttpService } from '../../core/services/http-firebase/http.service';
import { Salary } from 'src/app/features/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  personsForm: FormGroup;
  salary: Salary = new Salary();
  

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
    ) {}



  onFormSubmit() {
    const control = this.personsForm.controls;
    if (this.personsForm.invalid) {
      this.personsForm.markAllAsTouched();
       return;
    }else{
      this.http.addSalarySheet(this.personsForm.value);
      console.log(this.personsForm.value);
    }  
  }

addPerson(){
  const users = this.personsForm.get('persons') as FormArray;
  users.push(this.fb.group({
    name: ['',[Validators.required]],
    surname: ['',[Validators.required]],
    pers_num: ['',[Validators.required]],
    length_of_work: ['',[Validators.required]],
    status: ['',[Validators.required]],
    phone: ['',[Validators.required]],
    salary: ['',[Validators.required]]
  }))
}
/*autor: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(25)]], */
  get persons() {
    return (<FormArray>this.personsForm.get("persons")).controls;
  }

  removePerson(i) {
    (<FormArray>this.personsForm.get("persons")).removeAt(i);
  }

  ngOnInit() {
    this.personsForm = this.fb.group({
      title: ['',[Validators.required]],
      persons: this.fb.array([])
  });
  }

}
