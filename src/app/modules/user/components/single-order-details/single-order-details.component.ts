import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-single-order-details',
  templateUrl: './single-order-details.component.html',
  styleUrls: ['./single-order-details.component.css']
})
export class SingleOrderDetailsComponent implements OnInit{

  id:any
  singleorderData:any

  constructor(private rout:ActivatedRoute, private userservice:UserService,private commonservice:CommonService, private router:Router) {}

  ngOnInit(): void {
    this.rout.paramMap.subscribe(
      (params)=>{
        console.log(params.get('id'));
        this.id=params.get('id')
        if( this.id) {
          this.singleorderdetails(this.id)
        }
      }
    )
  }

  singleorderdetails(id:any){
    this.userservice.getsingleorderdetails(id).subscribe({
      next:(res)=>{
        if(res.data){
          this.singleorderData=res?.data[0]
          console.log(this.singleorderData);
        }
      },
      error:(err)=>{

      }
    })
  }

  deliveried(id:any){
    this.commonservice.confirmationBooleanValue.next(true)
    this.commonservice.confirmMessage.next('are you confirm this order is delivered')
        let one ={}
        const promise = new Promise((resolve,reject)=>{
          one ={
            resolve
          }
        })
        this.commonservice.orderingdata.next(one);

        promise.then(() => {
          this.commonservice.loadingbooleanValue.next(true);
          this.userservice.orderDeliveried(id).subscribe({
            next:(res)=>{
              if (res.success){
                this.commonservice.loadingbooleanValue.next(false)
                this.commonservice.confirmationBooleanValue.next(false)
                this.commonservice.successbooleanValue.next(true)
                this.commonservice.successMessage.next('order deliverying is successfull')
                this.router.navigate(['/'])
                console.log(res);
              } else{
                this.commonservice.loadingbooleanValue.next(false)
                this.commonservice.confirmationBooleanValue.next(false)
              }
            },
            error:(err)=>{
              console.log(err);
              this.commonservice.ErrorbooleanValue.next(true)
              this.commonservice.errorMessage.next('order deliverying is failed')
              this.commonservice.loadingbooleanValue.next(false)
              this.commonservice.confirmationBooleanValue.next(false)
            }
          })
          
    });

    
  }


  cancel(id:any){
    this.commonservice.confirmationBooleanValue.next(true)
    this.commonservice.confirmMessage.next('are you confirm to cancel this  order?')
        let one ={}
        const promise = new Promise((resolve,reject)=>{
          one ={
            resolve
          }
        })
        this.commonservice.orderingdata.next(one);

        promise.then(() => {
          this.commonservice.loadingbooleanValue.next(true);
          this.userservice.cancelorder(id).subscribe({
            next:(res)=>{
              if (res.success){
                this.commonservice.loadingbooleanValue.next(false)
                this.commonservice.confirmationBooleanValue.next(false)
                this.commonservice.successbooleanValue.next(true)
                this.commonservice.successMessage.next('order cancelled successfull')
                this.router.navigate(['/'])
                console.log(res);
              } else{
                this.commonservice.loadingbooleanValue.next(false)
                this.commonservice.confirmationBooleanValue.next(false)
              }
            },
            error:(err)=>{
              console.log(err);
              this.commonservice.ErrorbooleanValue.next(true)
              this.commonservice.errorMessage.next('order cancelation is failed')
              this.commonservice.loadingbooleanValue.next(false)
              this.commonservice.confirmationBooleanValue.next(false)
            }
          })
          
    });

    
  }

  edit(id:any){
    this.router.navigate(['/user/home'],{queryParams:{id:id}})
  }

}
