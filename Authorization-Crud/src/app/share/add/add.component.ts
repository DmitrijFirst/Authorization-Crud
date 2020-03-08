import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from "@angular/forms";
import { HttpService } from '../../core/services/http-firebase/http.service';
import { Salary } from 'src/app/features/models';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  personsForm: FormGroup;
  salary: Salary = new Salary();
  //inputValue = "+380";

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private logger: LoggerService
    ) {}

    


  public onFormSubmit() {
    const control = this.personsForm.controls;
    if (this.personsForm.invalid) {
      this.personsForm.markAllAsTouched();
      this.logger.warn('required fields are not filled')
       return;
    }else{
      this.http.addSalarySheet(this.personsForm.value);
      this.personsForm.reset();
      setTimeout(() =>{
        this.router.navigateByUrl('home');
      }, 1000) 
      this.logger.log('Success add form data');
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
    salary: ['',[Validators.required,Validators.maxLength(10)]]
  }))
  this.logger.log('form emploee add success');
}

  public get persons() {
    return (<FormArray>this.personsForm.get("persons")).controls;
  }

  public removePerson(i) {
    (<FormArray>this.personsForm.get("persons")).removeAt(i);
  }

  ngOnInit() {
    this.personsForm = this.fb.group({
      title: ['',[Validators.required]],
      persons: this.fb.array([],[Validators.required])
  });
  this.logger.log('form initialized success')
  this.addPerson();
  }

}
/*


*/