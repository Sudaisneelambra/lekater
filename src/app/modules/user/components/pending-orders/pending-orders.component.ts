import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent {
  allPendingOrdersList:any

  constructor(private userService:UserService, private router:Router) {}

  ngOnInit(): void {
    this.allPendingOrders()
  }

  allPendingOrders(){
    this.userService.allPendingOrders().subscribe({
      next:(res)=>{
        this.allPendingOrdersList=res?.data
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
