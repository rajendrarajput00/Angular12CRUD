import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ServiceService } from 'src/app/service.service';

import { MustMatch } from './register.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  submitted: boolean = false;
  events = [];
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userservice: ServiceService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      EMpName: [''],
      Gender: [''],
      Country: [''],
      EmpImage: [''],
      EmpBasicSal: [''],
      ProTax: [''],
      EmpPf: [''],
      TotalSalCredit: [''],
      EmpType: [''],
      Detail: [''],
    });
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.userservice.addUsr(this.registerForm.value).subscribe((data: any) => {
      console.log(data);
    });

    this.router.navigate(['home']);
    let users = [];
    alert('User added successfully');
  }
}
