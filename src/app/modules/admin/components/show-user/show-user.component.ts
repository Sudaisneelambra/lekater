import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css'],
})
export class ShowUserComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private commonService: CommonService
  ) {}
  userList: any;
  ngOnInit(): void {
    this.showUsers();
  }
  showUsers() {
    setTimeout(() => {
      this.commonService.loadingbooleanValue.next(true); 
    },0);
    this.adminService.showAllUser().subscribe({
      next: (res) => {
        this.commonService.loadingbooleanValue.next(false);
        this.userList = res.userList;
      },
      error: (err) => {
        this.commonService.loadingbooleanValue.next(false);
        console.log(err);
      },
    });
  }
  changeBlockStatus(userId: any) {
    setTimeout(() => {
      this.commonService.loadingbooleanValue.next(true); 
    },0);
    this.adminService.blockAndUnblockUser(userId).subscribe({
      next: (res) => {
        this.commonService.loadingbooleanValue.next(false);
        this.showUsers();
      },
      error: (err) => {
        this.commonService.loadingbooleanValue.next(false);
        console.log(err);
      },
    });
  }
}
