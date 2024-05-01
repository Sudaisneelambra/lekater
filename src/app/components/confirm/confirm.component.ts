import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm',
  standalone:true,
  imports:[],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  
  message!:string
}
