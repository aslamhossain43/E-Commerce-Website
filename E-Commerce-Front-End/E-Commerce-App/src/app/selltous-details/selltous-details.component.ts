import { Component, OnInit } from '@angular/core';
import { ThirdPartyProduct } from '../manage/thirdparty-product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../manage/manage.service';
import { Response } from '@angular/http';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-selltous-details',
  templateUrl: './selltous-details.component.html',
  styleUrls: ['./selltous-details.component.scss']
})
export class SelltousDetailsComponent implements OnInit {
product=new ThirdPartyProduct();
id:string;
  constructor(private route:ActivatedRoute,private productService:ProductService) {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    
    }
this.id=this.route.snapshot.paramMap.get('id');


   }

  ngOnInit() {
    this.getThirdPartyProductById();
  }

  getThirdPartyProductById(){
    this.productService.getThirdPartyProductById(this.id)
    .subscribe(tpProduct=>{
      this.product=tpProduct;
    },
    (error)=>{

    });
  }


deletetpProduct(id:string){
  this.productService.deleteThirdPartyProductById(id)
  .subscribe((response:Response)=>{
if(response.statusText==='OK'){

  $("#validMsgModal").modal('show');

}
  },(error)=>{

    $("#errorMsgModal").modal('show');
  })
}



}
