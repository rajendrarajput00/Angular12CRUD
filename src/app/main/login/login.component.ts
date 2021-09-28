import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  email: string = '';
  password: string = '';


  constructor(private _formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.userLogin();
  }

  userLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log('data',this.loginForm);
    
  }
}
