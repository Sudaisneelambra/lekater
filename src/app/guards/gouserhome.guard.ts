import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { inject } from '@angular/core';

export const gouserhomeGuard: CanActivateFn = (route, state) => {
  
  const token =inject(CommonService).tockendecode()
  if(token && !token.type || token.type){
    return true
    
  } else if (token && token.type ){
    inject(Router).navigate(['admin/home'])
    return true
  } else {
    inject(Router).navigate(['login'])
    return true
  }
};
