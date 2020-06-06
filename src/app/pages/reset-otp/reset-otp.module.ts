import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetOtpPageRoutingModule } from './reset-otp-routing.module';

import { ResetOtpPage } from './reset-otp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResetOtpPageRoutingModule
  ],
  declarations: [ResetOtpPage]
})
export class ResetOtpPageModule { }
