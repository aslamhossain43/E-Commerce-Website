
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgMaterialModule } from './app.materials';
import { NgxBootstrapModule } from './app.ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';import {trigger,state,style,animate,transition}from '@angular/animations';

// FOR bootstrap
import { AppBootstrapModule } from './app-bootstrap.module';
//mdb
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, NgModule} from '@angular/core';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material';
import { UploadFileService } from './addproducts/addProduct.upload-service';
import { ProductService } from './addproducts/addproducts.products-service';
import { HttpModule } from '@angular/http';
import { BsModalService } from 'ngx-bootstrap';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from './category/category.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ManageComponent,
    NavbarComponent,
    AddproductsComponent,
    CategoryComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgMaterialModule,
    NgxBootstrapModule,
    MDBBootstrapModule.forRoot(),
  

    FormsModule,
    HttpModule,
    // FOR FILE UPLOAD
    HttpClientModule,
    // FOR NG MATERIAL
    MatPaginatorModule,
    NgMaterialModule,
    // FOR REACTIVE FORM MODULE
    ReactiveFormsModule,
   

    // FOR BOOTSTRAP
    AppBootstrapModule
  ],
  
    schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ProductService,UploadFileService,BsModalService,CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
