import { Component, OnInit, Output } from '@angular/core';
import { ProductServiceForCart } from '../app.cart-service';
import { Product } from '../cart-entities/product';
import { Item } from '../cart-entities/item';
import { Person } from '../manage/person';
import { ProductService } from '../manage/manage.service';
import { PersonAndProductsCombinedForCheckOut } from '../manage/checkout';
import { ProductsForCheckOut } from '../manage/productsforcheckout';
import { Router } from '@angular/router';
import { PaymentPhoneNumber } from '../manage/payment-number';


declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {



  items: Item[] = [];
  personAndProductsCombinedForCheckOut = new PersonAndProductsCombinedForCheckOut();
  productsForCheckOuts: ProductsForCheckOut[] = [];
  product = new Product();
  cartNumber: string;
  promo_code_proxy: string;
  promo_code_original: string;
  person = new Person();

  cashOnDelivery: boolean;
  cashOnBkash: boolean;
  cashOnRocket: boolean;
  paymentForm: boolean;
  paymentMethodByCashOnDelivery: boolean;

paymentPhoneNumber:PaymentPhoneNumber[]
ppNumber:string;

  saveInfo: boolean;
  total: number = 0;
  constructor(private productService: ProductService, private productServiceForCart: ProductServiceForCart, private router: Router) {

  }

  ngOnInit() {
this.getAllPaymentPhoneNumbers();

    //for cart
    this.items = this.productServiceForCart.allItemsFromLocalStorage();
    this.getTotal();
    this.cartNumber = JSON.parse(localStorage.getItem('cartNumber'));
    this.promo_code_original = 'TIZARAMART' + Math.random().toString(36).substring(1, 36);

    this.promo_code_proxy = Math.random().toString(36).substring(1, 36);

    if (localStorage.getItem('person') != null) {
      this.person = JSON.parse(localStorage.getItem('person'));
      this.saveInfo = true;
      this.person.paymentPhone='';
      this.person.paymentTransactionId='';
    }


  }

  continueCheckout(): void {

    this.items.forEach(element => {
      //if id not null then it is not work in server for cascadeType.ALL
      element.product.id = null;
      element.product.quantity = '' + element.quantity;
      this.productsForCheckOuts.push(element.product);
    });
    this.personAndProductsCombinedForCheckOut.productsForCheckOuts = this.productsForCheckOuts;
    if (localStorage.getItem('promo_code_proxy') != null) {

      this.person.promoCode = this.promo_code_original;
    } else {
      this.person.promoCode = '';
      localStorage.setItem('promo_code_proxy', JSON.stringify(this.promo_code_proxy));
    }

    if (localStorage.getItem('person') == null) {
      if (this.saveInfo) {
        localStorage.setItem('person', JSON.stringify(this.person));
      }

    }

    this.person.cartNumber = this.cartNumber;
    this.person.total = '' + this.total;

    this.personAndProductsCombinedForCheckOut.person = this.person;

    this.productService.addCheckout(this.personAndProductsCombinedForCheckOut)
      .subscribe(response => {
        if (response.statusText === 'OK') {




          alert('Your order is completed successfully !');

          this.freshLocalstorage();


        }
      },
        (error) => {

        });


  }

  freshLocalstorage() {


    let cn: number = 0;
    let tt: number = 0;
    localStorage.setItem('cartNumber', JSON.stringify(cn));
    localStorage.setItem('total', JSON.stringify(tt));
    localStorage.removeItem('cart');

    //----------------load------------
    this.reLoadPage();

  }

  reLoadPage() {

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




  payByCashOnDelivery() {

    this.cashOnDelivery = true;
    this.cashOnBkash = false;
    this.cashOnRocket = false;
    this.paymentForm = false;


    this.person.paymentMethod = 'Cash on delivery';
    this.person.paymentPhone = '';
    this.person.paymentTransactionId = '';






  }


  payBybKash() {
    this.cashOnBkash = true;
    this.cashOnDelivery = false;
    this.cashOnRocket = false;
    this.paymentForm = true;

    this.person.paymentMethod = 'Cash on bKash';
    this.person.paymentPhone = '';
    this.person.paymentTransactionId = '';


    this.ppNumber=this.paymentPhoneNumber[0].bKash;



  }


  payByRocket() {
    this.cashOnRocket = true;
    this.cashOnDelivery = false;
    this.cashOnBkash = false;
    this.paymentForm = true;

    this.person.paymentMethod = 'Cash on rocket';
    this.person.paymentPhone = '';
    this.person.paymentTransactionId = '';

    this.ppNumber=this.paymentPhoneNumber[0].rocket;
    

  }


getAllPaymentPhoneNumbers(){
  this.productService.getAllPaymentPhoneNumbers()
  .subscribe((response)=>{
    this.paymentPhoneNumber=response;
  });
}




}
