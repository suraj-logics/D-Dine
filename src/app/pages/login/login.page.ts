import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonService } from 'src/shared/services/common.service';
import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';
import { error } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loginform: FormGroup;
  private forgotform: FormGroup;
  isSubmitted = false;
  isSubmitted1 = false;
  hLogin: boolean = true;
  type: string = 'eye';
  show = true;

  constructor(private formBuilder: FormBuilder, private CM: CommonService, private router: Router, private userService: UserService, private auth: AuthService) {
    this.show = true;
    this.loginform = this.formBuilder.group({
      phone_number: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', Validators.required],
    });

    this.forgotform = this.formBuilder.group({
      phone_number: ['', [Validators.required, Validators.minLength(10)]]
    });
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/dashboard/tab2')
    }
  }

  get errorControl() {
    return this.loginform.controls;
  }

  get errorControl1() {
    return this.forgotform.controls;
  }


  hClick(h) {
    h == true ? this.hLogin = true : this.hLogin = false;
    //this.CM.Toaster('kdjfaj','danger')
  }
  ngOnInit() {
  }


  ionViewWillEnter() {
    this.show = true;
  }

  async onLogin() {
    this.isSubmitted = true;

    if (!this.loginform.valid) {
      this.CM.Toaster('Please provide all the required values!', 'danger')
      return false;
    } else {
      this.loginform.value.user_type = "u"
      this.userService.login(this.loginform.value, '/authentication/login').subscribe((res: any) => {
        this.CM.Toaster('Login successfull!', 'success')
        this.auth.setCurrentUser(res)
        this.router.navigateByUrl('/dashboard/tab2')
      }, error => {
        this.CM.Toaster(error.error.message, 'danger')
      })
    }
  }

  async onReset() {
    this.isSubmitted1 = true;
    if (!this.forgotform.valid) {
      this.CM.Toaster('Please provide all the required values!', 'danger')
      return false;
    } else {
      this.forgotform.value.user_type = "u"
      localStorage.setItem("phone", this.forgotform.value.phone_number)
      this.userService.generateOtp(this.forgotform.value, '/authentication/generate-otp').subscribe((res: any) => {
        this.CM.Toaster('Please verify otp!', 'success')
        this.router.navigateByUrl('reset-otp')
      }, error => {
        this.CM.Toaster(error.error.message, 'danger')
      })
    }
  }

  signUp() {
    this.router.navigateByUrl('/register')
  }

  toggle() {
    this.show = false;
  }

  changeType(type) {
    if (type == 'eye') this.type = 'eye-off';
    if (type == 'eye-off') this.type = 'eye';
  }


}
