import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit{

  allOrdersList:any

  constructor(private userService:UserService) {}

  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders(){
    this.userService.getAllOrders().subscribe({
      next:(res)=>{
        this.allOrdersList=res?.data
        console.log(this.allOrdersList);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
