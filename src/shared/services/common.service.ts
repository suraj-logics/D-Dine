import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from 'src/app/components/modal/explore-container.component';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { OrderSlideComponent } from 'src/app/components/order-slide/order-slide.component';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  currentPage:string;
  constructor(
    private router:Router,
    private Toast:ToastController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public popoverController: PopoverController) { }
  navigate(url){
 this.router.navigateByUrl(url)
  }
 
  async Toaster(msg,color){
    //"primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", and "dark"
    const toast = await this.Toast.create({
      message: msg,
      duration: 2000,
      //cssClass:'toast'
      color
    });
    toast.present();
  }

  async presentModal(data,info,callback) {
    const modal = await this.modalController.create({
      component: ExploreContainerComponent,
      cssClass: 'custom-modal',
      swipeToClose: true,
      componentProps: {data,show:info}
    });
    modal.onDidDismiss()
    .then((data) => {
     console.log(data,'modal data')
     callback(true)
  });
    return await modal.present();
  }

  async presentBillSlide(callback) {
    const modal = await this.modalController.create({
      component: OrderSlideComponent,
      swipeToClose: true,
    });
    modal.onDidDismiss()
      .then((data) => {
       console.log(data,'modal data')
       callback(true)
    });

    return await modal.present();
  }



async dismissModel(){
  return await this.modalController.dismiss()
}
async dismissModelWithData(role){
  return await this.modalController.dismiss(role)
}
  async presentLoading(msg) {
    const loading = await this.loadingController.create({
      message: msg,
        spinner: 'crescent',
        duration: 5000,
        translucent: false,
        cssClass: 'custom-class custom-loading'
    });
    await loading.present();

  }
  async dismissLoading() {
    await this.loadingController.dismiss();
  }
  
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component:PopoverComponent ,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  async dismissPopover(){
    return await this.popoverController.dismiss();
  }
}
