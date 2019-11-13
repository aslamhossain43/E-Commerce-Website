
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
import { ProductFilterPipe } from './home/home.filter.pipe';
import { ProductServiceForCart } from './app.cart-service';
import { ManageCheckoutComponent } from './manage-checkout/manage-checkout.component';
import { AuthGuard } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { FooterComponent } from './footer/footer.component';
import { SelltousDetailsComponent } from './selltous-details/selltous-details.component';
//facebook messenger
import { FacebookModule } from 'ngx-facebook';

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
     //for filtering
     ProductFilterPipe,
     ManageCheckoutComponent,
     FooterComponent,
     SelltousDetailsComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NgwWowModule,
  //MATERIAL
  NgMaterialModule,
  //for auth
  AngularFireModule.initializeApp(environment.firebase),
// facebook messenger
FacebookModule.forRoot(),
    FormsModule,
    HttpModule,
    // FOR FILE UPLOAD
    HttpClientModule,
    // FOR REACTIVE FORM MODULE
    ReactiveFormsModule
   

  ],
    schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ProductService,UploadFileService,ProductServiceForCart,AuthGuard,AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
