import { Component, OnInit } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
import { NgwWowService } from 'ngx-wow';
import { ProductService } from '../manage/manage.service';
import { GoogleMap } from '../manage/googlemap';
import { Phone } from '../manage/phone';
import { Email } from '../manage/email';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
googleMap=new GoogleMap();
phones:Phone[];
emails:Email[];


  constructor(private productService:ProductService) {

    
   }

  ngOnInit() {
    this.getGoogleMapPhoto();
    this.getAllPhones();
    this.getAllEmails();
    
  }

  getGoogleMapPhoto(){
    this.productService.getGmPhoto()
    .subscribe(response=>{
      this.googleMap=response;
    },
    (error)=>{

    });
  }














  getAllPhones(){
    this.productService.getAllPhones()
    .subscribe(phones=>{
      this.phones=phones;
    },
    (error)=>{
    
    });
    }
    
    getAllEmails(){
      this.productService.getAllEmails()
      .subscribe(emails=>{
        this.emails=emails;
      },
      (error)=>{
      
      });
      }
    


}
