import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-order-details',
  templateUrl: './single-order-details.component.html',
  styleUrls: ['./single-order-details.component.css']
})
export class SingleOrderDetailsComponent implements OnInit{

  id:any

  constructor(private rout:ActivatedRoute) {}

  ngOnInit(): void {
    this.rout.paramMap.subscribe(
      (params)=>{
        console.log(params.get('id'));
        this.id=params.get('id')
        if( this.id) {
          
        }
      }
    )
  }

}
