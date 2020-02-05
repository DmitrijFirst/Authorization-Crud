import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from "@angular/forms";
import { HttpService } from '../../core/services/http-firebase/http.service';
import { Salary } from 'src/app/features/models';

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
    private http: HttpService
    ) {}



  onFormSubmit() {
    const control = this.personsForm.controls;
    if (this.personsForm.invalid) {
      /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(control)
       .forEach(controlName => control[controlName].markAsTouched());
              /** Прерываем выполнение метода*/
       return;
    }else{
      this.http.addSalarySheet(this.personsForm.value);
      console.log(this.personsForm.value);
    }  
  }

addPerson(){
  const users = this.personsForm.get('persons') as FormArray;
  users.push(this.fb.group({
    surname: ['',[Validators.required]],
    pers_num: ['',[Validators.required]],
    length_of_work: ['',[Validators.required]],
    status: ['',[Validators.required]],
    phone: ['',[Validators.required]],
    salary: ['',[Validators.required]]
  }))
}

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
