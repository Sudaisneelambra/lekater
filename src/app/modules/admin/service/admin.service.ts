import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  api = environment.api

  addUser(userData:any):Observable<any>{
    return this.http.post(`${this.api}/admin/adduser`, userData)
  }
  showAllUser():Observable<any>{
    return this.http.get(`${this.api}/admin/showUsers`)
  }
  blockAndUnblockUser(userId:any):Observable<any>{
    return this.http.patch(`${this.api}/admin/changeStatus`, {userId})
  }
  addShop(shopData:any):Observable<any>{
    return this.http.post(`${this.api}/admin/addshop`, shopData)
  }
}
