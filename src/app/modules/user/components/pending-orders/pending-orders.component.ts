import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent {
  allPendingOrdersList:any
  length!:any
  page=1
  startindex!:number
  endindex!:number
  data!:any

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
    this.startindex=0
    this.endindex=0
    this.allPendingOrders()
  }

  allPendingOrders(){
    this.userService.allPendingOrders(this.page).subscribe({
      next:(res)=>{
        this.data=res?.data
        console.log(this.data);
        this.startindex=(this.page-1)*10
        this.endindex=this.startindex+10
        this.allPendingOrdersList=this.data.slice(this.startindex,this.endindex)
        console.log(this.allPendingOrdersList);
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
    this.startindex=(this.page-1)*10
    this.endindex=this.startindex+10
    this.allPendingOrdersList=this.data.slice(this.startindex,this.endindex)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  next(){
    this.page +=1
    this.startindex=(this.page-1)*10
    this.endindex=this.startindex+10
    this.allPendingOrdersList=this.data.slice(this.startindex,this.endindex)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextbuttonshowfunction(){
    if(Math.floor(this.length/10)>=this.page && this.length%10 !==0){
      return true
    } else {
      return false
    }
  }
}
