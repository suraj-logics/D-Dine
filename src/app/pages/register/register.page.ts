import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { RxwebValidators } from '@rxweb/reactive-form-validators'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private registerform: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.registerform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmpassword: ['', [RxwebValidators.compare({ fieldName: 'password' })]]
    });
  }

  get errorControl() {
    return this.registerform.controls;
  }
  ngOnInit() {
  }

  onRegister() {
    this.isSubmitted = true;
    if (!this.registerform.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.registerform.value)
    }
  }

}
