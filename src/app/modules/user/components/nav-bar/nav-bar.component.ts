import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-usernav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class UserNavBarComponent {

  constructor(private commonservice:CommonService) {}

  closeMenu(){
    const menuCheckbox = document.getElementById('menu-btn') as HTMLInputElement;
    if (menuCheckbox.checked) {
      menuCheckbox.checked = false;
    }
  }

  logout(){
    this.commonservice.logout()
  }
}
