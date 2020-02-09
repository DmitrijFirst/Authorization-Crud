import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ShareModule,
    AppRoutingModule,
    CoreModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
 

  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
