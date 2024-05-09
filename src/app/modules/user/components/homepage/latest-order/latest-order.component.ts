import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-order',
  templateUrl: './latest-order.component.html',
  styleUrls: ['./latest-order.component.css']
})
export class LatestOrderComponent implements OnInit, DoCheck{

  latestOrders:any
  @Input() order:any

  constructor(private userservice:UserService, private router:Router) {}
 

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
      this.userservice.getorders().subscribe({
        next:(res)=>{
          this.latestOrders = res?.data
          console.log(this.latestOrders);
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }

  goToTheSingleOrder(id:any) {
    this.router.navigate(['/user/singleorders',id])
  }

}
