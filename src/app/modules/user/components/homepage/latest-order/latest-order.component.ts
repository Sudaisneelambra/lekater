import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-order',
  templateUrl: './latest-order.component.html',
  styleUrls: ['./latest-order.component.css']
})
export class LatestOrderComponent implements OnInit{

  latestOrders:any

  constructor(private userservice:UserService, private router:Router) {}

  ngOnInit(): void {

    this.getorders()
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
