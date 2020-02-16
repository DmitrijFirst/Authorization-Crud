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
  inputValue = "+380";

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
    ) {}



  public onFormSubmit() {
    const control = this.personsForm.controls;
    if (this.personsForm.invalid) {
      this.personsForm.markAllAsTouched();
       return;
    }else{
      this.http.addSalarySheet(this.personsForm.value);
      this.personsForm.reset();
      setTimeout(() =>{
        this.router.navigateByUrl('home');
      }, 1000) 
      console.log(this.personsForm.value);
    }  
  }

 public addPerson(){
  const users = this.personsForm.get('persons') as FormArray;
  users.push(this.fb.group({
    name: ['',[Validators.required]],
    surname: ['',[Validators.required]],
    pers_num: ['',[Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(8)]],
    length_of_work: ['',[Validators.required]],
    status: ['',[Validators.required]],
    phone: ['',[Validators.required,Validators.minLength(10), Validators.maxLength(13)]],
    salary: ['',[Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(10)]]
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
/*


*/