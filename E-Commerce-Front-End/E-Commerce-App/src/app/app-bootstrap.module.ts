import { NgModule } from '@angular/core';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    FormsModule, CollapseModule.forRoot(), BsDropdownModule.forRoot(),NgbModule
  ],
  exports: [ FormsModule, CollapseModule, BsDropdownModule,NgbModule]
})
export class AppBootstrapModule {}