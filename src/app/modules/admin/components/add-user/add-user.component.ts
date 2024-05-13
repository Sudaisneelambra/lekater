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
     this.commonService.confirmationBooleanValue.next(true)
     this.commonService.confirmMessage.next('Do you confirm to add this user')
     const data =this.addUserForm.value
     const promis = new Promise((resolve,reject)=>{
      data.resolve= resolve
     })

     promis.then(()=>{
      this.commonService.loadingbooleanValue.next(true)
      this.adminService.addUser(this.addUserForm.value).subscribe({
        next: (res) => {
          this.commonService.successbooleanValue.next(true)
          this.commonService.successMessage.next(res.message)
          this.commonService.confirmationBooleanValue.next(false)
          this.commonService.confirmMessage.next('')
          this.addUserForm.reset();
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
      alert('Please check the form for errors');
    }
  }
}
