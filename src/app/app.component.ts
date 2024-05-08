import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'lekater';
  
  loadingbooleanValue!:boolean

  constructor(private commonservice:CommonService) {}
  
  ngOnInit(): void {
    this.commonservice.loadingbooleanValue.subscribe(value => {
      this.loadingbooleanValue=value
    })
  }
  
}
