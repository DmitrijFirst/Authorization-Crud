import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './share/about-page/about-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', 
    redirectTo: 'about' 
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
