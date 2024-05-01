import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-confirm',
  standalone:true,
  imports:[],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit{
  
  message!:string

  constructor(private commonService:CommonService) {}

  ngOnInit() {
      this.commonService.confirmMessage.subscribe((value)=>{
        this.message=value
      })
  }


  cancellation(){
    this.commonService.confirmationBooleanValue.next(false)
  }
}
