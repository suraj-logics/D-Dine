import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    FormsModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
