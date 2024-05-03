import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient, private router:Router) { }

  api = environment.api;

  confirmMessage:BehaviorSubject<string> = new BehaviorSubject<string>('')
  errorMessage:BehaviorSubject<string> = new BehaviorSubject<string>('')
  successMessage:BehaviorSubject<string> = new BehaviorSubject<string>('')


  confirmationBooleanValue:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  loadingbooleanValue:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  ErrorbooleanValue:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  successbooleanValue:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  orderingdata:BehaviorSubject<object>= new BehaviorSubject<object>({})


  tockendecode() {

    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/'])
  }
  

  login(data:any):Observable<any>{
    return this.http.post(`${this.api}/user/login`, data)
  }

}
