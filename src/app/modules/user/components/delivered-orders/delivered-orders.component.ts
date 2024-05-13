import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-delivered-orders',
  templateUrl: './delivered-orders.component.html',
  styleUrls: ['./delivered-orders.component.css']
})
export class DeliveredOrdersComponent {
  allDeliveredOrdersList:any
  page:number=1
  length!:any
  private searchTerms = new Subject<string>();

  constructor(private userService:UserService, private router:Router) {
    this.searchTerms.pipe(
      debounceTime(2000), 
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term.trim() === '') {
          return userService.allDeliveredOrders(this.page)
        } else {
          return this.userService.searchdeliveredOrder(term, this.page); 
        }

      })).subscribe({
        next:(res)=>{
          this.length=res.length
          this.allDeliveredOrdersList=res.data
          
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }

  ngOnInit(): void {
    this.allDeliveredOrders()
  }

  allDeliveredOrders(){
    this.userService.allDeliveredOrders(this.page).subscribe({
      next:(res)=>{
        this.allDeliveredOrdersList=res?.data
        this.length=res?.length

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  goToTheSingleOrder(id:any) {
    this.router.navigate(['/user/singleorders',id])
  }

  search(value:any){
    this.length=0
    this.searchTerms.next(value)
  }

  prev(){
    this.page -=1
    this.allDeliveredOrders()
  }

  next(){
    this.page +=1
    this.allDeliveredOrders()
  }

  nextbuttonshowfunction(){
    if(Math.floor(this.length/10)>=this.page && length%10 !== 0){
      return true
    } else {
      return false
    }
  }
}
