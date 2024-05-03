import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  addUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      this.commonService.loadingbooleanValue.next(true);
      this.adminService.addUser(this.addUserForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          this.addUserForm.reset();
          this.commonService.loadingbooleanValue.next(false);
        },
        error: (err) => {
          console.log(err);
          this.commonService.loadingbooleanValue.next(false);
        },
      });
    } else {
      alert('Please check the form for errors');
    }
  }
}
