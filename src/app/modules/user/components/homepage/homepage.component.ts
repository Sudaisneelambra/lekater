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
  ErrorbooleanValue!:boolean
  successbooleanValue!:boolean

  ngOnInit() {
    this.commonservice.confirmationBooleanValue.subscribe(value => {
      this.confirmbooleanValue=value
    })
    this.commonservice.loadingbooleanValue.subscribe(value => {
      this.loadingbooleanValue=value
    })
    this.commonservice.ErrorbooleanValue.subscribe(value => {
      this.ErrorbooleanValue=value
    })
    this.commonservice.successbooleanValue.subscribe(value => {
      this.successbooleanValue=value
    })
  }
}
