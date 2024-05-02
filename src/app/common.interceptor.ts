import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './services/common.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor(private commonservice:CommonService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token')
     request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }) 
    return next.handle(request);
  }
}
