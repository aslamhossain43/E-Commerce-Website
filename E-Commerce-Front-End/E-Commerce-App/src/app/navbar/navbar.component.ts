import { Component, OnInit} from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { ProductService } from '../manage/manage.service';
import { UploadFileService } from '../manage/manage.file-service';
import { Category } from '../manage/category';
import { ActivatedRoute, Router } from '@angular/router';
import { Carousel } from '../manage/carousel';
import { EmailSending } from '../manage/manage.email';
import { Item } from '../cart-entities/item';
import { Product } from '../cart-entities/product';
import { ProductServiceForCart } from '../app.cart-service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
 product=new Product();
 products:Product[];

 
 category=new Category();
 categories:Category[];
 carousels:Carousel[];
 emailSending=new EmailSending();
 // FOR FILE
selectedpFiles: FileList;
//for carousel files
selectedCFiles: FileList;
carousel=new Carousel();
//-------for cart--------
id:string;
items: Item[] = [];
total: number = 0;

//-----------------------

  constructor(private ngWowService:NgwWowService,private productService:ProductService,
    private uploadFileService:UploadFileService,private router:Router,private activatedRoute:ActivatedRoute,
    private productServiceForCart:ProductServiceForCart){
      this.getAllCarousel();
  }
 

  ngOnInit() {

this.getAllCategories();
this.getAllCarousel();
this.products=this.productServiceForCart.findAll();
//----------------for cart---------------
this.id=this.activatedRoute.snapshot.paramMap.get('id');

if (this.id) {
  var item: Item = {
    product: this.productServiceForCart.find(this.id),
    quantity: 1
  };
  if (localStorage.getItem('cart') === null) {
    let cart: any = [];
    cart.push(JSON.stringify(item));
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.id === this.id) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      cart.push(JSON.stringify(item));
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      let item: Item = JSON.parse(cart[index]);
      item.quantity += 1;
      cart[index] = JSON.stringify(item);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  this.loadCart();
} else {
  this.loadCart();
}

//----------------------------------------



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


this.router.navigate(['productDetails',this.id]);
  }
 



// FOR FILE UPLOAD
selectpFile(event) {
  this.selectedpFiles = event.target.files;
}
// CAROUSEL FILES UPLOAD
selectCFile(event) {
  this.selectedCFiles = event.target.files;
  console.log(this.selectedCFiles);
}

addCarouselPictures(){
this.uploadFileService.pushCarouselFileToStorage(this.selectedCFiles)
.subscribe(response =>{
  if(response.statusText==='OK'){
    alert('Pictures upload success !')
    this.resetCarousel();
this.getAllCarousel();
  }
},
(error)=>{
  alert('Your picture is not uploaded accurately !')
  this.resetCarousel();
  this.getAllCarousel();
});
}
resetCarousel():void{
  this.carousel=new Carousel();
  this.selectedCFiles=null;
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
  
  // FOR CONSUMERS
  // ADD CONSUMERS
  addProduct(): void {
    this.productService.addProduct(this.product)
      .subscribe(response => {
        if (response.statusText === 'OK') {
          alert('Operation success !');
          this.productReset();
        }
      },
        (error) => {
        });
  }
  



 getAllCarousel(): void {
        this.productService.getAllCarousel()
        .subscribe((carousel) => {


          this.carousels = carousel.slice(1);
       
        },
        (error) => {
          console.log(error);
        });
          }

  getAllCategories(): void {
    this.productService.getAllCategories()
    .subscribe((categories) => {
      this.categories = categories;
     
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


      sendingEmail(): void {
        this.productService.emailSending(this.emailSending)
          .subscribe(response => {
            if (response.statusText === 'OK') {
              alert('Email is sent !');
              this.emailSending=new EmailSending();
            
            }
          },
            (error) => {
              alert('Email is not sent !');
              
            });
      }
      

      categoryReset():void{
        this.category=new Category();

}
productReset():void{
  this.product=new Product();

}
//----------------cart---------------
loadCart(): void {
  this.total = 0;
  this.items = [];
  let cart = JSON.parse(localStorage.getItem('cart'));
  for (var i = 0; i < cart.length; i++) {
    let item = JSON.parse(cart[i]);
    this.items.push({
      product: item.product,
      quantity: item.quantity
    });
      
    this.total += item.product.soldPrice * item.quantity;
  }
  localStorage.setItem('total',JSON.stringify(this.total));
}

remove(id: string): void {
  let cart: any = JSON.parse(localStorage.getItem('cart'));
  let index: number = -1;
  for (var i = 0; i < cart.length; i++) {
    let item: Item = JSON.parse(cart[i]);
    if (item.product.id === id) {
      cart.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  this.loadCart();
}
//--------------------------------------------




}
