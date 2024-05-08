import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancelled-orders',
  templateUrl: './cancelled-orders.component.html',
  styleUrls: ['./cancelled-orders.component.css']
})
export class CancelledOrdersComponent {
  
  allCancelOrderList:any

  constructor(private userService:UserService, private router:Router) {}

  ngOnInit(): void {
    this.allCancelOrder()
  }

  allCancelOrder(){
    this.userService.allCancelOrder().subscribe({
      next:(res)=>{
        this.allCancelOrderList=res?.data
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
