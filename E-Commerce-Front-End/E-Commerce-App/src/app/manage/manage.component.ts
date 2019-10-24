import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { UploadFileService } from './manage.file-service';
import { ProductService } from './manage.service';
import { Category } from './category';

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
currentpFileUpload: File;
// FOR NG MATERIAL




// FOR FORM FIELD
// categoryFormControl = new FormControl('', [Validators.required]);
// nameFormControl = new FormControl('', [Validators.required]);
// colorFormControl = new FormControl('', [Validators.required]);
// quantityFormControl = new FormControl('', [Validators.required]);
// priceFormControl = new FormControl('', [Validators.required]);
// selectedPFileControl = new FormControl('', [Validators.required]);
// FOR CONSTRUCTOR
constructor(private uploadService: UploadFileService,
  private productService: ProductService) {
  //  this.af.authState.subscribe(authentication => {
  //  this.consumer.uid = authentication.uid;
  //  this.uid = authentication.uid;
  //  console.log(this.consumer.uid);
  //  });
  }

// biodataForm: FormGroup = new FormGroup({
//   name: this.nameFormControl,
//   color: this.colorFormControl,
//   category: this.categoryFormControl,
//   quantity: this.quantityFormControl,
//   price: this.priceFormControl,
  // FOR RESET PURPOSE ONLU
  //selectedPFile: this.selectedPFileControl
  
//});
// FOR STRING VALIDATION
// getRequiredErrorMessageForString(field) {
//   if (this.biodataForm.get(field).hasError('required')) {
//     return this.biodataForm.get(field).hasError('required') ? 'You must enter ' + field : '';
//   }
// }

// NG LIFE CYCLE
ngOnInit(): void {
  //this.getAllCategories();
}


// FOR FILE UPLOAD
selectpFile(event) {
  this.selectedpFiles = event.target.files;
}

// GET CUURENT YEAR CONSUMERS
// getConsumers(): void {
// this.consumerService.getCurrentYearAllConsumers()
// .subscribe((currentYearAllConsumers) => {
//   this.consumers = currentYearAllConsumers;
//   console.log(this.consumers);
// });
// }



uploadFile() {
  this.msg = '';
  console.log('from uploadFile()')
  this.currentpFileUpload = this.selectedpFiles.item(0);
  this.uploadService.pushFileToStorage(this.currentpFileUpload)
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

// FOR CONSUMERS
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
