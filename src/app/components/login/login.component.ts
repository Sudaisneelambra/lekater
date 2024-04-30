import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  message!:string
  errormessage!:string
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {}
  loginForm!: FormGroup;
  loginButton: Boolean = false;

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.errormessage=''
    this.message=''
    this.loginButton = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.commonService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if(res.success) {
            this.message=res.message
          } else {
            this.errormessage=res.message
          }
        },
        error: (err) => {
          this.errormessage=err.error.message
          console.log(err);
        },
      });
    } else {
      alert('fill the fields or fill in correct formate');
    }
  }
}
