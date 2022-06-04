import { Component, OnInit, Inject } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { MustMatch } from '../register/register.model'
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})

export class EdituserComponent {
  edituserForm: FormGroup;
  submitted = false;
  loggedinUser2: any;
  loggedinUser: any;
  Users: any;
  EditDataGet: any;
  constructor(private userservice: ServiceService, private formBuilder: FormBuilder,
    private router: Router, public dialogRef: MatDialogRef<EdituserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.EditDataGet = this.data;
    console.log("tttt", this.EditDataGet);

    let temp = localStorage.getItem('loggedinUser');
    this.loggedinUser2 = temp;
    console.log(this.loggedinUser2);

    this.loggedinUser = JSON.parse(this.loggedinUser2)
    this.edituserForm = this.formBuilder.group({
      EMpName: [this.EditDataGet.EMpName],
      Gender: [this.EditDataGet.Gender],
      Country: [this.EditDataGet.Country],
      EmpBasicSal: [this.EditDataGet.EmpBasicSal],
      ProTax: [this.EditDataGet.ProTax],

      EmpPf: [this.EditDataGet.EmpPf],

      TotalSalCredit: [this.EditDataGet.TotalSalCredit],
      EmpType: [this.EditDataGet.EmpType],

      Detail: [this.EditDataGet.Detail],
      EmpImage: [this.EditDataGet.EmpImage],
      // dob: ['', [Validators.required]],
      confirmPassword: [this.EditDataGet.confirmPassword, Validators.required]

    })

  }

  get f() { return this.edituserForm.controls; }



  getUserListData() {
    this.userservice.getusr().subscribe((data: any) => {
      this.Users = data;

      console.log(this.Users);

    })
  }
  onSubmit() {
    this.submitted = true;
    this.userservice.edituserChange(this.EditDataGet.id, this.edituserForm.value)
      .pipe(first())
      .subscribe(
        data => {

          console.log(data);
          this.dialogRef.close('YesSubmit');

        });
  }

}
