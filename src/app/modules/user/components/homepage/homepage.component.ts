import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class UserHomepageComponent implements OnInit{

  constructor(private commonservice:CommonService) {}
  
  booleanValue!:boolean

  ngOnInit() {
    this.commonservice.confirmationBooleanValue.subscribe(value => {
      this.booleanValue=value
    })
  }
}
