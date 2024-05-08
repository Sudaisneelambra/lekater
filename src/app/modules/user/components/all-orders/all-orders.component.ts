import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit{

  allOrdersList:any[]=[]
  filteredlist:any

  constructor(private userService:UserService, private router:Router) {}

  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders(){
    this.userService.getAllOrders().subscribe({
      next:(res)=>{
        this.allOrdersList=res?.data
        this.filteredlist=res?.data
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  goToTheSingleOrder(id:any) {
    this.router.navigate(['/user/singleorders',id])
  }

  // searching order
  search(value:any){
    
    this.filteredlist= this.allOrdersList.filter((e:any)=>{
      return e.shopdetails[0]?.shopName?.toLocaleLowerCase()?.includes(value?.toLocaleLowerCase()) 
    })
  }
}
