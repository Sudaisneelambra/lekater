import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-single-order-details',
  templateUrl: './single-order-details.component.html',
  styleUrls: ['./single-order-details.component.css']
})
export class SingleOrderDetailsComponent implements OnInit{

  id:any
  singleorderData:any

  constructor(private rout:ActivatedRoute, private userservice:UserService) {}

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

}
