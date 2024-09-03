import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent {
  allPendingOrdersList:any
  length!:any
  page=1
  state!:string

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private searchTerms = new Subject<string>();
  searchValue: any;
  // searchdate :any

  @ViewChild('searchdate') searchdate!: ElementRef;

  constructor(private userService:UserService, private router:Router, private commonService:CommonService) {
    this.searchTerms.pipe(
      debounceTime(1000),
      switchMap((term: string) => {
        if (term.trim() === '') {
          this.state ='initial'
          this.commonService.loadingbooleanValue.next(true)
          return userService.allPendingOrders(this.page)
        } else {
          this.commonService.loadingbooleanValue.next(true)
          return this.userService.searchpendingOrder(term, this.page); 
        }

      })).subscribe({
        next:(res)=>{
          commonService.loadingbooleanValue.next(false)
          this.length=res.searchedlength
          this.allPendingOrdersList=res.data
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
        },
        error:(err)=>{
          this.commonService.loadingbooleanValue.next(false)
          commonService.ErrorbooleanValue.next(true)
          commonService.errorMessage.next(err.error.message)
          console.log(err);
        }
      })
  }

  ngOnInit(): void {
    this.state ='initial'
    this.allPendingOrders()
    
  }

  allPendingOrders(){
    setTimeout(() => {
      this.commonService.loadingbooleanValue.next(true) 
    });
    this.userService.allPendingOrders(this.page).subscribe({
      next:(res)=>{
        this.commonService.loadingbooleanValue.next(false)
        this.allPendingOrdersList=res?.data
        this.length=res?.searchedlength   
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error:(err)=>{
        this.commonService.loadingbooleanValue.next(false)
        this.commonService.ErrorbooleanValue.next(true)
        this.commonService.errorMessage.next(err.error.message)
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
    if(this.state== 'initial'){
      this.allPendingOrders();
    } else if (this.state == 'search'){
      this.searchTerms.next(this.searchValue)
    } else if (this.state == 'date') {
        this.commonService.loadingbooleanValue.next(true)
        this.userService.searchbyDate(this.searchdate,this.page).subscribe({
          next:(res)=>{
            this.commonService.loadingbooleanValue.next(false)
            if(res.success){
              this.allPendingOrdersList =res.data
              this.length = res?.searchedlength
              window.scrollTo({ top: 0, behavior: 'smooth' });   
            } else{
              console.log(res?.message);
              
            }
          },
          error:(err)=>{
            this.commonService.loadingbooleanValue.next(true)
            this.commonService.ErrorbooleanValue.next(true)
            this.commonService.errorMessage.next(err.error.message)
            console.log(err);
          }
        })
    }
  }

  searchbyDate(val:any){
    if(val?.trim() !== '') {
      this.commonService.loadingbooleanValue.next(true)
      this.state = 'date'
      this.page=1
      this.searchdate = val
      this.userService.searchbyDate(val,this.page).subscribe({
        next:(res)=>{
          this.commonService.loadingbooleanValue.next(false)
          if(res.success){
            this.allPendingOrdersList =res.data
            this.length = res?.searchedlength         
          } else{
            console.log(res?.message);
            
          }
        },
        error:(err)=>{
          this.commonService.loadingbooleanValue.next(false)
          this.commonService.ErrorbooleanValue.next(true)
          this.commonService.errorMessage.next(err.error.message)
          console.log(err);
        }
      })
    }    
  }

  reset(){
    this.allPendingOrders()
    this.searchdate.nativeElement.value=''
  }
}
