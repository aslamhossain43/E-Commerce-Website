import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { Product } from '../manage/product';
import { ProductService } from '../manage/manage.service';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceForCart } from '../app.cart-service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
id:string;
  product=new Product();
  products:Product[];
  quantity:number=1;
  constructor(private productService:ProductService,private route:ActivatedRoute,private productServiceForCart:ProductServiceForCart) {

this.id=this.route.snapshot.paramMap.get('id');

if (!localStorage.getItem('foo')) { 
  localStorage.setItem('foo', 'no reload') 
  location.reload() 
} else {
  localStorage.removeItem('foo') 

}

   }

  ngOnInit() {
    this.getProductById();
    this.getProductsByIdForSameCategoryAndBrand();

  }


getProductById(){
  this.productService.getProductById(this.id)
  .subscribe((productById) => {
    this.product = productById;
  });
}


getProductsByIdForSameCategoryAndBrand(): void {
  this.productService.getProductsByIdForSameCategoryAndBrand(this.id)
  .subscribe((allproducts) => {
    this.products = allproducts;
  },
  (error) => {
    console.log(error);
  });
    }


}
