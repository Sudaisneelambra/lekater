import { Component } from '@angular/core';

@Component({
  selector: 'app-usernav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class UserNavBarComponent {

  closeMenu(){
    const menuCheckbox = document.getElementById('menu-btn') as HTMLInputElement;
    if (menuCheckbox.checked) {
      menuCheckbox.checked = false;
    }
  }
}
