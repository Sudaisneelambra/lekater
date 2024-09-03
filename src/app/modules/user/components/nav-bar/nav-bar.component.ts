import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-usernav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class UserNavBarComponent implements OnInit{

  token:any
  constructor(private commonservice:CommonService) {}


  ngOnInit(): void {
       this.token = this.commonservice.tockendecode();
       
  }

  closeMenu(){
    const menuCheckbox = document.getElementById('menu-btn') as HTMLInputElement;
    if (menuCheckbox.checked) {
      menuCheckbox.checked = false;
    }
  }

  logout(){

    const confirm = window.confirm('Are you sure to Log Out')
    if(confirm){
      this.commonservice.logout()
      this.commonservice.ErrorbooleanValue.next(false)
    }
    
  }
}
