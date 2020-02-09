import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire' ; 
import { AngularFireDatabaseModule } from '@angular/fire/database' ; 
import { environment } from 'src/environments/environment';
import { LayoutModule } from '@angular/cdk/layout';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    LayoutModule
  ]
})
export class CoreModule { }
