import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-ordercreation',
  templateUrl: './ordercreation.component.html',
  styleUrls: ['./ordercreation.component.css']
})
export class OrdercreationComponent {
  formboolean:boolean=false
  create_button_value='Create Order'
  orderForm!:FormGroup

  constructor(private formBuilder: FormBuilder, private commonservice:CommonService) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      shopName: ['', Validators.required],
      itemName: ['', Validators.required],
      fabricNameAndCode: ['', Validators.required],
      imageUrl:['',Validators.required],
      itemDescription: ['', Validators.required],
      orderReceivedDate: ['', Validators.required],
      expectingDeliveryDate: ['', Validators.required]
    });
  }

  OnFileChange(event:any) {
    if(event.target.files[0].name) {
      this.orderForm.get('imageUrl')?.setValue(event.target.files[0].name);
    }
    
  }

  ordercreation(){
    if(!this.formboolean){
      this.formboolean=true
      this.create_button_value='Discard order'
    } else {
      this.formboolean=false
      this.create_button_value='Create Order'
    }
  }

  titles: string[] = ['Title 1', 'Title 2', 'Title 3']

  CreateOrder(){
    if (this.orderForm.valid){
      this.commonservice.confirmationBooleanValue.next(true)
      console.log(this.orderForm.value);
    } else {
      alert('please fill the all fields')
    }
    
  }
}
