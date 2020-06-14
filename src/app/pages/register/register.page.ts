import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { RxwebValidators, json } from '@rxweb/reactive-form-validators'
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
  public registerform: FormGroup;
  isSubmitted = false;
  submit = false;
  type: string = 'eye';
  type1: string = 'eye';
  constructor(private formBuilder: FormBuilder, private router: Router, private commonService: CommonService, private userService: UserService) {
    this.registerform = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      confirmpassword: ['', [RxwebValidators.compare({ fieldName: 'password' })]]
    });
  }

  get errorControl() {
    return this.registerform.controls;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isSubmitted = false;
    this.submit = false;
  }

  signup() {
    this.isSubmitted = true;
    if (!this.registerform.valid) {
      this.commonService.Toaster('Please provide all the required values!', 'danger')
      return false;
    } else {
      this.commonService.presentLoading('')
      this.registerform.value.user_type = "u"
      this.registerform.value.phone_number = JSON.stringify(this.registerform.value.phone_number)
      localStorage.setItem("phone", this.registerform.value.phone_number)
      this.userService.register(this.registerform.value, '/authentication/register').subscribe(res => {
        this.commonService.Toaster('Regitration successfull!please verify your account', 'success')
        this.registerform.reset();
        this.router.navigateByUrl('verification');
        this.commonService.dismissLoading();
      }, error => {
        this.registerform.value.phone_number = parseInt(JSON.parse(this.registerform.value.phone_number))
        this.commonService.Toaster(error.error.message, 'danger')
        this.commonService.dismissLoading();
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

  checkValidation() {
    this.submit = true;
  }
}
