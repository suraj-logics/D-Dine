import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetOtpPageRoutingModule } from './reset-otp-routing.module';

import { ResetOtpPage } from './reset-otp.page';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResetOtpPageRoutingModule,
    NgOtpInputModule
  ],
  declarations: [ResetOtpPage]
})
export class ResetOtpPageModule { }
