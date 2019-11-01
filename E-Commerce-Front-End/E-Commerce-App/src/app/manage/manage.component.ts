import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { UploadFileService } from './manage.file-service';
import { ProductService } from './manage.service';
import { Category } from './category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
// FOR NULL
nullValue = null;
// AUTH ID
uid: string;
// FOR MESSGAE
msg = 'offPrpgressBar';
// FOR CONSUMERS
products: Product[];
product = new Product();
// FOR CATEGORY
category=new Category();
categories:Category[];
// FOR FILE
selectedpFiles: FileList;
// FOR NG MATERIAL


constructor(private uploadService: UploadFileService,
  private productService: ProductService) {

  }



// NG LIFE CYCLE
ngOnInit(): void {
  
}


// FOR FILE UPLOAD
selectpFile(event) {
  this.selectedpFiles = event.target.files;
}




uploadFile() {
  this.uploadService.pushFileToStorage(this.selectedpFiles)
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
        this.reset();
      }
    );
}

// ADD CONSUMERS
addProduct(): void {
  this.productService.addProduct(this.product)
    .subscribe(response => {
      if (response.statusText === 'OK') {
      //  this.getConsumers();
        alert('Your operation has been completed successfully !');
        this.reset();
        this.msg = 'offProgressBar';
      }
    },
      (error) => {
      });
}

reset() {
this.product=new Product();

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
            alert('Your operation has been completed successfully !');
            this.reset();
          }
        },
          (error) => {
          });
    }
    
}
