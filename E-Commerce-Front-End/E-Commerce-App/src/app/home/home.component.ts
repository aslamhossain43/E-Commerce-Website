import { Component, OnInit } from '@angular/core';
import { Product } from '../manage/product';
import { ProductService } from '../manage/manage.service';
import { Carousel } from '../manage/carousel';
import { Router } from '@angular/router';
import { Category } from '../manage/category';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
products:Product[];
carousels:Carousel[];
categories:Category[];
activeCarouselId='';
activeCarouselPhoto='';
id:string;

  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCarousel();
   this.getAllCategories();
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
      getAllCarousel(): void {
        this.productService.getAllCarousel()
        .subscribe((carousel) => {

           this.activeCarouselId=carousel[0].id;
           this.activeCarouselPhoto=carousel[0].cCode;

          this.carousels = carousel.slice(1);
          console.log(carousel);
        },
        (error) => {
          console.log(error);
        });
          }
         

          getAllCategories(): void {
            this.productService.getAllCategories()
            .subscribe((categories) => {
              this.categories = categories;
              console.log(categories);
            },
            (error) => {
              console.log(error);
            });
              }

}
