import { Component, OnInit } from '@angular/core';
import { ProductServiceForCart } from '../app.cart-service';
import { Product } from '../cart-entities/product';
import { Item } from '../cart-entities/item';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
items: Item[]=[];
cartNumber:string;
  constructor(private productServiceForCart:ProductServiceForCart) {

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

  this.items=this.productServiceForCart.allItemsFromLocalStorage();
  this.cartNumber=JSON.parse(localStorage.getItem('cartNumber'));
  }

}
