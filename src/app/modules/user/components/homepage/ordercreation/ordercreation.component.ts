import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ordercreation',
  templateUrl: './ordercreation.component.html',
  styleUrls: ['./ordercreation.component.css']
})
export class OrdercreationComponent {
  formboolean:boolean=false
  create_button_value='Create Order'
  orderForm!:FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the form group and define form controls with validators
    this.orderForm = this.formBuilder.group({
      shopName: ['', Validators.required],
      itemName: ['', Validators.required],
      fabricNameAndCode: ['', Validators.required],
      itemDescription: ['', Validators.required],
      orderReceivedDate: ['', Validators.required],
      expectingDeliveryDate: ['', Validators.required]
    });
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
      console.log(this.orderForm.value);
    } else {
      alert('please fill the all fields')
    }
    
  }
}
