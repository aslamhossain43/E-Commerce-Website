import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
{path:'',component:HomeComponent},
{path:'manage',component:ManageComponent},
{path:'addProducts',component:AddproductsComponent},
{path:'category',component:CategoryComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } export const 
RoutingComponent = [HomeComponent];
