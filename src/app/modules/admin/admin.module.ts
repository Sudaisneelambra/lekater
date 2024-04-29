import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    AdminComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
