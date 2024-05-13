import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, skipWhile, switchMap } from 'rxjs/operators';
import { Subject, forkJoin, of } from 'rxjs';


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


  constructor(private userService:UserService, private router:Router) {
    this.searchTerms.pipe(
      debounceTime(2000), 
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term.trim() === '') {
          return userService.getAllOrders(this.page)
        } else {
          return this.userService.searchallorder(term, this.page); 
        }

      })).subscribe({
        next:(res)=>{
          this.lengthOfOrder=res.searchedlength
          this.filteredlist=res.data
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }

  ngOnInit(): void {
    this.getAllOrders()
  }

  // get all orders
  getAllOrders(){
    this.userService.getAllOrders(this.page).subscribe({
      next:(res)=>{
        this.filteredlist=res?.data
        this.lengthOfOrder=res.searchedlength
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error:(err)=>{
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
      this.lengthOfOrder=0
      this.searchTerms.next(value)
  }

  // pagination next
  next(){
    this.page+=1
    this.getAllOrders()
  }

  // pagenation prev
  prev(){
    this.page-=1
    this.getAllOrders()
  }

  // pagenation next button show boolean
  nextbuttonshowfunction(){
    if(Math.floor(this.lengthOfOrder/10)>=this.page && length%10 !== 0){
      return true
    } else {
      return false
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

