import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-add-shops',
  templateUrl: './add-shops.component.html',
  styleUrls: ['./add-shops.component.css'],
})
export class AddShopsComponent {
  shopForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
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
      this.adminService.addShop(this.shopForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          if (res.success) {
            this.shopForm.reset();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.shopForm.markAllAsTouched();
    }
  }
}
