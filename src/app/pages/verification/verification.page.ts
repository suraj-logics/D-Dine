import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonService } from '../../../shared/services/common.service';
import { UserService } from '../../../shared/services/user.service';
import { error } from 'protractor';
import { AuthService } from 'src/shared/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  verifyForm: FormGroup;
  opt: any;
  isSubmitted = true;
  otps: any = '';
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '14vw',
      'height': '14vw',
      'margin': ' 0 5px',
      'text-align': 'center',
      'font-size': '6vw',
      'outline': 'none',
      'border': 'none',
      'border-bottom': '2px solid rgb(173, 173, 173)',
      'background': 'none',
      'border-radius': '0'
    },
  };
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public auth: AuthService,
    private commonService: CommonService, private userService: UserService, public loc: Location) {
    this.verifyForm = this.formBuilder.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
    });

    commonService.presentLoading('')
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/tab1')
    } else {
      commonService.dismissLoading();
    }
  }

  ionViewWillEnter() {
    this.isSubmitted = false;
    this.otps = '';
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/tab1')
    } else {
      this.commonService.dismissLoading();
    }
  }

  ngOnInit() {
  }
  onOtpChange(event) {
    this.otps = event;
    if (this.otps.length == 4) {
      this.isSubmitted = false;
    }
    else if (this.otps.length < 4) {
      this.isSubmitted = true;
    }
  }

  Verify() {
    let str5 = this.otps;
    if (str5.length < 4) {
      this.commonService.Toaster('Please enter otp!', 'danger')
      return false;
    } else if (str5.length == 4) {
      this.commonService.presentLoading('');
      this.userService.verifyOtp({ otp: str5, phone_number: parseInt(localStorage.getItem('phone')), user_type: "u" }, '/authentication/verify-user').subscribe((res: any) => {
        this.commonService.Toaster('User Verified successfully!', 'success')
        localStorage.removeItem('phone');
        this.auth.setCurrentUser(res)
        this.router.navigateByUrl('/tab1')
        this.commonService.dismissLoading()
      }, error => {
        this.commonService.Toaster(error.error.message, 'danger')
        this.commonService.dismissLoading()

      })
    }
  }

  resendOtp() {
    this.commonService.presentLoading('');
    this.userService.generateOtp({ phone_number: parseInt(localStorage.getItem('phone')), user_type: "u" }, '/authentication/generate-otp').subscribe((res: any) => {
      this.commonService.Toaster('Otp sent to the register number!', 'success')
      this.commonService.dismissLoading()
    },error=>{
      this.commonService.Toaster(error.error.message, 'danger')
      this.commonService.dismissLoading()
    })
  }

}
