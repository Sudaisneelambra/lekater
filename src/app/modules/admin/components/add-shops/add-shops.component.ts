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
      this.commonService.loadingbooleanValue.next(true);
      this.adminService.addShop(this.shopForm.value).subscribe({
        next: (res) => {
          this.commonService.loadingbooleanValue.next(false);
          alert(res.message);
          if (res.success) {
            this.shopForm.reset();
          }
        },
        error: (err) => {
          this.commonService.loadingbooleanValue.next(false);
          console.log(err);
        },
      });
    } else {
      this.shopForm.markAllAsTouched();
    }
  }
}
