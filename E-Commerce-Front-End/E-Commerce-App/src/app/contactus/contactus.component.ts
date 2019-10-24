import { Component, OnInit } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
import { NgwWowService } from 'ngx-wow';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  constructor(private ngwowService:NgwWowService) {

    
   }

  ngOnInit() {
    this.ngwowService.init();
   $('button').click(function(){
     alert('ok');
   })
  }

}
