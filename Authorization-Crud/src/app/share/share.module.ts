import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from '../core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from '../core/interceptors/err.interceptor';
import { fakeBackendProvider } from '../features/fake-beckend-auth/fake-beckend';
import { ThousandPipe } from './pipes/num.pipe';
import { AddComponent } from './add/add.component';
import { SharedRoutingModule } from './share-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteComponent } from './modal_components/delete/delete.component';
import { EmpInfoComponent } from './modal_components/emp-info/emp-info.component';
import { UpdateComponent } from './modal_components/update/update.component';


@NgModule({
  declarations: [ 
    HomeComponent, 
    LoginComponent, 
    ThousandPipe, 
    AddComponent, 
    EmpInfoComponent, 
    DeleteComponent, 
    UpdateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedRoutingModule,
    MatDialogModule, 
    BrowserAnimationsModule
  ], 
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
],
  exports: [HomeComponent,LoginComponent],
  entryComponents: [EmpInfoComponent, DeleteComponent,UpdateComponent]
})
export class ShareModule { }
