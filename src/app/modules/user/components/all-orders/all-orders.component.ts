import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit{

  // allOrdersList:any[]=[]
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
      switchMap((term: string) => this.userService.searchTerms(term,this.page))).subscribe({
        next:(res)=>{
          this.searchedlength=res.searchedlength
          this.searchedlist=res.data
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }

  ngOnInit(): void {
    this.getAllOrders()
    this.getlengthofaorders()
  }

  // get all orders
  getAllOrders(){
    this.userService.getAllOrders(this.page).subscribe({
      next:(res)=>{
        this.filteredlist=res?.data
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  // get allrders length
  getlengthofaorders(){
    this.userService.getlengthofallorder().subscribe({
      next:(res)=>{
        this.lengthOfOrder=res?.data
        console.log(this.lengthOfOrder);
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
    if(value.trim()==''){
      this.getAllOrders()
    } else {
      this.searchTerms.next(value)
    }
  }

  next(){
    this.page+=1
    this.getAllOrders()
  }

  prev(){
    this.page-=1
    this.getAllOrders()
  }

  nextbuttonshowfunction(){
    if(Math.floor(this.lengthOfOrder/10)>=this.page){
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

