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
  }

  confirm(){
    const formdata= new FormData()
    formdata.append('shopName',this.orderingData.shopName)
    formdata.append('itemName',this.orderingData.itemName)
    formdata.append('fabricNameAndCode',this.orderingData.fabricNameAndCode)
    formdata.append('imageUrl',this.orderingData.imageUrl)
    formdata.append('itemDescription',this.orderingData.itemDescription)
    formdata.append('orderReceivedDate',this.orderingData.orderReceivedDate)
    formdata.append('expectingDeliveryDate',this.orderingData.expectingDeliveryDate)
    this.userServive.CreateOrder(formdata).subscribe({
      next:(res)=>{

      },
      error:(err)=>{
        
      }
    })
  }
}
