import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserHomepageComponent } from './components/homepage/homepage.component';
import { PendingOrdersComponent } from './components/pending-orders/pending-orders.component';
import { DeliveredOrdersComponent } from './components/delivered-orders/delivered-orders.component';
import { CancelledOrdersComponent } from './components/cancelled-orders/cancelled-orders.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { SingleOrderDetailsComponent } from './components/single-order-details/single-order-details.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: 'home', component: UserHomepageComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'pendingOrders', component: PendingOrdersComponent },
            { path: 'deliveredOrders', component: DeliveredOrdersComponent },
            { path: 'cancelledOrders', component: CancelledOrdersComponent },
            { path: 'allOrders', component: AllOrdersComponent },
            { path: 'singleorders/:id', component: SingleOrderDetailsComponent },
        ],
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
