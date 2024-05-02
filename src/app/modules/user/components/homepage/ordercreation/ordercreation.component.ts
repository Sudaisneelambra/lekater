import { Component, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordercreation',
  templateUrl: './ordercreation.component.html',
  styleUrls: ['./ordercreation.component.css']
})
export class OrdercreationComponent {
  formboolean:boolean=false
  create_button_value='Create Order'
  orderForm!:FormGroup
  imagePath:any='/assets/images/no-photo-or-blank-image.jpg'
  imageboolean:boolean=false
  formdata!:FormData
  file:any
  shops: Shop[] = []

  constructor(private formBuilder: FormBuilder, private commonservice:CommonService, private userservice:UserService, private router:Router) { }
 

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      shopName: ['', Validators.required],
      itemName: ['', Validators.required],
      fabricNameAndCode: ['', Validators.required],
      itemDescription: ['', Validators.required],
      imageUrl: ['', Validators.required],
      orderReceivedDate: ['', Validators.required],
      expectingDeliveryDate: ['', Validators.required]
    });

    this.getshops()
  }

  getshops(){
    this.userservice.getShops().subscribe({
      next:(res)=>{
        this.shops=res?.data
        console.log(this.shops);
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  OnFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      if (this.file) {
        this.orderForm?.get('imageUrl')?.setValue(this.file)
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          this.imagePath = reader.result;
        };
      }
    }
  }

  ordercreation(){
    if(!this.formboolean){
      this.formboolean=true
      this.create_button_value='Discard order'
    } else {
      this.commonservice.confirmationBooleanValue.next(true)
      this.commonservice.confirmMessage.next('Are you sure you want to discard this order?')
      const data=this.orderForm.value
      const promis= new Promise((resolve,reject)=>{
        data.resolve=resolve
      })
      this.commonservice.orderingdata.next(data)
      promis
      .then(()=>{
        this.commonservice.confirmMessage.next('')
        this.commonservice.confirmationBooleanValue.next(false)
        this.formboolean=false
        this.create_button_value='Create Order'
      })
      
    }
  }

  

  CreateOrder(){
    if (this.orderForm.valid){
      this.commonservice.confirmationBooleanValue.next(true)
      this.commonservice.confirmMessage.next('Thank you for placing your order with us! Before we proceed, we want to confirm the details of your order')
      const data=this.orderForm.value
      const promis= new Promise((resolve,reject)=>{
        data.resolve=resolve
      })

      promis
      .then(()=>{
        this.commonservice.loadingbooleanValue.next(true)
         this.formdata= new FormData()
         this.formdata.append('shopName',data.shopName)
         this.formdata.append('itemName',data.itemName)
         this.formdata.append('fabricNameAndCode',data.fabricNameAndCode)
         this.formdata.append('itemDescription',data.itemDescription)
         this.formdata.append('orderReceivedDate',data.orderReceivedDate)
         this.formdata.append('expectingDeliveryDate',data.expectingDeliveryDate)
         this.formdata.append('imageUrl',this.file)

         this.userservice.CreateOrder(this.formdata).subscribe({
          next:(res)=>{
            if(res.success) {
              this.commonservice.loadingbooleanValue.next(false)
              this.commonservice.confirmationBooleanValue.next(false)
              this.commonservice.confirmMessage.next('')
              this.commonservice.successbooleanValue.next(true)
              this.commonservice.successMessage.next('Order Created Successfully')
              this.orderForm.reset()
              this.file=null
              this.formboolean=false
            }
          },
          error:(err)=>{
            this.commonservice.loadingbooleanValue.next(false)
            this.commonservice.confirmationBooleanValue.next(false)
            this.commonservice.ErrorbooleanValue.next(true)
            this.commonservice.errorMessage.next('Order Creation failed. Please Try Agian.')
            console.log(err);
          }
         })
      
      })
      this.commonservice.orderingdata.next(data)
    } else {
      alert('please fill the all fields')
    }
    
  }


}

interface Shop {
  shopName: string;
  district:string;
  location:string;
  deleteStatus:boolean
}
