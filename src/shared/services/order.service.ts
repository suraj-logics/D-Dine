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
    params = params.append('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjgyZWI4NDg2MmNiZmU2IiwidG9rZW5fcm9sZSI6InJlc3RhdXJhbnRfaWQifQ.VCu1EYc8x1Fgy8vD-VdkY4iqFUntXzOwtn5XRHZ5Rjg');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any>(environment.api_url + '/merchant/menu', { params: params });
  }

  order(data:any): Observable<any> {
    data['restaurant_id'] = "82eb84862cbfe6"
    data['user_id'] =  JSON.parse(localStorage.getItem('current-user')).id;
    data['order_for'] = "table"
    if(localStorage.getItem('user_time_id'))data['user_time_id']=localStorage.getItem('user_time_id');
    data ['table_no']= localStorage.getItem('table')?localStorage.getItem('table'):'2';
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

  onGoing(){
    // Begin assigning parameters
    let offData = {'user_time_id':  localStorage.getItem('user_time_id'),'offset_minutes': new Date().getTimezoneOffset()}
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(environment.api_url + '/order/transaction-history',offData,httpOptions);
  }

  Feedback(feedback,rate){
    // Begin assigning parameters
    let feedbackData = {
      "restaurant_id": "82eb84862cbfe6",
      "user_time_id": localStorage.getItem('user_time_id'),
      "user_id": JSON.parse(localStorage.getItem('current-user')).id,
      "feedback": feedback,
      "feedback_rating": rate
    }
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(environment.api_url + '/user/feedback',feedbackData,httpOptions);
  }
}
