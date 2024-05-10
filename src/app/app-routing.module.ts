import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { gouserhomeGuard } from './guards/gouserhome.guard';
import { gotloginGuard } from './guards/gotlogin.guard';
import { goadminhomeGuard } from './guards/goadminhome.guard';

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent,
    canActivate:[gotloginGuard]
  },
  {
    path: 'admin',
    canActivate:[goadminhomeGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((e) => e.AdminModule),
  },
  {
    path: 'user',
    canActivate:[gouserhomeGuard],
    loadChildren: () =>
      import('./modules/user/user.module').then((e) => e.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
