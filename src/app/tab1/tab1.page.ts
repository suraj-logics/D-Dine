import { Component, ViewChild } from '@angular/core';
import { CommonService } from 'src/shared/services/common.service';
import { OrderService } from 'src/shared/services/order.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  slideOpts = {
    autoplay: true,
    initialSlide: 2,
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween: 15,
    speed: 400,
  };
  slide:boolean=false;
  activeCat:any;
  menuList:any[]=[];
  catagory:any=[];
  searcher:string=''
  nonveg:boolean=false;
  constructor( public CM:CommonService,private orderService:OrderService) {
    
  }
  ionViewDidEnter(){
   let cart=JSON.parse(localStorage.getItem('Cart'))
    this.CM.presentLoading('');
    this.orderService.Menu('', '').subscribe(res=>{
      this.menuList=res.menu;
      this.menuList.map(val=>this.catagory.push({name:val.Category_name,id:val.Category_id}))
      this.menuList.map(val=>val.items.map(T=>{
       T.hide=false;
        if(cart&&cart.length&&cart.find(val=>val.obj.id==T.id)){
          let val=cart.find(val=>val.obj.id==T.id);
          T.qty=val.obj.qty;
        }else{
          T.qty=0;
        }
      }))
      console.log(res)
       this.CM.dismissLoading();
    })
   this.slide=true;
  }
  present(item){
    this.CM.presentModal(item,'info')
  }

  search(){

  }
  filter(){
    this.nonveg=!this.nonveg;
    this.menuList.map(val=>val.items.map(T=>{if(T.is_veg==false){this.nonveg==true?T.hide=true:T.hide=false;}}))
  }
  order(quantity,i,cat){
      this.menuList.map(val=>{
        if(val.Category_name==cat){
        val.items[i].qty=quantity==true?val.items[i].qty+1:val.items[i].qty>0?val.items[i].qty-1:0;
        this.orderService.addToCart(val.items[i].id,val.items[i])
        }
      });
  }

  Qty(dish){
    let cart=JSON.parse(localStorage.getItem('Cart'))
    if(cart&&cart.length&&cart.find(val=>val.obj.id==dish.id)){
      console.log(cart.find(val=>val.obj.id==dish.id),'dish')

      return cart.find(val=>val.obj.id==dish.id).qty;
    }else{
      console.log(dish.qty)
      return dish.qty;
    }
  }
  gotoTop(id) {
    this.activeCat=id;
    let el = document.getElementById(id);
   console.log(el,id,el.scrollHeight)
    el.scrollTop = el.scrollHeight+10
    el.scrollIntoView()
  }
}
