import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loginform: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get errorControl() {
    return this.loginform.controls;
  }

  ngOnInit() {
  }

  onLogin() {
    this.isSubmitted = true;
  if (!this.loginform.valid) {
    console.log('Please provide all the required values!')
    return false;
  } else {
    console.log(this.loginform.value)
  }
  }

}
