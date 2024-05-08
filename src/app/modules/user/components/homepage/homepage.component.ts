import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class UserHomepageComponent implements OnInit{

  constructor(private userservice:UserService, private activatedrout:ActivatedRoute) {}

  id:any

  ngOnInit(): void {
    this.activatedrout.queryParams.subscribe(params=>{ 
      if(params['id']){
        this.id=params['id']
        
      }
    })
  }

}
