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

const routes: Routes = [
{path:'',component:HomeComponent},
{path:'manage',component:ManageComponent},

{path:'aboutUs',component:AboutusComponent},
{path:'ourProducts',component:OurproductsComponent},
{path:'sellToUs',component:SelltousComponent},
{path:'contactUs',component:ContactusComponent},

{path:'productDetails/:id',component:ProductDetailsComponent},
{path:'checkOut',component:CheckoutComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
