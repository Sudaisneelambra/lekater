import { Component, DoCheck, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ordercreation',
  templateUrl: './ordercreation.component.html',
  styleUrls: ['./ordercreation.component.css'],
})
export class OrdercreationComponent {
  formboolean: boolean = false;
  create_button_value = 'Create Order';
  orderForm!: FormGroup;
  imagePath: any = '/assets/images/no-photo-or-blank-image.jpg';
  imageboolean: boolean = false;
  formdata!: FormData;
  file: any;
  shops: Shop[] = [];
  orderId: any;
  orderdetails: any;
  filteredshop:any
  @Output() reloadevent= new EventEmitter<any>()

  @ViewChild('shopname') selectedShopName!:ElementRef
  @ViewChild('location') selectedShopLocation!:ElementRef
  @ViewChild('district') selectedShopDistrict!:ElementRef

  isSearching: boolean = false;

  @Input() id: any;


  constructor(
    private formBuilder: FormBuilder,
    private commonservice: CommonService,
    private userservice: UserService,
    private router: Router,
    private rout: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      shopName: ['', Validators.required],
      itemName: ['', Validators.required],
      fabricNameAndCode: ['', Validators.required],
      itemDescription: ['', Validators.required],
      imageUrl: ['', Validators.required],
      orderReceivedDate: ['', Validators.required],
      expectingDeliveryDate: ['', Validators.required],
    });

    // getting shops
    this.getshops();

    // getting single order details for edit form
    if (this.id) {
      this.formboolean = true;
      this.create_button_value = 'Discard Order';
      this.getsingleOrder();
    }
  }

  // getting latest shops
  getshops() {
    this.userservice.getShops().subscribe({
      next: (res) => {
        this.shops = res?.data;
        // this.filteredshop=res?.data
      },
      error: (err) => {
        console.log(err);
        this.commonservice.ErrorbooleanValue.next(true)
        this.commonservice.errorMessage.next('shop getting failed. Please try again')
      },
    });
  }

  // geting single order details
  getsingleOrder() {
    this.userservice.orderdetail(this.id).subscribe({
      next: (res) => {
        this.orderdetails = res.data;
        const shopDetails= res.data.shopdetails[0]
        this.selectedShopName.nativeElement.value = shopDetails?.shopName
        this.selectedShopLocation.nativeElement.value= shopDetails?.location
        this.selectedShopDistrict.nativeElement.value= shopDetails?.district
        this.orderForm.get('shopName')?.setValue(this.orderdetails?.shopName);
        this.orderForm.get('itemName')?.setValue(this.orderdetails?.itemName);
        this.orderForm
          .get('fabricNameAndCode')
          ?.setValue(this.orderdetails?.fabricNameAndCode);
        this.orderForm
          .get('itemDescription')
          ?.setValue(this.orderdetails?.itemDescription);
        this.orderForm
          .get('orderReceivedDate')
          ?.setValue(this.formatDate(this.orderdetails?.orderReceivedDate));
        this.orderForm
          .get('expectingDeliveryDate')
          ?.setValue(this.formatDate(this.orderdetails?.expectingDeliveryDate));
        this.imagePath = this.orderdetails?.imageUrl;
      },
      error: (err) => {
        console.log(err);
        this.commonservice.ErrorbooleanValue.next(true);
        this.commonservice.errorMessage.next('something went wrong');
      },
    });
  }

  // file change for image selection
  OnFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      if (this.file) {
        this.orderForm?.get('imageUrl')?.setValue(this.file);
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          this.imagePath = reader.result;
        };
      }
    }
  }

  // order creation button for form visible oor not visible
  ordercreation() {
    if (!this.formboolean) {
      this.formboolean = true;
      this.create_button_value = 'Discard order';
    } else {
      this.commonservice.confirmationBooleanValue.next(true);
      this.commonservice.confirmMessage.next(
        'Are you sure you want to discard this order?'
      );
      let one = {};
      const promis = new Promise((resolve, reject) => {
        one = {
          resolve,
        };
      });
      this.commonservice.orderingdata.next(one);
      promis.then(() => {
        this.commonservice.confirmMessage.next('');
        this.commonservice.confirmationBooleanValue.next(false);
        this.formboolean = false;
        this.create_button_value = 'Create Order';
        this.id=null
        this.router.navigate(['/user/home'])
      });
    }
  }


  // creating order
  CreateOrder() {
    if (this.orderForm.valid) {
      this.commonservice.confirmationBooleanValue.next(true);
      this.commonservice.confirmMessage.next(
        'Thank you for placing your order with us! Before we proceed, we want to confirm the details of your order'
      );
      const data = this.orderForm.value;
      const promis = new Promise((resolve, reject) => {
        data.resolve = resolve;
      });

      promis.then(() => {
        this.commonservice.loadingbooleanValue.next(true);
        this.formdata = new FormData();
        this.formdata.append('shopName', data.shopName);
        this.formdata.append('itemName', data.itemName);
        this.formdata.append('fabricNameAndCode', data.fabricNameAndCode);
        this.formdata.append('itemDescription', data.itemDescription);
        this.formdata.append('orderReceivedDate', data.orderReceivedDate);
        this.formdata.append(
          'expectingDeliveryDate',
          data.expectingDeliveryDate
        );
        this.formdata.append('imageUrl', this.file);

        this.userservice.CreateOrder(this.formdata).subscribe({
          next: (res) => {
            if (res.success) {
              this.commonservice.loadingbooleanValue.next(false);
              this.commonservice.confirmationBooleanValue.next(false);
              this.commonservice.confirmMessage.next('');
              this.commonservice.successbooleanValue.next(true);
              this.commonservice.successMessage.next(
                'Order Created Successfully'
              );
              this.reloadevent.emit(false)
              this.orderForm.reset();
              this.file = null;
              this.formboolean = false;
              this.create_button_value='Create Order'
              this.imagePath = '/assets/images/no-photo-or-blank-image.jpg';
            }
          },
          error: (err) => {
            this.commonservice.loadingbooleanValue.next(false);
            this.commonservice.confirmationBooleanValue.next(false);
            this.commonservice.ErrorbooleanValue.next(true);
            this.commonservice.errorMessage.next(
              'Order Creation failed. Please Try Agian.'
            );
            console.log(err);
          },
        });
      });
      this.commonservice.orderingdata.next(data);
    } else {
      alert('please fill the all fields');
    }
  }


  // editOrder
  editOrder(){
    if (this.orderForm.valid) {
      this.commonservice.confirmationBooleanValue.next(true);
      this.commonservice.confirmMessage.next(
        'Thank you for placing your order with us! Before we proceed, we want to confirm the details of your order'
      );
      const data = this.orderForm.value;
      data.orderId= this.orderdetails._id
      const promis = new Promise((resolve, reject) => {
        data.resolve = resolve;
      });

      promis.then(() => {
        this.commonservice.loadingbooleanValue.next(true);
        this.formdata = new FormData();
        this.formdata.append('shopName', data.shopName);
        this.formdata.append('itemName', data.itemName);
        this.formdata.append('fabricNameAndCode', data.fabricNameAndCode);
        this.formdata.append('itemDescription', data.itemDescription);
        this.formdata.append('orderReceivedDate', data.orderReceivedDate);
        this.formdata.append(
          'expectingDeliveryDate',
          data.expectingDeliveryDate
        );
        this.formdata.append('imageUrl', this.file);
        this.formdata.append('orderId', data.orderId);

        this.userservice.editOrder(this.formdata).subscribe({
          next: (res) => {
            if (res.success) {
              this.commonservice.loadingbooleanValue.next(false);
              this.commonservice.confirmationBooleanValue.next(false);
              this.commonservice.confirmMessage.next('');
              this.commonservice.successbooleanValue.next(true);
              this.commonservice.successMessage.next(
                'Order Edited Successfully'
              );
              this.reloadevent.emit(false)
              this.imagePath = '/assets/images/no-photo-or-blank-image.jpg';
              this.create_button_value='Create Order'
              this.orderForm.reset();
              this.file = null;
              this.formboolean = false;
              this.id=null
            }
          },
          error: (err) => {
            this.commonservice.loadingbooleanValue.next(false);
            this.commonservice.confirmationBooleanValue.next(false);
            this.commonservice.ErrorbooleanValue.next(true);
            this.commonservice.errorMessage.next(
              'Order editing failed. Please Try Agian.'
            );
            console.log(err);
          },
        });
      });
      this.commonservice.orderingdata.next(data);
    } else {
      alert('please fill the all fields');
    }
  }

  // convert the date into mm-dd-yyyy formate
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  shopName(value:any){
    this.isSearching = true;
    if(value !== ''){
      this.filtershop(value)
      this.selectedShopLocation.nativeElement.value= ''
      this.selectedShopDistrict.nativeElement.value=''
      this.orderForm.get('shopName')?.patchValue('');
      
    } else {
      this.filteredshop=[]
    }
  }

  // filtering shops for toggle
  filtershop(value:any){
    this.filteredshop= this.shops.filter((e)=>{
      return e.shopName.toLocaleLowerCase().includes(value.toLocaleLowerCase()) 
    })
    
  }

  shopSelection(shop:any){
    this.orderForm.get('shopName')?.patchValue(shop?._id);
    this.selectedShopName.nativeElement.value = shop?.shopName
    this.selectedShopLocation.nativeElement.value= shop?.location
    this.selectedShopDistrict.nativeElement.value= shop?.district
    this.filteredshop=[]
    this.isSearching = false;
    console.log(this.orderForm.value);
    
    
  }
}

interface Shop {
  _id: string;
  shopName: string;
  district: string;
  location: string;
  deleteStatus: boolean;
}
