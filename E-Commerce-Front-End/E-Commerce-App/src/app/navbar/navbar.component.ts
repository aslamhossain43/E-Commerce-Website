import { Component, OnInit, AfterViewInit} from '@angular/core';
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
import { Fb } from '../manage/fb';
import { Twitter } from '../manage/twitter';
import { Alert } from 'selenium-webdriver';
import { AngularFireAuth } from '@angular/fire/auth';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
 
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
fb=new Fb();
fbLink:Fb;
twitter=new Twitter();
twitterLink:Twitter
//-------for cart--------
id:string;
quantity:number;
items: Item[] = [];
total: number = 0;
cartNumber:number=0;
//-----------------------
emailUid='qCv0iprRpzcdX5eLSaP6WMpV9X73';


  uid: string;
  authenticatedName: any;
  photoUrl: string;

//----------------------
  constructor(private ngWowService:NgwWowService,private productService:ProductService,
    private uploadFileService:UploadFileService,private router:Router,private activatedRoute:ActivatedRoute,
    private productServiceForCart:ProductServiceForCart,public af: AngularFireAuth){
      this.getAllCarousel();
      this.loginProperties();
    
  }
 

  ngOnInit() {

this.getAllCategories();
this.getAllCarousel();
this.getFb();
this.getTwitter();

//----------------for cart---------------
this.products=this.productServiceForCart.findAll();
this.id=this.activatedRoute.snapshot.paramMap.get('id');
this.quantity=+this.activatedRoute.snapshot.paramMap.get('quantity');


//-------------check price quantity two---if two then redirect to cart page--------

if (localStorage.getItem('cart') != null) {
  
let cart: any = JSON.parse(localStorage.getItem('cart'));
 
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.id == this.id) {
        if(this.quantity==2 && item.quantity>=1){
          alert('You cannot add that amount to the cart — we have 2 in stock for you and you already have 1 in your cart. !')
  //return is used to prevent next execution
 return this.router.navigate(['productDetails',this.id]);
        }
          if(item.quantity==2){
  alert('The quantity of this product is already 2. Try other products !')
  //return is used to prevent next execution
 return this.router.navigate(['productDetails',this.id]);
          }
      }
    }
  }
  //-------add cart count------------------
if(this.id){
  if(+localStorage.getItem('cartNumber')!=0){

    this.cartNumber=+localStorage.getItem('cartNumber')+1;

    localStorage.setItem('cartNumber',JSON.stringify(this.cartNumber));
  }else{

    localStorage.setItem('cartNumber',JSON.stringify(1));
  }
}
//------------------------------------------------
//initialize item
if (this.id) {
  var item: Item = {
    product: this.productServiceForCart.find(this.id),
    quantity: this.quantity,
    cart1:1,
    cart2:1
  };
  // when first cart
  if (localStorage.getItem('cart') == null) {
    let cart: any = [];
    item.cart2=0;
    cart.push(JSON.stringify(item));
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    // when any number cart exist
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.id == this.id) {
        index = i;
        break;
      }
    }
    //check cart exist but this id not exist
    if (index == -1) {
      item.cart2=0;
      cart.push(JSON.stringify(item));
      localStorage.setItem('cart', JSON.stringify(cart));
      
    } 
    //cart exist and same id exist
    else {
      let item: Item = JSON.parse(cart[index]);
      item.quantity += this.quantity;
      item.cart2=1;
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
      quantity: item.quantity,
      cart1:item.cart1,
      cart2:item.cart2

    });
      
    this.total += item.product.soldPrice * item.quantity;
  }
  localStorage.setItem('total',JSON.stringify(this.total));
  //---------------------load cart count-------
  this.cartNumber=+localStorage.getItem('cartNumber');
}

remove(id: string): void {
  let cart: any = JSON.parse(localStorage.getItem('cart'));
  let index: number = -1;
  for (var i = 0; i < cart.length; i++) {
    let item: Item = JSON.parse(cart[i]);
    if (item.product.id == id) {
      cart.splice(i, 1);

  //-------------------remove cart count------
  this.cartNumber=+localStorage.getItem('cartNumber');
  let cn=this.cartNumber-+(item.cart1+item.cart2);
  if(cn<0){
    cn=0;
    localStorage.setItem('cartNumber',JSON.stringify(cn));
  }else{
    localStorage.setItem('cartNumber',JSON.stringify(cn));
    
  }


      break;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  this.loadCart();

  //----------------load------------
  if (!localStorage.getItem('foo')) { 
    localStorage.setItem('foo', 'no reload') 
    location.reload() 
    localStorage.removeItem('foo')
  } else {
    localStorage.removeItem('foo') 
  
  }
}
//--------------------------------------------

fbSave(){
  this.productService.addFb(this.fb)
  .subscribe(response => {
   if(response.statusText==='OK'){
     alert('Link added successfully !');
     this.fb=new Fb();
   } 
  },
  (error)=>{

  });
}





getFb():void{

this.productService.getFb()
.subscribe(response=>{
  this.fbLink=response;
},
(error)=>{

});

}





twitterSave(){
  this.productService.addTwitter(this.twitter)
  .subscribe(response => {
   if(response.statusText==='OK'){
     alert('Link added successfully !');
     this.twitter=new Twitter();
   } 
  },
  (error)=>{

  });
}





getTwitter():void{

this.productService.getTwitter()
.subscribe(response=>{
  this.twitterLink=response;
},
(error)=>{

});

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

// LOGOUT
logout() {
  this.af.auth.signOut();
  this.authenticatedName = null;
  this.photoUrl = null;
  
 this.loadPage();
}

loadPage(){

 //----------------load------------
 if (!localStorage.getItem('foo')) { 
  localStorage.setItem('foo', 'no reload') 
  location.reload() 
  localStorage.removeItem('foo')
} else {
  localStorage.removeItem('foo') 

}

}

}
