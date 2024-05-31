import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = environment.api;

  constructor(private http:HttpClient) { }

  CreateOrder(data:any):Observable<any>{
    return this.http.post(`${this.api}/user/createOrder`,data)
  }
  editOrder(data:any):Observable<any>{
    return this.http.patch(`${this.api}/user/editOrder`,data)
  }

  getShops():Observable<any>{
    return this.http.get(`${this.api}/user/getShops`)
  }

  getorders():Observable<any>{
    return this.http.get(`${this.api}/user/getOrder`)
  }

  getAllOrders(skip:any):Observable<any>{
    return this.http.post(`${this.api}/user/getAllOrder`,{skip})
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

  allDeliveredOrders(page:any):Observable<any>{
    return this.http.post(`${this.api}/user/allDeliveredOrders`,{page})
  }

  allPendingOrders(page:any):Observable<any>{
    return this.http.post(`${this.api}/user/allPendingOrders`,{page})
  }

  allCancelOrder():Observable<any>{
    return this.http.get(`${this.api}/user/allcancelorder`)
  }

  orderdetail(id:any):Observable<any>{
    return this.http.get(`${this.api}/user/orderdetail/${id}`)
  }

  searchallorder(value:any,page:any):Observable<any>{
    return this.http.get(`${this.api}/user/getsearchallorder?searchValue=${value}&page=${page}`)
  }

  searchpendingOrder(value:any, page:any) :Observable<any> {
    return this.http.get(`${this.api}/user/getsearchpendingorder?searchValue=${value}&page=${page}`)
  }

  searchdeliveredOrder(value:any, page:any) :Observable<any> {
    return this.http.get(`${this.api}/user/getsearchdeliveredorder?searchValue=${value}&page=${page}`)
  }

  searchbyDate(value:any):Observable<any>{
    return this.http.get(`${this.api}/user/getsearchbydate?searchValue=${value}`)
  }

}
