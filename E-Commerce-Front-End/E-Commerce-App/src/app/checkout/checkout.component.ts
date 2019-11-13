import { Component, OnInit, Output } from '@angular/core';
import { ProductServiceForCart } from '../app.cart-service';
import { Product } from '../cart-entities/product';
import { Item } from '../cart-entities/item';
import { Person } from '../manage/person';
import { ProductService } from '../manage/manage.service';
import { PersonAndProductsCombinedForCheckOut } from '../manage/checkout';
import { ProductsForCheckOut } from '../manage/productsforcheckout';
import { Router } from '@angular/router';


declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {



items: Item[]=[];
personAndProductsCombinedForCheckOut=new PersonAndProductsCombinedForCheckOut();
productsForCheckOuts:ProductsForCheckOut[]=[];
product=new Product();
cartNumber:string;
promo_code_proxy:string;
promo_code_original:string;
person=new Person();
cashOnDelivery:boolean;
saveInfo:boolean;
total:number=0;
  constructor(private productService:ProductService,private productServiceForCart:ProductServiceForCart,private router:Router) {

   }

  ngOnInit() {


//for cart
  this.items=this.productServiceForCart.allItemsFromLocalStorage();
  this.getTotal();
  this.cartNumber=JSON.parse(localStorage.getItem('cartNumber'));
this.promo_code_original='TIZARAMART'+Math.random().toString(36).substring(1,36);

this.promo_code_proxy=Math.random().toString(36).substring(1,36);

if(localStorage.getItem('person')!=null){
this.person=JSON.parse(localStorage.getItem('person'));
this.saveInfo=true;
this.cashOnDelivery=true;
}


  }

  continueCheckout():void{

    this.items.forEach(element => {
      //if id not null then it is not work in server for cascadeType.ALL
      element.product.id=null;
      element.product.quantity=''+element.quantity;
this.productsForCheckOuts.push(element.product);      
    });
    this.personAndProductsCombinedForCheckOut.productsForCheckOuts=this.productsForCheckOuts;
    if (localStorage.getItem('promo_code_proxy')!=null) {
      
      this.person.promoCode=this.promo_code_original;
    } else {
      this.person.promoCode='';
      localStorage.setItem('promo_code_proxy',JSON.stringify(this.promo_code_proxy));
    }

if(localStorage.getItem('person')==null){
  if(this.saveInfo){
    localStorage.setItem('person',JSON.stringify(this.person));
  }

}

this.person.cartNumber=this.cartNumber;
this.person.total=''+this.total;

    this.personAndProductsCombinedForCheckOut.person=this.person;
   
this.productService.addCheckout(this.personAndProductsCombinedForCheckOut)
.subscribe(response => {
  if(response.statusText==='OK'){
   



alert('Your order is completed successfully !');

this.freshLocalstorage();


  }
  },
  (error)=>{

  });


  }

  freshLocalstorage(){


    let cn:number=0;
    let tt:number=0;
    localStorage.setItem('cartNumber',JSON.stringify(cn));
    localStorage.setItem('total',JSON.stringify(tt));
    localStorage.removeItem('cart');
    
    //----------------load------------
  this.reLoadPage();

}

reLoadPage(){

  if (!localStorage.getItem('foo')) { 
    localStorage.setItem('foo', 'no reload');
    location.reload(); 
  } else {
    localStorage.removeItem('foo'); 
  
  }

}

  getTotal(): void {
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);    
      this.total += item.product.soldPrice * item.quantity;
    }
    }

   

}
