import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css'],
})
export class ShowUserComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  userList: any;
  ngOnInit(): void {
    this.showUsers();
  }
  showUsers() {
    this.adminService.showAllUser().subscribe({
      next: (res) => {
        this.userList = res.userList;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  changeBlockStatus(userId: any) {
    this.adminService.blockAndUnblockUser(userId).subscribe({
      next: (res) => {
        this.showUsers()
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
