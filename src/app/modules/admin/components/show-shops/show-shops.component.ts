import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-show-shops',
  templateUrl: './show-shops.component.html',
  styleUrls: ['./show-shops.component.css'],
})
export class ShowShopsComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private commonService: CommonService
  ) {}
  shopList: any;
  ngOnInit(): void {
    this.showAllShops();
  }
  showAllShops() {
    setTimeout(() => {
      this.commonService.loadingbooleanValue.next(true); 
    },0);
    this.adminService.showAllShops().subscribe({
      next: (res) => {
        this.commonService.loadingbooleanValue.next(false);
        this.shopList = res.allShops;
      },
      error: (err) => {
        this.commonService.loadingbooleanValue.next(false);
        console.log(err);
      },
    });
  }

  deleteShop(shopId: any) {
    setTimeout(() => {
      this.commonService.loadingbooleanValue.next(true); 
    },0);
    this.adminService.deleteAndUndoShops(shopId).subscribe({
      next: (res) => {
        this.showAllShops();
        this.commonService.loadingbooleanValue.next(false);
      },
      error: (err) => {
        console.log(err);
        this.commonService.loadingbooleanValue.next(false);
      },
    });
  }
}
