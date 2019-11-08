import { Component, OnInit } from '@angular/core';
import { ProductService } from '../manage/manage.service';
import { Fb } from '../manage/fb';
import { Twitter } from '../manage/twitter';
import { EmailSending } from '../manage/manage.email';
import { Phone } from '../manage/phone';
import { Email } from '../manage/email';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
fbLink:Fb;
twitterLink:Twitter;

emailSending=new EmailSending();

phones:Phone[];
emails:Email[];


  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.getFb();
    this.getTwitter();
    this.getAllPhones();
    this.getAllEmails();
  }



  getFb():void{

    this.productService.getFb()
    .subscribe(response=>{
      this.fbLink=response;
    },
    (error)=>{
    
    });
    
    }
    
    


    getTwitter():void{

      this.productService.getTwitter()
      .subscribe(response=>{
        this.twitterLink=response;
      },
      (error)=>{
      
      });
      
      }

      
      sendingEmail(): void {
        this.productService.emailSending(this.emailSending)
          .subscribe(response => {
            if (response.statusText === 'OK') {
              alert('Email is sent !');
              this.emailSending=new EmailSending();
            
            }
          },
            (error) => {
              alert('Email is not sent !');
              
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
  
  refreshEmail(){
    this.emailSending=new EmailSending();
  }
  

}
