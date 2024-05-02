import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-latest-order',
  templateUrl: './latest-order.component.html',
  styleUrls: ['./latest-order.component.css']
})
export class LatestOrderComponent implements OnInit{

  constructor(private userservice:UserService) {}

  ngOnInit(): void {

    this.getorders()
  }

  getorders(){
      this.userservice.getorders().subscribe({
        next:(res)=>{
          console.log(res?.data);
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }

}
