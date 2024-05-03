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

  getShops():Observable<any>{
    return this.http.get(`${this.api}/user/getShops`)
  }

  getorders():Observable<any>{
    return this.http.get(`${this.api}/user/getOrder`)
  }

  getAllOrders():Observable<any>{
    return this.http.get(`${this.api}/user/getAllOrder`)
  }

}
