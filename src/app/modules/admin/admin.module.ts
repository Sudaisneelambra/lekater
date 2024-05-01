import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowUserComponent } from './components/show-user/show-user.component';



@NgModule({
  declarations: [
    AdminComponent,
    NavBarComponent,
    HomepageComponent,
    AddUserComponent,
    ShowUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
