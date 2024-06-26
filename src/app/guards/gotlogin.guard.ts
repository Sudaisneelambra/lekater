import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { inject } from '@angular/core';

export const gotloginGuard: CanActivateFn = (route, state) => {

  const tocken= inject(CommonService).tockendecode();

  if(!tocken) {
    return true

  } else if (tocken && !tocken?.type ) {
    inject(Router).navigate(['user/home'])

  } else if (tocken && tocken?.type){
    inject(Router).navigate(['admin/home'])

  }
  
  return true;
};
