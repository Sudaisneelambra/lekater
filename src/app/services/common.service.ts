import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  api = environment.api;

  confirmMessage:BehaviorSubject<string> = new BehaviorSubject<string>('')

  confirmationBooleanValue:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  login(data:any):Observable<any>{
    return this.http.post(`${this.api}/user/login`, data)
  }

}
