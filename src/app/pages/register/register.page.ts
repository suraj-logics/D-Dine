import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { RxwebValidators } from '@rxweb/reactive-form-validators'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private registerform: FormGroup;
  isSubmitted = false;
  type:string='eye';
  type1:string='eye';
  constructor(private formBuilder: FormBuilder,private router:Router) {
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

  signUP() {
    this.isSubmitted = true;
    if (!this.registerform.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.registerform.value)
    }
  }

  changeType(type){
    if(type=='eye')this.type='eye-off';
    if(type=='eye-off') this.type='eye';
  }
  psChangeType(type){
    if(type=='eye')this.type1='eye-off';
    if(type=='eye-off') this.type1='eye';
  }
}
