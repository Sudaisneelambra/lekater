import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, skipWhile, switchMap, tap } from 'rxjs/operators';
import { Subject, forkJoin, of } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit{

  filteredlist:OrderDetail[]=[]
  page:number=1
  lengthOfOrder!:number
  searchedlength!:number
  searchedlist:OrderDetail[]=[]
  private searchTerms = new Subject<string>();
  state!:string
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchValue!: string;

  constructor(private userService:UserService, private router:Router,private commonservice:CommonService) {
    this.searchTerms.pipe(
      debounceTime(2000),
      switchMap((term: string) => {
        if (term.trim() === '') {
          this.state = 'initial'
          return userService.getAllOrders(this.page)
        } else {
          this.commonservice.loadingbooleanValue.next(true)
          return this.userService.searchallorder(term, this.page); 
        }

      })).subscribe({
        next:(res)=>{
          commonservice.loadingbooleanValue.next(false)
          this.lengthOfOrder=res.searchedlength
          this.filteredlist=res.data
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error:(err)=>{
          commonservice.loadingbooleanValue.next(false)
          commonservice.ErrorbooleanValue.next(true)
          commonservice.errorMessage.next(err.error.message)
          console.log(err);
        }
      })
  }

  ngOnInit(): void {
    this.state='initial'
    this.getAllOrders()
  }

  // get all orders
  getAllOrders(){
    setTimeout(() => {
      this.commonservice.loadingbooleanValue.next(true)
    },);
    this.userService.getAllOrders(this.page).subscribe({
      next:(res)=>{
        this.commonservice.loadingbooleanValue.next(false)
        this.filteredlist=res?.data        
        this.lengthOfOrder=res.searchedlength
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error:(err)=>{
        this.commonservice.loadingbooleanValue.next(false)
        this.commonservice.ErrorbooleanValue.next(true)
        this.commonservice.errorMessage.next(err.error.message)
        console.log(err);
      }
    })
  }


  // got single orders
  goToTheSingleOrder(id:any) {
    this.router.navigate(['/user/singleorders',id])
  }

  // searching order
  search(value:any){
      setTimeout(() => {
        this.state='search'
      }, 0);
      this.lengthOfOrder=0
      this.searchValue = value
      this.page = 1
      this.paginator.firstPage();
      this.searchTerms.next(value)
  }

  pagination(event:PageEvent){
    this.page=event.pageIndex+1
    if(this.state == 'initial') {    
      this.getAllOrders()
    } else if(this.state == 'search') {
      this.searchTerms.next(this.searchValue);
    }
  }
}

interface OrderDetail {
  _id?: string;
  deliveredDate?: Date;
  cancelStatus?: boolean;
  editedPerson: string;
  editStatus: boolean;
  expectingDeliveryDate: Date;
  fabricNameAndCode: string;
  imageUrl: string;
  itemDescription: string;
  itemName: string;
  orderDeliveredStatus: boolean;
  orderReceivedDate: Date;
  orderReceivedBy: string;
  orderReceivedStatus: boolean;
  shopName: string;
  shopdetails?: Shopdetail[];
}

interface Shopdetail {
  shopName: string;
  location: string;
  district: string;
  deleteStatus: boolean;
  _id: string;
}

