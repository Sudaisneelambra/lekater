import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';
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
  orderingData:any

  constructor(private commonService:CommonService,private userServive:UserService) {}

  ngOnInit() {
      this.commonService.confirmMessage.subscribe((value)=>{
        this.message=value
      })

      this.commonService.orderingdata.subscribe((value)=>{
        this.orderingData=value
      })
  }


  cancellation(){
    this.commonService.confirmationBooleanValue.next(false)
    this.commonService.confirmMessage.next('')
  }

  confirm(){
    this.orderingData?.resolve()
   
  }
}
