
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';import {trigger,state,style,animate,transition}from '@angular/animations';

//mdb
import { MDBBootstrapModule, ModalModule } from 'angular-bootstrap-md';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AboutusComponent } from './aboutus/aboutus.component';
import { OurproductsComponent } from './ourproducts/ourproducts.component';
import { SelltousComponent } from './selltous/selltous.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgwWowModule } from 'ngx-wow';
import { ProductService } from './manage/manage.service';
import { UploadFileService } from './manage/manage.file-service';
import { NgMaterialModule } from './app.materials';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ManageComponent,
    NavbarComponent,
    AboutusComponent,
    OurproductsComponent,
    SelltousComponent,
    ContactusComponent,
    CheckoutComponent,
    ProductDetailsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NgwWowModule,
    
  //MATERIAL
  NgMaterialModule,
  

    FormsModule,
    HttpModule,
    // FOR FILE UPLOAD
    HttpClientModule,
    // FOR REACTIVE FORM MODULE
    ReactiveFormsModule
   

  ],
    schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ProductService,UploadFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
