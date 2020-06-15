import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  Menu(user, url,string): Observable<any> {
    let params = new HttpParams();
    // Begin assigning parameters
    let role=string!=''?'User':'Merchant';
    params = params.append('role', role);
    params = params.append('restaurant_id', '82eb84862cbfe6');
    if(string!='')params = params.append('string', string);
    params = params.append('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjgyZWI4NDg2MmNiZmU2In0.NOlL0F6fU22xEc23UKK4WNJz49sG0hDR9wlaqORRnEY');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any>(environment.api_url + '/merchant/menu', { params: params });
  }

  order(data:any): Observable<any> {
    data['restaurant_id'] = "036b2b50-76a1-31dc-94e7-b17af7fbc47d"
    data['user_id'] = "d509dfb6-eca8-3223-b81e-0aa6f3b0e8cf"
    //let user_time_id = "d509dfb6-eca8-3223-b81e-0aa6f3b0e8cf_06_06_2020_11_05_08"
    data['order_for'] = "table"
    data ['table_no']= "1"
    console.log(data,'order data')
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(environment.api_url + '/order', data, httpOptions);
  }

  addToCart(id, obj) {
    let data: any = [];
    if (localStorage.getItem('Cart')) {
      data = JSON.parse(localStorage.getItem('Cart'));
      if (data.find(val => val.id == id)) {
        data.map((e, i) => {
          if (e.id == id) {
            if (obj && obj.qty != 0) {
              e.obj = obj;
            } else {
              data.splice(i, 1);
            }
          }
        })
        localStorage.setItem('Cart', JSON.stringify(data));
      } else {
        if (obj && obj.qty != 0) {
          data = JSON.parse(localStorage.getItem('Cart'));
          data.push({ id, obj })
          localStorage.setItem('Cart', JSON.stringify(data))
        }
      }
    } else {
      localStorage.setItem('Cart', JSON.stringify([{ id, obj }]))
    }

  }

  payNow(data){
    window.open('upi://pay?pa=pmcares@sbi&pn=PM%20CARES&mc=9400&am='+data.amount+'&cu=INR&tn=App Payment')
  }
}
