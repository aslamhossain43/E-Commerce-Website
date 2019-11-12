import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { UploadFileService } from './manage.file-service';
import { ProductService } from './manage.service';
import { Category } from './category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

constructor() {

  }



// NG LIFE CYCLE
ngOnInit(): void {
  
}
    
}
