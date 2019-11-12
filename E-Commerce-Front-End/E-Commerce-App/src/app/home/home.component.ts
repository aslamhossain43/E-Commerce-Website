import { Component, OnInit } from '@angular/core';
import { Product } from '../manage/product';
import { ProductService } from '../manage/manage.service';
import { Carousel } from '../manage/carousel';
import { Router } from '@angular/router';
import { Category } from '../manage/category';
import { AngularFireAuth } from '@angular/fire/auth';
import { UploadFileService } from '../manage/manage.file-service';
import { WOW } from 'wowjs/dist/wow.min';
import { strict } from 'assert';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[];
  product=new Product;

  productObj=new Product;

selectedpFiles: FileList;


deleteId:string;
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
    this.loadProduct();

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
          
          this.productReset();
        
          $("#errorMsgModal").modal('show');
        }
      );
  }





  
  // ADD CONSUMERS
  addProduct(): void {
    this.productService.addProduct(this.productObj)
      .subscribe(response => {
        if (response.statusText === 'OK') {
       
          this.productReset();
          this.loadProduct();
       
          $("#validMsgModal").modal('show');
        }
      },
        (error) => {

          $("#errorMsgModal").modal('show');
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
        });
  }
  getAllCarousel(): void {
    this.productService.getAllCarousel()
      .subscribe((carousel) => {

        this.activeCarouselId = carousel[0].id;
        this.activeCarouselPhoto = carousel[0].cCode;

        this.carousels = carousel.slice(1);
      
      },
        (error) => {
        });
  }


  getAllCategories(): void {
    this.productService.getAllCategories()
      .subscribe((categories) => {
        this.categories = categories;
     
      },
        (error) => {
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
        });
  }




  getProductsCategoriesNoDuplicate(): void {
    this.productService.getProductsCategoryNoDuplicate()
      .subscribe((categories) => {
        this.categoriesForFilter = categories;

      },
        (error) => {
        });
  }



  getProductsBrandNoDuplicate(): void {
    this.productService.getProductsBrandNoDuplicate()
      .subscribe((brands) => {
        this.brandsForFilter = brands;
      },
        (error) => {
        });
  }


  getProductsColorNoDuplicate(): void {
    this.productService.getProductsColorNoDuplicate()
      .subscribe((colors) => {
        this.colorsForFilter = colors;
      },
        (error) => {
        });
  }


  getProductsNameNoDuplicate(): void {
    this.productService.getProductsNameNoDuplicate()
      .subscribe((names) => {
        this.namesForFilter = names;
      },
        (error) => {
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
   this.deleteId=id;
  }

  deletetpProductConfirm(){
    this.productService.deleteProductById(this.deleteId)
    .subscribe(response=>{
      if(response.statusText==='OK'){
        this.loadProduct();

      }
    },
    (error)=>{

    });


  }

removeDeleteId(){
  this.deleteId=null;
}
  

}
