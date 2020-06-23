import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, PopoverController, MenuController, AlertController } from '@ionic/angular';
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
    public popoverController: PopoverController,
    private menu: MenuController,
    private alertController:AlertController) { }
  navigate(url){
 this.router.navigateByUrl(url)
  }
  async presentAlertConfirm(msg,callback) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            callback()
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
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
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  closeMenu(){
    this.menu.close()
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
      cssClass: 'custom-modal2',
      swipeToClose: true,
      mode:'ios'
    });
    modal.onDidDismiss()
      .then((data) => {
       console.log(data,'modal data')
       callback(data)
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
      translucent: true,
      componentProps: {screen:'popover'},
      //mode:'ios'
    });
    popover.onDidDismiss()
    .then((data) => {
     console.log(data,'modal data')
     ev(true)
  });
    return await popover.present();
  }
  async dismissPopover(){
    return await this.popoverController.dismiss();
  }

  async presentModalAlert(screen,data) {
    const modal = await this.modalController.create({
      component: PopoverComponent,
      swipeToClose: true,
      cssClass: screen,
      componentProps: {screen,data}
    });
    return await modal.present();
  }

}
