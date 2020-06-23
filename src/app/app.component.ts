import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from '@capacitor/core';
import { AuthService } from 'src/shared/services/auth.service';
import { CommonService } from 'src/shared/services/common.service';
const { Network } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  Internet:boolean=true;
  order:boolean=false;
  tableNo:string='';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private CM : CommonService,
    private alertController:AlertController
  ) {
    this.initializeApp();
    let handler = Network.addListener('networkStatusChange', (status) => {
      console.log("Network status changed", status);
      this.Internet=status.connected;
    });
    // To stop listening:
    // handler.remove();
    
    // Get the current network status
    //let status = await Network.getStatus();
  }
  user(T){
    return JSON.parse(localStorage.getItem('current-user'))[T]
  }
  async Logout() {
     this.close()
     this.CM.closeMenu();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Logout!',
      message: 'Are you want to Logout',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Confirm',
          handler: () => {
           this.auth.logout();
          }
        }
      ]
    });

    await alert.present();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  open(ev){
    console.log(ev)
    this.order=localStorage.getItem('order')?true:false;
  }
  close(){
    this.CM.closeMenu();
  }
  table(){
    localStorage.setItem('table',this.tableNo)
  }
}
