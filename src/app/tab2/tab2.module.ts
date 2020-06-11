import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../components/modal/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { OrderSlideComponentModule } from '../components/order-slide/order-slide.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    OrderSlideComponentModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
