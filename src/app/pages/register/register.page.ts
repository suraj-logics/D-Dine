import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { RxwebValidators } from '@rxweb/reactive-form-validators'
import { Router } from '@angular/router';
import { CommonService } from '../../../shared/services/common.service';
import { UserService } from '../../../shared/services/user.service';
import { error } from 'protractor';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private registerform: FormGroup;
  isSubmitted = false;
  type: string = 'eye';
  type1: string = 'eye';
  constructor(private formBuilder: FormBuilder, private router: Router, private commonService: CommonService, private userService: UserService) {
    this.registerform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.minLength(10)]],
      confirmpassword: ['', [RxwebValidators.compare({ fieldName: 'password' })]]
    });
  }

  get errorControl() {
    return this.registerform.controls;
  }
  
  ngOnInit() {
  }

  signup() {
    this.isSubmitted = true;
    if (!this.registerform.valid) {
      this.commonService.Toaster('Please provide all the required values!', 'danger')
      return false;
    } else {
      this.registerform.value.user_type = "u"
      localStorage.setItem("phone",this.registerform.value.phone_number)
      this.userService.register(this.registerform.value, '/authentication/register').subscribe(res => {
        this.commonService.Toaster('Regitration successfull!please verify your account', 'success')
        this.router.navigateByUrl('verification');
      }, error => {
        this.commonService.Toaster(error.error.message, 'danger')
      })
    }
  }

  changeType(type) {
    if (type == 'eye') this.type = 'eye-off';
    if (type == 'eye-off') this.type = 'eye';
  }
  psChangeType(type) {
    if (type == 'eye') this.type1 = 'eye-off';
    if (type == 'eye-off') this.type1 = 'eye';
  }
}
