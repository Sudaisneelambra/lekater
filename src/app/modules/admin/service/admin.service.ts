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
}
