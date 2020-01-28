import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './about-page/about-page.component';
import { ReactiveFormsModule }    from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ShareRoutingModule } from './share-routing.module';



@NgModule({
  declarations: [AboutPageComponent, HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
    
  ], 
  exports: [AboutPageComponent,HomeComponent]
})
export class ShareModule { }
