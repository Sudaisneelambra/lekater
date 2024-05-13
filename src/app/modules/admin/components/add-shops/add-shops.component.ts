import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-shops',
  templateUrl: './add-shops.component.html',
  styleUrls: ['./add-shops.component.css'],
})
export class AddShopsComponent {
  shopForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.shopForm = this.formBuilder.group({
      shopName: ['', Validators.required],
      location: ['', Validators.required],
      district: ['', Validators.required],
    });
  }

  addShop() {
    if (this.shopForm.valid) {
      this.commonService.confirmationBooleanValue.next(true)
      this.commonService.confirmMessage.next('Do you confirm to add this Shop')
      const data =this.shopForm.value
      const promis = new Promise((resolve,reject)=>{
        data.resolve= resolve
       })

       promis.then(()=>{
        this.commonService.loadingbooleanValue.next(true)
        this.adminService.addShop(this.shopForm.value).subscribe({
          next: (res) => {
            this.commonService.successbooleanValue.next(true)
            this.commonService.successMessage.next(res.message)
            this.commonService.confirmationBooleanValue.next(false)
            this.commonService.confirmMessage.next('')
            this.shopForm.reset();
            this.commonService.loadingbooleanValue.next(false);
          },
          error: (err) => {
            console.log(err);
            this.commonService.ErrorbooleanValue.next(true)
            this.commonService.errorMessage.next(err.error.message)
            this.commonService.confirmationBooleanValue.next(false)
            this.commonService.confirmMessage.next('')
            this.commonService.loadingbooleanValue.next(false);
          },
        });
       })
       this.commonService.orderingdata.next(data);
    } else {
      this.shopForm.markAllAsTouched();
    }
  }
}
