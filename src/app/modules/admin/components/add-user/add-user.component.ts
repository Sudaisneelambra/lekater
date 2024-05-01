import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  addUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
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
      console.log(this.addUserForm.value);
      this.adminService.addUser(this.addUserForm.value).subscribe({
        next: (res) => {
          console.log(res);
          alert(res.message);
          this.addUserForm.reset()
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      alert('Please check the form for errors');
    }
  }
}
