import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonService } from '../../../shared/services/common.service';
import { UserService } from '../../../shared/services/user.service';
import { error } from 'protractor';
import { AuthService } from 'src/shared/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reset-otp',
  templateUrl: './reset-otp.page.html',
  styleUrls: ['./reset-otp.page.scss'],
})
export class ResetOtpPage implements OnInit {
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
  @ViewChild('otp1', { static: false }) el1: ElementRef;
  @ViewChild('otp2', { static: false }) el2: ElementRef;
  @ViewChild('otp3', { static: false }) el3: ElementRef;
  @ViewChild('otp4', { static: false }) el4: ElementRef;

  constructor(
    private rd: Renderer2,
    public CS: CommonService,
    public auth: AuthService, public loc: Location, private formBuilder: FormBuilder, private router: Router, private commonService: CommonService, private userService: UserService) {
    this.verifyForm = this.formBuilder.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
    });
    CS.presentLoading('')
    if (this.auth.getLoggedUser()) {
      CS.dismissLoading();
      router.navigateByUrl('/tab1')
    } else {
      CS.dismissLoading();
    }
  }

  ngOnInit() {


  }

  Type(T) {
    console.log()
    if (T == 1 && this.verifyForm.value.otp1.length == 1) { this.el2.nativeElement.focus() };
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
      this.userService.verifyOtp({ otp: str5, phone_number: parseInt(localStorage.getItem('phone')), user_type: "u" }, '/authentication/verify-otp').subscribe(res => {
        this.commonService.Toaster('Otp Verification successfull!', 'success')
        this.router.navigateByUrl('forgot-password')
        this.commonService.dismissLoading();

      }, error => {
        this.commonService.Toaster(error.error.message, 'danger')
        this.commonService.dismissLoading();

      })
    }
  }

  resendOtp() {
    this.commonService.presentLoading('');
    this.userService.generateOtp({ phone_number: parseInt(localStorage.getItem('phone')), user_type: "u" }, '/authentication/generate-otp').subscribe((res: any) => {
      this.commonService.Toaster('Otp sent register number!', 'success')
      this.commonService.dismissLoading()
    }, error => {
      this.commonService.Toaster(error.error.message, 'danger')
      this.commonService.dismissLoading()
    })
  }

}
