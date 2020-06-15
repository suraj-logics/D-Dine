import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service'
import { CommonService } from 'src/shared/services/common.service';
import { OrderService } from 'src/shared/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
currentPage='cart'
CartList:any[]=[];
Orders:any []=[];
History:any[]=[];
public form = [
  { val: 'Sweet', isChecked: false },
  { val: 'Spicy', isChecked: false },
  { val: 'Jain', isChecked: false }
];
constructor(private activatedRoute: ActivatedRoute, public CM:CommonService,private orderService:OrderService,private auth:AuthService,private router:Router) {
  console.log(window.location.pathname)
  if(window.location&&window.location.pathname=='/dashboard/tab3')this.currentPage='cart';
  if(window.location&&window.location.pathname=='/dashboard/tab2')this.currentPage='order';
}
ionViewDidEnter(){
  if(localStorage.getItem('Cart')){
    this.CartList=JSON.parse(localStorage.getItem('Cart'))
  }else{
    this.CartList=[];
  }
}
  
  segmentChanged(event){
   this.currentPage=event.detail.value+'';
  }

  order(quantity,i){
    if(this.CartList[i]&&this.CartList[i].obj&&this.CartList[i].obj.qty)
      this.CartList[i].obj.qty=quantity==true?this.CartList[i].obj.qty+1:this.CartList[i].obj.qty>0?this.CartList[i].obj.qty-1:0;
      if(this.CartList[i].obj.qty==0){this.CartList.splice(i,1); localStorage.setItem('Cart',JSON.stringify(this.CartList))}
      this.orderService.addToCart(this.CartList[i].id,this.CartList[i].obj)
     // this.CartList=JSON.parse(localStorage.getItem('Cart'))
  }
  remove(i){
    console.log(i,this.CartList)
    this.CartList.splice(i,1);
   localStorage.setItem('Cart',JSON.stringify(this.CartList))
  }
  move(){
    this.router.navigateByUrl('/tab1')
  }
 
  
  
}
