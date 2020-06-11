import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { RxwebValidators, json } from '@rxweb/reactive-form-validators'
import { CommonService } from 'src/shared/services/common.service';
import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';
import { error } from 'protractor';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  type: string = 'eye';
  type1: string = 'eye';
  private forgotform: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private CM: CommonService, private router: Router, private userService: UserService, private auth: AuthService) {
    this.forgotform = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmpassword: ['', [RxwebValidators.compare({ fieldName: 'password' })]]
    });
  }

  get errorControl() {
    return this.forgotform.controls;
  }

  ngOnInit() {
  }

  async onReset() {
    this.isSubmitted = true;
    if (!this.forgotform.valid) {
      this.CM.Toaster('Please provide all the required values!', 'danger')
      return false;
    } else {
      this.forgotform.value.user_type = "u"
      this.forgotform.value.phone_number = localStorage.getItem('phone')
      this.userService.resetPassword(this.forgotform.value, '/authentication/reset-password').subscribe((res: any) => {
        this.CM.Toaster('Password reset successfully!', 'success')
        localStorage.removeItem('phone');
        this.router.navigateByUrl('login')
      }, error => {
        this.CM.Toaster(error.error.message, 'danger')
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
