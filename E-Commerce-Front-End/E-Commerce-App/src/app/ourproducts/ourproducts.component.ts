import { Component, OnInit } from '@angular/core';
import { Product } from '../manage/product';
import { Carousel } from '../manage/carousel';
import { Category } from '../manage/category';
import { ProductService } from '../manage/manage.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UploadFileService } from '../manage/manage.file-service';
import { WOW } from 'wowjs/dist/wow.min';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-ourproducts',
  templateUrl: './ourproducts.component.html',
  styleUrls: ['./ourproducts.component.scss']
})
export class OurproductsComponent implements OnInit {



  products: Product[];
  product=new Product;

  productObj=new Product;

selectedpFiles: FileList;
//-----------------------
emailUid='qCv0iprRpzcdX5eLSaP6WMpV9X73';
fbUid='7fHZCwUlZyfLPm8ScDVkOkswM932';



uid: string;
authenticatedName: any;
photoUrl: string;

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
  constructor(private productService: ProductService, private router: Router,public af: AngularFireAuth,
    private uploadFileService:UploadFileService) {

    this.loginProperties();

   }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCarousel();
    this.getAllCategories();
    //remove duplicate
    this.getProductsCategoriesNoDuplicate();
    this.getProductsBrandNoDuplicate();
    this.getProductsColorNoDuplicate();
    this.getProductsNameNoDuplicate();


new WOW().init();


  }



  loginProperties() {
    this.af.authState.subscribe(auth => {
      if (auth !== null) {
        if (!auth.displayName) {
          this.authenticatedName = auth.email;
        } else {
          this.authenticatedName = auth.displayName;
        }
        this.photoUrl = auth.photoURL;
        this.uid = auth.uid;
        console.log('uid: ' + auth.uid);
      }
    });
  }
  

  selectpFile(event) {
    this.selectedpFiles = event.target.files;
  }



  uploadFile() {
    this.uploadFileService.pushFileToStorage(this.selectedpFiles)
      .subscribe(response => {
        if (response.statusText === 'OK') {
          this.addProduct();
        }
      },
        (error) => {
          console.log(error.statusText);
          // YOU MUST NOT CHANGE THIS FORMAT
          alert('Your operation is failed ! please select valid image .');
          this.productReset();
        }
      );
  }





  
  // ADD CONSUMERS
  addProduct(): void {
    this.productService.addProduct(this.productObj)
      .subscribe(response => {
        if (response.statusText === 'OK') {
          alert('Operation success !');

          this.productReset();
          this.loadProduct();
        }
      },
        (error) => {
        });
  }
  productReset(){
    this.productObj=new Product();
  }
loadProduct(){

  if (!localStorage.getItem('foo')) { 
    localStorage.setItem('foo', 'no reload') 
    location.reload() 
  } else {
    localStorage.removeItem('foo') 
  
  }
}
  resetFiles(){
    this.selectedpFiles=null;
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

  sendId(id:string){
this.router.navigate(['productDetails',id]);
  }

  getProductById(id:string){
    this.productService.getProductById(id)
    .subscribe(p=>{
      this.productObj=p;
    });
  }
  deleteProductById(id:string){
    this.productService.deleteProductById(id)
    .subscribe(response=>{
      if(response.statusText==='OK'){
        alert('Delete successfully !');
        this.loadProduct();
      }
    });
  }



}
