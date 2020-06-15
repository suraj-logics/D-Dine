import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/shared/services/common.service';
import { OrderService } from 'src/shared/services/order.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-order-slide',
  templateUrl: './order-slide.component.html',
  styleUrls: ['./order-slide.component.scss'],
})
export class OrderSlideComponent implements OnInit {
  total:any=0;
  orderItems:any[]=[];
  add:boolean=false; 
  order:any={}
  order_description:string;
  orderData:any;
   constructor(public CM:CommonService,private orderService:OrderService,private plateForm:Platform) { 
    this.prepairData();
    console.log(this.plateForm.platforms())

  }

  prepairData(){
    if(localStorage.getItem('Cart')){
      this.orderItems=JSON.parse(localStorage.getItem('Cart'))
      if(this.orderItems.length){
        this.orderItems.map(val=>{
          let price=0;
         price=val.obj.price*val.obj.qty;
         this.total=this.total+price;
         this.order[val.obj.id]=val.obj.qty;
         this.orderData={order_description:this.order_description,order:this.order};
        })
      }
    }else{
      this.orderItems=[];
    }
  }
  changeOrder(quantity,i){
    if(this.orderItems[i]&&this.orderItems[i].obj&&this.orderItems[i].obj.qty){
    this.orderItems[i].obj.qty=quantity==true?this.orderItems[i].obj.qty+1:this.orderItems[i].obj.qty>0?this.orderItems[i].obj.qty-1:0;
    this.total=quantity==true?this.total+this.orderItems[i].obj.price:this.total-this.orderItems[i].obj.price;
  }
    if(this.orderItems[i]&&this.orderItems[i].obj&&this.orderItems[i].obj.qty==0){this.orderItems.splice(i,1); localStorage.setItem('Cart',JSON.stringify(this.orderItems))}
    if(this.orderItems.length)this.orderService.addToCart(this.orderItems[i].id,this.orderItems[i].obj)
    if(this.orderItems.length==0){
      this.CM.dismissModel()
    }
  }
  ngOnInit() {}

  addText(){
    this.add=!this.add;
  }

  orderNow(){
    this.CM.presentLoading('Processing Order');
    this.orderService.order(this.orderData).subscribe(res=>{
      console.log(res,'order data')
       this.CM.dismissLoading();
       this.CM.Toaster('successfully placed order','success')
        localStorage.setItem('Cart','[]')
        if(localStorage.getItem('user_time_id')){
          if(res&&res.message.user_time_id){
            localStorage.setItem('user_time_id',res.message.user_time_id);
          }
        }
        this.CM.dismissModelWithData('order');
    },err=>{
      this.CM.dismissLoading();
      this.CM.Toaster(err.error.message,'danger')
      console.log(err,'order err')
      this.CM.dismissModelWithData('order');
    })
    if(this.plateForm.is('mobileweb')&&!this.plateForm.is('desktop')){
      this.orderService.payNow({amount:this.total})
    }
  }
  
}
