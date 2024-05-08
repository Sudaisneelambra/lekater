import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = environment.api;
  latestorders:any

  constructor(private http:HttpClient) { }

  CreateOrder(data:any):Observable<any>{
    return this.http.post(`${this.api}/user/createOrder`,data)
  }
  editOrder(data:any):Observable<any>{
    return this.http.post(`${this.api}/user/editOrder`,data)
  }

  getShops():Observable<any>{
    return this.http.get(`${this.api}/user/getShops`)
  }

  getorders():Observable<any>{
    return this.http.get(`${this.api}/user/getOrder`)
  }

  getAllOrders():Observable<any>{
    return this.http.get(`${this.api}/user/getAllOrder`)
  }

  getsingleorderdetails(id:any):Observable<any>{
    return this.http.get(`${this.api}/user/getsingleorderdetails/${id}`)
  }

  orderDeliveried(id:any):Observable<any>{
    return this.http.patch(`${this.api}/user/orderdeliveried/${id}`,{})
  }

  cancelorder(id:any):Observable<any>{
    return this.http.patch(`${this.api}/user/cancelorder/${id}`,{})
  }

  allDeliveredOrders():Observable<any>{
    return this.http.get(`${this.api}/user/allDeliveredOrders`)
  }

  allPendingOrders():Observable<any>{
    return this.http.get(`${this.api}/user/allPendingOrders`)
  }

  allCancelOrder():Observable<any>{
    return this.http.get(`${this.api}/user/allcancelorder`)
  }

  orderdetail(id:any):Observable<any>{
    return this.http.get(`${this.api}/user/orderdetail/${id}`)
  }

}
