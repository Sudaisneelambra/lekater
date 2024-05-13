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
import { ErrorComponent } from 'src/app/components/error/error.component';
import { SuccessComponent } from 'src/app/components/success/success.component';
import { PendingOrdersComponent } from './components/pending-orders/pending-orders.component';
import { DeliveredOrdersComponent } from './components/delivered-orders/delivered-orders.component';
import { CancelledOrdersComponent } from './components/cancelled-orders/cancelled-orders.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { SingleOrderDetailsComponent } from './components/single-order-details/single-order-details.component';



@NgModule({
  declarations: [
    UserComponent,
    UserHomepageComponent,
    UserNavBarComponent,
    OrdercreationComponent,
    LatestOrderComponent,
    PendingOrdersComponent,
    DeliveredOrdersComponent,
    CancelledOrdersComponent,
    AllOrdersComponent,
    SingleOrderDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class UserModule { }
