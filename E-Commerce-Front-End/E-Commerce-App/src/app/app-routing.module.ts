import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { OurproductsComponent } from './ourproducts/ourproducts.component';
import { SelltousComponent } from './selltous/selltous.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageCheckoutComponent } from './manage-checkout/manage-checkout.component';
import { SelltousDetailsComponent } from './selltous-details/selltous-details.component';

const routes: Routes = [
{path:'',component:HomeComponent},
{path:'manage',component:ManageComponent},
{path:'manageCheckout',component:ManageCheckoutComponent},



{path:'aboutUs',component:AboutusComponent},

{path:'sellToUs/sellToUs/:id',component:SelltousDetailsComponent},
{path:'ourProducts',component:OurproductsComponent},
{path:'sellToUs',component:SelltousComponent},
{path:'contactUs',component:ContactusComponent},

{path:'productDetails/:id',component:ProductDetailsComponent},
{path:'productDetails/:id/navbar/:id/:quantity',component:NavbarComponent},

{path:'checkOut',component:CheckoutComponent}


];
// usehash when integrate with spring boot then to reload page it is used
@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
