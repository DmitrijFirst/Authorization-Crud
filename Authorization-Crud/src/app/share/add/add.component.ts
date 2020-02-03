import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  personsForm: FormGroup;
  inputValue = "";
  constructor(private fb: FormBuilder) {}



  onFormSubmit() {
    console.log(this.personsForm.value);
  }

addPerson(){
  const users = this.personsForm.get('persons') as FormArray;
  users.push(this.fb.group({
    name: [''],
    surname: [''],
    pers_num: [''],
    length_of_work: [''],
    status: [''],
    phone: [''],
    salary: ['']
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
      id: new FormControl(''),
      title: new FormControl(''),
      persons: this.fb.array([])
  });
  }

}
