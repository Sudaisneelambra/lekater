import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserHomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: 'home', component: UserHomepageComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
