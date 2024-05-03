import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  constructor(private commonService:CommonService){}
  loadingValue!:Boolean;

  ngOnInit(): void {
    this.commonService.loadingbooleanValue.subscribe(val=>{
      this.loadingValue=val;
    })
  }

}
