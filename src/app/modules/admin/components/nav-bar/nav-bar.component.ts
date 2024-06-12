import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router:Router){}
  logout(){
    const confirm = window.confirm('Are you sure to Log Out')
    if(confirm){
      localStorage.clear()
      this.router.navigate([''])
    }
    
  }
  closeMenu(){
    const menuCheckbox = document.getElementById('menu-btn') as HTMLInputElement;
    if (menuCheckbox.checked) {
      menuCheckbox.checked = false;
    }
  }
}
