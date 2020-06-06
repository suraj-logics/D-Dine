import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonService } from '../../../shared/services/common.service';
import { UserService } from '../../../shared/services/user.service';
import { error } from 'protractor';

@Component({
  selector: 'app-reset-otp',
  templateUrl: './reset-otp.page.html',
  styleUrls: ['./reset-otp.page.scss'],
})
export class ResetOtpPage implements OnInit {
  verifyForm: FormGroup;
  opt: any;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private commonService: CommonService, private userService: UserService) {
    this.verifyForm = this.formBuilder.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  Verify() {
    let str1 = new String(this.verifyForm.value.otp1);
    let str2 = new String(this.verifyForm.value.otp2);
    let str3 = new String(this.verifyForm.value.otp3);
    let str4 = new String(this.verifyForm.value.otp4);
    let str5 = str1.concat(str2.toString()).concat(str3.toString()).concat(str4.toString());
    this.isSubmitted = true;
    if (!this.verifyForm.valid) {
      this.commonService.Toaster('Please enter otp!', 'danger')
      return false;
    } else {
      this.userService.verifyOtp({ otp: str5, phone_number: localStorage.getItem('phone'), user_type: "u" }, '/authentication/verify-otp').subscribe(res => {
        this.commonService.Toaster('Otp Verification successfull!', 'success')
        this.router.navigateByUrl('forgot-password')
      }, error => {
        this.commonService.Toaster(error.error.message, 'danger')
      })
    }
  }
}
