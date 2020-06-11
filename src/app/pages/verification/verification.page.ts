import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonService } from '../../../shared/services/common.service';
import { UserService } from '../../../shared/services/user.service';
import { error } from 'protractor';
import { AuthService } from 'src/shared/services/auth.service';

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
      'font-size': '9vw',
      'border': 'solid 1px #ccc',
      'box-shadow': ' 0 0 5px #ccc inset',
      'outline': 'none',
    },
  };
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public auth: AuthService,
    private commonService: CommonService, private userService: UserService) {
    this.verifyForm = this.formBuilder.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
    });
    commonService.presentLoading('')
    if (this.auth.getLoggedUser()) {
      commonService.dismissLoading();
      router.navigateByUrl('/dashboard/tab1')
    } else {
      commonService.dismissLoading();
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
      this.userService.verifyOtp({ otp: str5, phone_number: localStorage.getItem('phone'), user_type: "u" }, '/authentication/verify-user').subscribe(res => {
        this.commonService.Toaster('Otp Verification successfull!', 'success')
        localStorage.removeItem('phone');
        this.router.navigate(['login'])
        this.commonService.dismissLoading()

      }, error => {
        this.commonService.Toaster(error.error.message, 'danger')
        this.commonService.dismissLoading()

      })
    }
  }

}
