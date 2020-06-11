import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderSlideComponent } from './order-slide.component';
import { CommonService } from 'src/shared/services/common.service';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [OrderSlideComponent],
  entryComponents:[OrderSlideComponent],
  providers:[CommonService],
  exports: [OrderSlideComponent]
})
export class OrderSlideComponentModule {}
