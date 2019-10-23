import { Component, OnInit } from '@angular/core';
import { Product } from '../addproducts/product';
import { ProductService } from '../addproducts/addproducts.products-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
products:Product[];
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts()
    .subscribe((allproducts) => {
      this.products = allproducts;
      console.log('from home getAllproducts() '+allproducts);
    },
    (error) => {
      console.log(error);
    });
      }
    


}
