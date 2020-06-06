import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetOtpPage } from './reset-otp.page';

const routes: Routes = [
  {
    path: '',
    component: ResetOtpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetOtpPageRoutingModule {}
