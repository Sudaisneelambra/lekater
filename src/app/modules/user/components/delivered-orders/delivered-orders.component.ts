import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivered-orders',
  templateUrl: './delivered-orders.component.html',
  styleUrls: ['./delivered-orders.component.css']
})
export class DeliveredOrdersComponent {
  allDeliveredOrdersList:any

  constructor(private userService:UserService, private router:Router) {}

  ngOnInit(): void {
    this.allDeliveredOrders()
  }

  allDeliveredOrders(){
    this.userService.allDeliveredOrders().subscribe({
      next:(res)=>{
        this.allDeliveredOrdersList=res?.data
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
