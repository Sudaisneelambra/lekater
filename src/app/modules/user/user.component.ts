import { Component } from "@angular/core";
import { CommonService } from "src/app/services/common.service";

@Component({
    selector:'app-user',
    templateUrl:'./user.component.html',
    styleUrls:['./user.component.css']
})

export class UserComponent{
 
    
  constructor(private commonservice:CommonService) {}
  
  confirmbooleanValue!:boolean
  ErrorbooleanValue!:boolean
  successbooleanValue!:boolean

  ngOnInit() {
    this.commonservice.confirmationBooleanValue.subscribe(value => {
      this.confirmbooleanValue=value
    })

    this.commonservice.ErrorbooleanValue.subscribe(value => {
      this.ErrorbooleanValue=value
    })
    
    this.commonservice.successbooleanValue.subscribe(value => {
      this.successbooleanValue=value
    })
  }
}