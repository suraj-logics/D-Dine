import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/shared/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loginform: FormGroup;
  isSubmitted = false;
  hLogin:boolean=true;

  constructor(private formBuilder: FormBuilder,private CM:CommonService,private router:Router) {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get errorControl() {
    return this.loginform.controls;
  }

 
   hClick(h){
    h==true?this.hLogin=true:this.hLogin=false;
    //this.CM.Toaster('kdjfaj','danger')
   }
  ngOnInit() {
  }

  onLogin() {
    this.isSubmitted = true;
    this.router.navigateByUrl('/dashboard/tab2')
  // if (!this.loginform.valid) {
  //   console.log('Please provide all the required values!')
  //   return false;
  // } else {
  //   console.log(this.loginform.value)
  // }
  }
  signUp(){
    this.router.navigateByUrl('/register')
  }

}
