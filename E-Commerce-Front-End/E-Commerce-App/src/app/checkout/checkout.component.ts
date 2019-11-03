import { Component, OnInit } from '@angular/core';
import { ProductServiceForCart } from '../app.cart-service';
import { Product } from '../cart-entities/product';
import { Item } from '../cart-entities/item';
import { Person } from '../manage/person';
import { ProductService } from '../manage/manage.service';
import { PersonAndProductsCombinedForCheckOut } from '../manage/checkout';

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
products:Product[]=[];
product=new Product();
cartNumber:string;
promo_code_proxy:string;
promo_code_original:string;
person=new Person();
cashOnDelivery:boolean;
saveInfo:boolean;
total:number=0;
  constructor(private productService:ProductService,private productServiceForCart:ProductServiceForCart) {

   }

  ngOnInit() {
    //for form
    $('input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea').each(function (element, i) {
      if ((element.value !== undefined && element.value.length > 0) || $(this).attr('placeholder') !== null) {
          $(this).siblings('label').addClass('active');
      }
      else {
          $(this).siblings('label').removeClass('active');
      }
  });
//for cart
  this.items=this.productServiceForCart.allItemsFromLocalStorage();
  this.getTotal();
  this.cartNumber=JSON.parse(localStorage.getItem('cartNumber'));
this.promo_code_original='TIZARAMART'+Math.random().toString(36).substring(1,36);
console.log('promo code : '+this.promo_code_original);
this.promo_code_proxy=Math.random().toString(36).substring(1,36);
console.log('promo code : '+this.promo_code_proxy);

  }

  continueCheckout():void{

    this.items.forEach(element => {
this.products.push(element.product);      
    });
    this.personAndProductsCombinedForCheckOut.products=this.products;
    if (localStorage.getItem('promo_code_proxy')!=null) {
      
      this.person.promoCode=this.promo_code_original;
    } else {
      localStorage.setItem('promo_code_proxy',JSON.stringify(this.promo_code_proxy));
    }

if(localStorage.getItem('person')==null){
  if(this.saveInfo){
    localStorage.setItem('person',JSON.stringify(this.person));
  }

}

    this.personAndProductsCombinedForCheckOut.person=this.person;
    console.log(''+this.products)
    console.log(''+this.person)

this.productService.addCheckout(this.personAndProductsCombinedForCheckOut)
.subscribe(response => {
  if(response.statusText==='OK'){
    alert('Your order is completed successfully !');
  }
  },
  (error)=>{

  });



  }

  



  getTotal(): void {
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);    
      this.total += item.product.soldPrice * item.quantity;
    }
    }

}
