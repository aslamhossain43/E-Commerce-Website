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
removeId:string;

  constructor(private productService: ProductService) { }

  ngOnInit() {
      
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





  sendId(id:string){
this.removeId=id;

  }
  noRemoveOrder(){
    this.removeId='';
  }
removeOrder(){
this.productService.deleteOrder(this.removeId)
.subscribe(response=>{
if(response.statusText==='OK'){

  this.reLoadPage();
}

},
(error)=>{
  this.reLoadPage();
});
}





reLoadPage(){

  if (!localStorage.getItem('foo')) { 
    localStorage.setItem('foo', 'no reload');
    location.reload(); 
  } else {
    localStorage.removeItem('foo'); 
  
  }

}







}
