import { Component, OnInit } from '@angular/core';
import { Product } from '../manage/product';
import { ProductService } from '../manage/manage.service';
import { Carousel } from '../manage/carousel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
products:Product[];
carousels:Carousel[];
activeCarouselId='';
activeCarouselPhoto='';
id:string;

  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCarousel();
    //page refresh
    setTimeout(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
      }, 5000);
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
          sendId(id:string){
           this.id=id;
           console.log('id : '+id);
           this.router.navigate(['productDetails',id]);
          }

}
