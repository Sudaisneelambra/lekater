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
          this.length=res.searchedlength
          this.allPendingOrdersList=res.data
          console.log(this.length);

          
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


  onPageChange(event:PageEvent){
    this.page=event.pageIndex+1
    console.log(this.page);
    this.allPendingOrders();
  }

  searchbyDate(val:any){
    if(val?.trim() !== '') {
      this.userService.searchbyDate(val).subscribe({
        next:(res)=>{
          if(res.success){
            this.allPendingOrdersList =res.data
            this.length = this.allPendingOrdersList?.length
          } else{
            console.log(res?.message);
            
          }
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }    
  }
}
