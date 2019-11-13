import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { FacebookService, InitParams } from 'ngx-facebook';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'E-Commerce-App';
constructor(private ngWowService:NgwWowService,private facebookService: FacebookService){}

ngOnInit(){
  // must need to animate the wow js 
  this.ngWowService.init();

//for fb messenger
this.initFacebookService();



}
private initFacebookService(): void {
  const initParams: InitParams = { xfbml:true, version:'v3.2'};
  this.facebookService.init(initParams);
}

}