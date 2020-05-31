import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router:Router,private Toast:ToastController) { }
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
}
