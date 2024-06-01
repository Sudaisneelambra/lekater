import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-delivered-orders',
  templateUrl: './delivered-orders.component.html',
  styleUrls: ['./delivered-orders.component.css']
})
export class DeliveredOrdersComponent {
  allDeliveredOrdersList:any
  page:number=1
  length!:any
  state:any
  searchValue:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private searchTerms = new Subject<string>();

  constructor(private userService:UserService, private router:Router, private commonService:CommonService) {
    this.searchTerms.pipe(
      debounceTime(1000),
      switchMap((term: string) => {
        if (term.trim() === '') {
          this.state = 'initial'
          return userService.allDeliveredOrders(this.page)
        } else {
          commonService.loadingbooleanValue.next(true)
          return this.userService.searchdeliveredOrder(term, this.page); 
        }

      })).subscribe({
        next:(res)=>{
          commonService.loadingbooleanValue.next(false)
          this.length=res.searchedlength
          this.allDeliveredOrdersList=res.data      
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }

  ngOnInit(): void {
    this.state = 'initial'
    this.allDeliveredOrders()
  }

  allDeliveredOrders(){
    this.userService.allDeliveredOrders(this.page).subscribe({
      next:(res)=>{
        this.allDeliveredOrdersList=res?.data
        this.length=res?.searchedlength
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
    setTimeout(() => {
        this.state = 'search'
    }, 0);
    this.length=0
    this.page=1
    this.searchValue = value
    this.paginator.firstPage();
    this.searchTerms.next(value)
  }


  onPageChange(event:PageEvent){
    this.page=event.pageIndex+1
    console.log(this.page);
    if(this.state == 'initial') {
      this.allDeliveredOrders();
    } else if (this.state == 'search') {
      this.searchTerms.next(this.searchValue)
    }
  }
}
