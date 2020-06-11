import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/shared/services/common.service';
import { OrderService } from 'src/shared/services/order.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() data: any;
  @Input() show: string;
  view:string='';
  public form = [
    { val: 'Sweet', isChecked: false },
    { val: 'Spicy', isChecked: false },
    { val: 'Jain', isChecked: false }
  ];
  constructor( public CM:CommonService,private orderService:OrderService) { 

  }

  ngOnInit() {
    console.log(this.show,'fakshfdi')
    this.view=this.show;

  }
  // order(quantity){
  //   if(quantity==true){
  //     this.data.qty=this.data.qty+1;
  // }
  //   if(quantity==false){
  //     this.data.qty=this.data.qty>0?this.data.qty-1:0;
  // }
  // }
  order(quantity){
    this.data.qty=quantity==true?this.data.qty+1:this.data.qty>0?this.data.qty-1:0;
      this.orderService.addToCart(this.data.id,this.data)
      }
}
