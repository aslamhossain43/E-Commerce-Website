import { Component, OnInit } from '@angular/core';
import { PersonAndProductsCombinedForCheckOut } from '../manage/checkout';
import { ProductService } from '../manage/manage.service';
import { Person } from '../manage/person';
import { ProductsForCheckOut } from '../manage/productsforcheckout';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-manage-checkout',
  templateUrl: './manage-checkout.component.html',
  styleUrls: ['./manage-checkout.component.scss']
})
export class ManageCheckoutComponent implements OnInit {

  personAndProductsCombinedForCheckOuts: PersonAndProductsCombinedForCheckOut[] = [];
  person = new Person();
  productForCheckOuts: ProductsForCheckOut[];
  constructor(private productService: ProductService) { }

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
    this.getAllCheckout();

  }

  getAllCheckout(): void {

    this.productService.getAllCheckout()
      .subscribe(checkouts => {

        this.personAndProductsCombinedForCheckOuts = checkouts;

      },
        (error) => {

        });
  }

}
