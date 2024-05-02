import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { UserHomepageComponent } from './components/homepage/homepage.component';
import { UserNavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdercreationComponent } from './components/homepage/ordercreation/ordercreation.component';
import { LatestOrderComponent } from './components/homepage/latest-order/latest-order.component';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    UserComponent,
    UserHomepageComponent,
    UserNavBarComponent,
    OrdercreationComponent,
    LatestOrderComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmComponent,
    LoadingComponent,
    HttpClientModule
  ]
})
export class UserModule { }
