import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-show-shops',
  templateUrl: './show-shops.component.html',
  styleUrls: ['./show-shops.component.css'],
})
export class ShowShopsComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  shopList: any;
  ngOnInit(): void {
    this.showAllShops();
  }
  showAllShops() {
    this.adminService.showAllShops().subscribe({
      next: (res) => {
        this.shopList = res.allShops;
        console.log(this.shopList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteShop(shopId: any) {
    console.log(shopId);
    this.adminService.deleteAndUndoShops(shopId).subscribe({
      next: (res) => {
        console.log(res);
        this.showAllShops()
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
