import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { Role } from '../features/models';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutPageComponent,

  },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [Role.Admin] } 
}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShareRoutingModule { }
