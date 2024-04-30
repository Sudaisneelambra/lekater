import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminComponent,
    NavBarComponent,
    HomepageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule
  ]
})
export class AdminModule { }
