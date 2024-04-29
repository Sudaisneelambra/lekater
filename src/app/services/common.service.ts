import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  api = environment.api;

  login(data:any):Observable<any>{
    return this.http.post(`${this.api}/user/login`, data)
  }

}
