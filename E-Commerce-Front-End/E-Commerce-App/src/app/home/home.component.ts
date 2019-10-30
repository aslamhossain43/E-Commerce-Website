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
  products: Product[];
  lowerToUpperProductsByCategory: Product[];

  lowerToUpperProductsByBrand: Product[];



  upperToLowerProductsByCategory: Product[];

  upperToLowerProductsByBrand: Product[];


  carousels: Carousel[];
  categories: Category[];
  activeCarouselId = '';
  activeCarouselPhoto = '';
  id: string;
  categoriesForFilter: string[];
  brandsForFilter: string[];
  colorsForFilter: string[];
  namesForFilter: string[];
  pricesForFilter: string[];

  //for filtering
  category: string;
  brand: string;
  color: string;
  name: string;
  price: string;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCarousel();
    this.getAllCategories();
    //remove duplicate
    this.getProductsCategoriesNoDuplicate();
    this.getProductsBrandNoDuplicate();
    this.getProductsColorNoDuplicate();
    this.getProductsNameNoDuplicate();


  }

  getAllProducts(): void {
    this.productService.getAllProducts()
      .subscribe((allproducts) => {
        this.products = allproducts;
        this.lowerToUpperProductsByCategory = [];
        this.lowerToUpperProductsByBrand = [];


        this.upperToLowerProductsByCategory = [];
        this.upperToLowerProductsByBrand = [];



      },
        (error) => {
          console.log(error);
        });
  }
  getAllCarousel(): void {
    this.productService.getAllCarousel()
      .subscribe((carousel) => {

        this.activeCarouselId = carousel[0].id;
        this.activeCarouselPhoto = carousel[0].cCode;

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

  getLowerToUpperSortedProductsByCategory(category: string): void {
    this.productService.getProductsByCategory(category)
      .subscribe((products) => {
        this.lowerToUpperProductsByCategory = products.sort((a, b) => a.soldPrice.localeCompare(b.soldPrice));
        this.products = [];
        this.lowerToUpperProductsByBrand = [];


        this.upperToLowerProductsByCategory = [];
        this.upperToLowerProductsByBrand = [];
      },
        (error) => {
          console.log(error);
        });
  }


  getUpperToLowerSortedProductsByCategory(category: string): void {
    this.productService.getProductsByCategory(category)
      .subscribe((products) => {
        this.upperToLowerProductsByCategory = products.sort((a, b) => b.soldPrice.localeCompare(a.soldPrice));
        this.products = [];
        this.lowerToUpperProductsByBrand = [];
        this.lowerToUpperProductsByCategory = [];

        this.upperToLowerProductsByBrand = [];
      },
        (error) => {
          console.log(error);
        });
  }





  getLowerToUpperSortedProductsByBrand(brand: string): void {
    this.productService.getProductsByBrand(brand)
      .subscribe((products) => {
        this.lowerToUpperProductsByBrand = products.sort((a, b) => a.soldPrice.localeCompare(b.soldPrice));
        this.products = [];
        this.lowerToUpperProductsByCategory = [];

        this.upperToLowerProductsByCategory = [];
        this.upperToLowerProductsByBrand = [];

      },
        (error) => {
          console.log(error);
        });
  }



  getUpperToLowerSortedProductsByBrand(brand: string): void {
    this.productService.getProductsByBrand(brand)
      .subscribe((products) => {
        this.upperToLowerProductsByBrand = products.sort((a, b) => b.soldPrice.localeCompare(a.soldPrice));
        this.products = [];
        this.lowerToUpperProductsByCategory = [];
        this.lowerToUpperProductsByBrand = [];
        this.upperToLowerProductsByCategory = [];

      },
        (error) => {
          console.log(error);
        });
  }




  getProductsCategoriesNoDuplicate(): void {
    this.productService.getProductsCategoryNoDuplicate()
      .subscribe((categories) => {
        this.categoriesForFilter = categories;

      },
        (error) => {
          console.log(error);
        });
  }



  getProductsBrandNoDuplicate(): void {
    this.productService.getProductsBrandNoDuplicate()
      .subscribe((brands) => {
        this.brandsForFilter = brands;
      },
        (error) => {
          console.log(error);
        });
  }


  getProductsColorNoDuplicate(): void {
    this.productService.getProductsColorNoDuplicate()
      .subscribe((colors) => {
        this.colorsForFilter = colors;
      },
        (error) => {
          console.log(error);
        });
  }


  getProductsNameNoDuplicate(): void {
    this.productService.getProductsNameNoDuplicate()
      .subscribe((names) => {
        this.namesForFilter = names;
      },
        (error) => {
          console.log(error);
        });
  }
  newFilter() {

    this.category = null;
    this.brand = null;
    this.color = null;
    this.name = null;
    this.getAllProducts();
  }

}
