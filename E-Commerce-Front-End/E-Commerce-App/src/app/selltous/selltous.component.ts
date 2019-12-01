import { Component, OnInit } from '@angular/core';
import { ThirdPartyProduct } from '../manage/thirdparty-product';
import { ProductService } from '../manage/manage.service';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-selltous',
  templateUrl: './selltous.component.html',
  styleUrls: ['./selltous.component.scss']
})
export class SelltousComponent implements OnInit {
tpProducts:ThirdPartyProduct[];
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.getAlltpProducts();
//jquery
$('[data-toggle="tooltip"]').tooltip();
  }

  getAlltpProducts():void{
    this.productService.getAllThirdPartyProducts()
    .subscribe(tpProducts=>{
      this.tpProducts=tpProducts;
    });
  }

}
