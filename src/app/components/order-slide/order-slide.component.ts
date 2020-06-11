import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/shared/services/common.service';
import { OrderService } from 'src/shared/services/order.service';

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
   constructor(public CM:CommonService,private orderService:OrderService) { 
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
  }
}
