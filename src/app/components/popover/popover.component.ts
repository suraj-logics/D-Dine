import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { CommonService } from 'src/shared/services/common.service';
import { OrderService } from 'src/shared/services/order.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() screen: string;
  feedback:string='';
  rate:any=0;
  obj={};

  constructor(private auth: AuthService , private CM : CommonService,private orderService :OrderService) {
  }
  Logout() {
    this.auth.logout();
  }
  ngOnInit() {}
  submit(){
    this.orderService.Feedback(this.feedback,this.rate).subscribe(resp=>{
      console.log(resp)
      this.CM.Toaster('Thank you for feedback','medium')
     })
  }
  close(){
    this.CM.dismissModel();
  }
  change(ev){
    
  }
}
