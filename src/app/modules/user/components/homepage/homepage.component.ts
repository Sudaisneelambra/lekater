import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class UserHomepageComponent implements OnInit{

  constructor(private commonservice:CommonService) {}
  
  confirmbooleanValue!:boolean
  loadingbooleanValue!:boolean

  ngOnInit() {
    this.commonservice.confirmationBooleanValue.subscribe(value => {
      this.confirmbooleanValue=value
    })
    this.commonservice.loadingbooleanValue.subscribe(value => {
      this.loadingbooleanValue=value
    })
  }
}
