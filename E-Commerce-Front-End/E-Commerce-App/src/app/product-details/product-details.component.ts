import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Product } from '../manage/product';
import { ProductService } from '../manage/manage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
id:string;
  product=new Product();
  constructor(private productService:ProductService,private route:ActivatedRoute) {

this.id=this.route.snapshot.paramMap.get('id');
//console.log('product details : '+this.id)
//this.getProductById();
   }

  ngOnInit() {
    console.log('product details ng oninit: '+this.id)

    this.getProductById();
  }


getProductById(){
  console.log('product details getby id: '+this.id)

  this.productService.getProductById(this.id)
  .subscribe((productById) => {
    this.product = productById;
  });
}





}
