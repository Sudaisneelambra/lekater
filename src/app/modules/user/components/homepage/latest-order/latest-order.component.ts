import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-latest-order',
  templateUrl: './latest-order.component.html',
  styleUrls: ['./latest-order.component.css']
})
export class LatestOrderComponent implements OnInit, DoCheck{

  latestOrders:any
  @Input() order:any

  constructor(private userservice:UserService, private router:Router,private commonService:CommonService) {}
 

  ngOnInit(): void {
    this.getorders()
  }

  ngDoCheck(): void {
    if(this.order===false){
      this.getorders()
      this.order=true
    }
  }

  getorders(){
      this.commonService.loadingbooleanValue.next(true)
      this.userservice.getorders().subscribe({
        next:(res)=>{
        this.commonService.loadingbooleanValue.next(false)
          this.latestOrders = res?.data
          
        },
        error:(err)=>{
        this.commonService.loadingbooleanValue.next(false)
          console.log(err);
          
        }
      })
  }

  goToTheSingleOrder(id:any) {
    this.router.navigate(['/user/singleorders',id])
  }

}
