import { Component, ViewChild } from '@angular/core';
import { CommonService } from 'src/shared/services/common.service';
import { OrderService } from 'src/shared/services/order.service';
import { IonContent, IonInput } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('Content', { static: true }) content: IonContent;
  @ViewChild('searchIn', { static: true }) input: IonInput;
  slideOpts = {
    //autoplay: true,
    initialSlide: 0,
    slidesPerView: 3,
    spaceBetween: 0,
    speed: 400,
  };
  items:boolean=false;
  totalItems:any=0;
  slide: boolean = false;
  activeCat: any;
  menuList: any[] = [];
  searchItem: any[] = [];
  catagory: any = [];
  searcher: string = ''
  nonveg: boolean = false;
  string: string='';
  open: boolean = false;
  totalPrice:any=1;
  filterTog:any;
  constructor(public CM: CommonService, private orderService: OrderService,private menu: MenuController,private router:Router) {

  }
  ionViewDidEnter() {
    this.CM.presentLoading('');
    this.presentMenu('')
    this.slide = true;
    this.countTotal()
    this.orderService.Menu('', '', '').subscribe(res => {
      this.catagory=[];
      let T=res.menu;
      T.map(val=>this.catagory.push({ name: val.Category_name, id: val.Category_id }))
    })
  }
  present(item) {
    this.CM.presentModal(item, 'info',(res=>{
      this.presentMenu('')
      this.countTotal()
    }))
  }
  closeSearch(){
    if(this.string.length==0){
      this.open=false;
    }
    console.log('kjgufj')
  }
  
  search() {
   // console.log(this.string)
    this.orderService.order({ string: this.string }).subscribe(res => {
    //  console.log(res)
    })
    if(this.string=='') this.presentMenu('');
  }


  presentMenu(string) {
    this.searchItem=[]
    let cart = JSON.parse(localStorage.getItem('Cart'))
    this.orderService.Menu('', '', string).subscribe(res => {
      if(string==''){
        this.menuList = res.menu;
        
        this.menuList.map(val =>{ 
           val.items.map(T => {
          T.hide = false;
          if (cart && cart.length && cart.find(val => val.obj.id == T.id)) {
            let val = cart.find(val => val.obj.id == T.id);
            T.qty = val.obj.qty;
          } else {
            T.qty = 0;
          }
        })})
        this.CM.dismissLoading();
      }else{
        let searchData=res.menu;
        searchData.map(T => {
          T.hide = false;
          T['id'] = T.category_id;
          if (cart && cart.length && cart.find(val => val.obj.id == T.category_id)) {
            let val = cart.find(val => val.obj.id == T.category_id);
            T['qty'] = val.obj.qty;
          } else {
            T['qty'] = 0;
          }
        })
        this.searchItem=searchData;
      }
     // console.log(res)
    })
    this.countTotal()
    
  }
  check(){
    if(localStorage.getItem('veg')=='true'){
    this.menuList.map(val => val.items.map(T => { if (T.is_veg == false) { localStorage.getItem('veg') == 'true' ? T.hide = true : T.hide = false; } }))
    return 'false';
  }
      return 'true';
  }

  filter(ev) {
    ev.detail.checked?localStorage.setItem('veg','false'):localStorage.setItem('veg','true');
    this.menuList.map(val => val.items.map(T => { if (T.is_veg == false) { localStorage.getItem('veg') == 'true' ? T.hide = true : T.hide = false; } }))
  }
  order(quantity, i, cat) {
    this.menuList.map(val => {
      if (val.Category_id == cat) {
        val.items[i].qty = quantity == true ? val.items[i].qty + 1 : val.items[i].qty > 0 ? val.items[i].qty - 1 : 0;
        this.orderService.addToCart(val.items[i].id, val.items[i]);
        this.totalPrice=quantity==true?this.totalPrice+val.items[i].price:this.totalPrice-val.items[i].price;
      }
    });
    if(localStorage.getItem('Cart')&&JSON.parse(localStorage.getItem('Cart')).length>0){
      
      this.totalItems=JSON.parse(localStorage.getItem('Cart')).length;
    }else{
      this.totalItems=0;
    }
  }
  order2(quantity, i, cat) {
    //console.log(this.searchItem[i])
     
        this.searchItem[i].qty = quantity == true ? this.searchItem[i].qty + 1 : this.searchItem[i].qty > 0 ? this.searchItem[i].qty - 1 : 0;
        this.totalPrice=quantity==true?this.totalPrice+parseFloat(this.searchItem[i].price):this.totalPrice-parseFloat(this.searchItem[i].price);
        this.orderService.addToCart(this.searchItem[i].category_id, this.searchItem[i])
    if(localStorage.getItem('Cart')&&JSON.parse(localStorage.getItem('Cart')).length>0){
      this.items=true;
      this.totalItems=JSON.parse(localStorage.getItem('Cart')).length;
    }else{
      this.totalItems=0;
    }
  }
  toggle(t) {
    this.string='';
    this.open = t == true ? false : true;
    let set=setTimeout(()=>{if(t == false)this.input.setFocus();}, 1000);
  }
  Qty(dish) {
    let cart = JSON.parse(localStorage.getItem('Cart'))
    if (cart && cart.length && cart.find(val => val.obj.id == dish.id)) {
      //console.log(cart.find(val => val.obj.id == dish.id), 'dish')

      return cart.find(val => val.obj.id == dish.id).qty;
    } else {
     // console.log(dish.qty)
      return dish.qty;
    }
  }
  close(){
    this.string='';
    this.presentMenu('');
  }
  gotoTop(id) {
    this.activeCat = id;
    var titleELe = document.getElementById(id);
    this.content.scrollToPoint(0, titleELe.offsetTop - 180, 1000);
    console.log(titleELe.offsetTop-180)
  }
  scroll(ev){
    
    this.catagory.map(val=>{
     let el=document.getElementById(val.id).offsetTop;
    let top=document.getElementById(val.id).offsetTop-ev.detail.scrollTop;
      if(el==top){
        this.activeCat = val.id;
      }
      console.log(el,top,'macth',val.name)
      
    })
  }
  
  countTotal(){
    let  orderItems=[];
    this.totalPrice=0
    if(localStorage.getItem('Cart')){
      this.items=true;
     orderItems=JSON.parse(localStorage.getItem('Cart'))
      if(orderItems.length){
       // console.log('count',orderItems)
        orderItems.map(val=>{
          let price=0;
          price=val.obj.price*val.obj.qty;
         this.totalPrice=this.totalPrice+price;
        })
      }
    }
    this.totalItems=orderItems.length;
  }

  trackOrder(){
    this.CM.presentBillSlide((res)=>{
      if(res&&res.data=='done'){
        this.router.navigateByUrl('/finalOrder')
      }else{
        
      }
      this.presentMenu('')
      this.countTotal()
    })
  }
  
  vegOption(){
    this.CM.presentPopover('')
  }
}
