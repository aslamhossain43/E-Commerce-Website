import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'E-Commerce-App';
constructor(private ngWowService:NgwWowService){}

ngOnInit(){
  // must need to animate the wow js 
  this.ngWowService.init();
}

}