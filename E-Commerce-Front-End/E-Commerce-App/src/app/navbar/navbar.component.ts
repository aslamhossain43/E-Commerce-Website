import { Component, OnInit} from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { Product } from '../manage/product';
import { ProductService } from '../manage/manage.service';
import { UploadFileService } from '../manage/manage.file-service';
import { Category } from '../manage/category';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
 product=new Product();
 category=new Category();
 categories:Category[];
 // AUTH ID
uid: string;
// FOR MESSGAE
msg = 'offPrpgressBar';
 // FOR FILE
selectedpFiles: FileList;
currentpFileUpload: File;
  constructor(private ngWowService:NgwWowService,private productService:ProductService,
    private uploadFileService:UploadFileService){
    
  }
 

  ngOnInit() {

//get all categories
this.getAllCategories();

//for form
    $('input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea').each(function (element, i) {
      if ((element.value !== undefined && element.value.length > 0) || $(this).attr('placeholder') !== null) {
          $(this).siblings('label').addClass('active');
      }
      else {
          $(this).siblings('label').removeClass('active');
      }
  });

// wow js
 this.ngWowService.init();
     
  }
 
// FOR FILE UPLOAD
selectpFile(event) {
  this.selectedpFiles = event.target.files;
}


  uploadFile() {
    this.msg = '';
    console.log('from uploadFile()')
    this.currentpFileUpload = this.selectedpFiles.item(0);
    this.uploadFileService.pushFileToStorage(this.currentpFileUpload)
      .subscribe(response => {
        if (response.statusText === 'OK') {
          this.addProduct();
        }
      },
        (error) => {
          console.log(error.statusText);
          // YOU MUST NOT CHANGE THIS FORMAT
          alert('Your operation is failed ! please select valid image .');
          this.msg = 'offProgressBar';
          this.productReset();
        }
      );
  }
  
  // FOR CONSUMERS
  // ADD CONSUMERS
  addProduct(): void {
    this.productService.addProduct(this.product)
      .subscribe(response => {
        if (response.statusText === 'OK') {
        //  this.getConsumers();
          alert('Operation success !');
          this.productReset();
          this.msg = 'offProgressBar';
        }
      },
        (error) => {
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
    
      addCategory(): void {
        this.productService.addCategory(this.category)
          .subscribe(response => {
            if (response.statusText === 'OK') {
            //  this.getConsumers();
              alert('Operation success !');
              this.categoryReset();
              this.getAllCategories();
            }
          },
            (error) => {
              alert('Operation failed !');
              
            });
      }
      

      categoryReset():void{
        this.category=new Category();

}
productReset():void{
  this.product=new Product();

}








}
