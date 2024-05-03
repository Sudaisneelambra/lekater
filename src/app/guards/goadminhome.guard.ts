import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../services/common.service';

export const goadminhomeGuard: CanActivateFn = (route, state) => {

  const token =inject(CommonService).tockendecode()
  if(token && token.type =='admin'){
    return true
    
  } else if (token && token.type =='user'){
    inject(Router).navigate(['user/home'])
    return true
  } else {
    inject(Router).navigate(['login'])
    return true
  }
};
