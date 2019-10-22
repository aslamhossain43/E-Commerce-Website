import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
// FOR CONSUMERS
categories: Category[];
category = new Category();


// FOR FORM FIELD
categoryFormControl = new FormControl('', [Validators.required]);

biodataForm: FormGroup = new FormGroup({
  category: this.categoryFormControl,
  
});
// FOR STRING VALIDATION
getRequiredErrorMessageForString(field) {
  if (this.biodataForm.get(field).hasError('required')) {
    return this.biodataForm.get(field).hasError('required') ? 'You must enter ' + field : '';
  }
}

  constructor(private categoryService:CategoryService) {}
    
  


  ngOnInit() {
  }


  addCategory(): void {
    this.categoryService.addCategory(this.category)
      .subscribe(response => {
        if (response.statusText === 'OK') {
        //  this.getConsumers();
          alert('Your operation has been completed successfully !');
          this.reset();
        }
      },
        (error) => {
        });
  }
  
  reset() {
  this.category=new Category();
  
  }


}
