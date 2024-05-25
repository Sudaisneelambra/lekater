import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent {
  allPendingOrdersList:any
  length!:any
  page=1

  private searchTerms = new Subject<string>();

  constructor(private userService:UserService, private router:Router) {
    this.searchTerms.pipe(
      debounceTime(2000), 
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term.trim() === '') {
          return userService.allPendingOrders(this.page)
        } else {
          return this.userService.searchpendingOrder(term, this.page); 
        }

      })).subscribe({
        next:(res)=>{
          this.length=res.length
          this.allPendingOrdersList=res.data
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }

  ngOnInit(): void {
    this.allPendingOrders()
  }

  allPendingOrders(){
    this.userService.allPendingOrders(this.page).subscribe({
      next:(res)=>{
        this.allPendingOrdersList=res?.data
        this.length=res?.length
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    this.allPendingOrders()
  }

  next(){
    this.page +=1
    this.allPendingOrders()
  }

  nextbuttonshowfunction(){
    if(Math.floor(this.length/10)>=this.page && this.length%10 !==0){
      return true
    } else {
      return false
    }
  }

  onPageChange(event:PageEvent){
    this.page=event.pageIndex+1
    console.log(this.page);
    this.allPendingOrders();
  }
}
